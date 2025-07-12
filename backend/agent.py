from importlib import reload
import logging, os
import httpx
from dotenv import load_dotenv
from livekit import api
from livekit.agents import WorkerOptions, cli, JobContext, RoomInputOptions, get_job_context
from livekit.agents.llm import function_tool
from livekit.agents.voice import Agent, AgentSession
from livekit.plugins import openai, silero, noise_cancellation, speechmatics
from pymongo import MongoClient
from pydantic import BaseModel
from main import ContextDetails

load_dotenv()
connection_string = os.environ.get("MONGO_CONNECTION_STRING")
client = MongoClient(connection_string)
user_collection = client.travelop.users

logger = logging.getLogger("simple-flow")
logger.setLevel(logging.INFO)

class BaseAgent(Agent):
    def __init__(self, context: ContextDetails, instructions: str) -> None:
        self.context = context
        super().__init__(
            instructions=instructions,
            stt=speechmatics.STT(
                transcription_config=speechmatics.types.TranscriptionConfig(
                    language="en",
                    operating_point="enhanced",
                    enable_partials=True,
                    max_delay=0.7,
                    diarization="speaker",
                    speaker_diarization_config={"max_speakers": 2},
                )
            ),
            llm=openai.LLM(model="gpt-4o"),
            tts=openai.TTS(),
            vad=silero.VAD.load()
        )



class AskDetailsAgent(BaseAgent):
    def __init__(self, context: ContextDetails) -> None:
        super().__init__(
            context=context,
            instructions="""You are a friendly intake assistant for the Travelop app.
                Greetings have already done no need to introduce again.
                Your job is to collect the following details:
                - Age
                - Gender
                - identify what type of surroundings suits the user for the travel
                - Mobility
                - Place that user plans to visit
                - Budget

                Ask one question at a time. Only ask for details that are not yet collected.
                Once everything is collected, politely summarize the details with how this vacation is going to be good (dont explain too much) and end.
                """
        )

    async def add_or_update_user(self, update_dict):
        """
            Adds user details to the database and push to the FastAPI.
        """
        user_collection.update_one(
            {"name": self.context.user_details.name},
            {"$set": update_dict},
            upsert=True
        )
        await self.post_data()


    async def on_enter(self) -> None:
        await self.session.say("Hello Welcome to travelop where you plan your travel with ease. Would you state your name please?")

    @function_tool()
    async def collect_user_name(self, name: str):
        """
        Receives the user's name, acknowledge it and store it in the context and transition to asking their age.
        """
        self.context.user_details.name = name
        await self.add_or_update_user({"name": name})
        return f"User's name is {name} remember it throughout the conversation and continue questioning."

    @function_tool
    async def collect_age(self, age: str) -> str:
        """
        Receives the user's age and store it in the context and transition to asking their gender.
        """
        self.context.user_details.age = age
        await self.add_or_update_user({"age": age})
        return f"User is {age} years old. Now, ask politely for the user's gender."

    @function_tool()
    async def collect_gender(self, gender: str) -> str:
        """
        Receives the user's gender and store it in the context and transition to asking their user interests.
        """
        self.context.user_details.gender = gender
        await self.add_or_update_user({"gender": gender})
        return f"User is a {gender}. Now continue asking."


    @function_tool()
    async def collect_user_interests(self, interest: str) -> str:
        """
        Receives the user's interests in traveling, acknowledge it and store it in the context and transition to asking their mobility.
        """
        self.context.user_details.interests = interest
        await self.add_or_update_user({"interest": interest})
        return f"User likes {interest} surroundings. Before continuing to next question tell some best nature categories related to users {interest} and continue questioning."


    @function_tool()
    async def collect_user_mobility_type(self, mobility: str) -> str:
        """
        Receives the user's mobility and store it in the context and transition to asking their travel location.
        """
        self.context.user_details.mobility = mobility
        await self.add_or_update_user({"mobility": mobility})
        return f"User's mobility way is this {mobility}. Now continue questioning"

    @function_tool()
    async def collect_user_location(self, location: str) -> str:
        """
        Receives the user's traveling location and store it in the context and transition to asking their budget.
        """
        self.context.travel_details.location = location
        await self.add_or_update_user({"location": location})
        return f"User's travelling location is {location}. Tell some few places to visit according to his {location} and continue questioning."

    @function_tool()
    async def collect_user_budget(self, budget: str) -> Agent:
        """
        Receives the user's budget and store it in the context and database, summarize the details and end the conversation.
        """
        self.context.travel_details.budget = budget
        await self.add_or_update_user({"budget": budget})
        return f"User's budget is {budget}. After adding the user button to the db, explain if this amount is enough for a trip and start summarizing and end the conversation"


    async def add_to_database(self):
        """
        Add the user's details to the database.
        """
        user_collection.insert_one(self.context.to_dict())



    async def post_data(self):
        async with httpx.AsyncClient() as client:
            await client.post(
                "http://localhost:8000/context/user",
                json={
                    "name": self.context.user_details.name,
                    "age": self.context.user_details.age,
                    "gender": self.context.user_details.gender,
                    "interests": self.context.user_details.interests,
                    "mobility": self.context.user_details.mobility,
                },
            )

        async with httpx.AsyncClient() as client:
            await client.post(
                "http://localhost:8000/context/travel",
                json={
                    "location": self.context.travel_details.location,
                    "budget": self.context.travel_details.budget,
                },
            )



    @function_tool()
    async def ending_session(self):
        """
        Called when the conversation ends.
        """
        current_speech = self.session.current_speech
        if current_speech:
            await current_speech.wait_for_playout()

        await hangup_call()


async def hangup_call():
    ctx = get_job_context()
    await ctx.api.room.delete_room(
        api.DeleteRoomRequest(
            room=ctx.room.name,
        )
    )


async def entrypoint(ctx: JobContext) -> None:
    await ctx.connect()
    my_context = ContextDetails()
    session = AgentSession()
    await session.start(
        agent=AskDetailsAgent(context=my_context),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )





if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
