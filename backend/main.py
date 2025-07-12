from importlib import reload
import logging, os, httpx
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class UserDetails(BaseModel):
    name: str | None = None
    age: str | None = None
    gender: str | None = None
    interests: str | None = None
    mobility: str | None = None


class TravelDetails(BaseModel):
    location: str | None = None
    budget: str | None = None


class ContextDetails(BaseModel):
    user_details: UserDetails = UserDetails()
    travel_details: TravelDetails = TravelDetails()


app = FastAPI(
    title="Travelop",
    description="AI based travelling agent",
    debug=True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db ={"context" : ContextDetails()}

@app.get("/context", response_model=ContextDetails)
def get_context():
    return memory_db["context"]


@app.post("/context/user")
def update_user_details(user: UserDetails):
    memory_db["context"].user_details = user
    return {"status": "ok"}

@app.post("/context/travel")
def update_travel_details(travel: TravelDetails):
    memory_db["context"].travel_details = travel
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
