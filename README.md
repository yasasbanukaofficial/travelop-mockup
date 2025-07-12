# ✈️ Travelop — AI-Powered Voice Travel Intake Assistant

**Travelop** is an AI-powered voice assistant that helps users plan their travel by collecting details through a natural conversation.
It combines **LiveKit**, **OpenAI LLM**, **FastAPI**, **Speechmatics**, and **MongoDB** to deliver a seamless, real-time voice intake experience.

---

## 🧩 Features

- 🎙️ **Voice-based intake:** Uses LiveKit and Speechmatics to transcribe and understand user speech.
- 🧠 **AI conversation:** OpenAI GPT handles context, flow, and smart questioning.
- 🗂️ **Progressive data capture:** Collects name, age, gender, interests, mobility type, destination, and budget.
- 🗄️ **FastAPI backend:** Stores context in an in-memory store or MongoDB.
- 🔗 **Live updates:** Frontend displays up-to-date travel details and conversation.
- 🔉 **Speech output:** Responds to the user with TTS.

---

## ⚙️ Tech Stack

| Layer       | Tech                              |
| ----------- | --------------------------------- |
| Frontend    | Next.js, React, LiveKit Components |
| Backend     | FastAPI, PyMongo, LiveKit Agents  |
| AI & STT    | OpenAI, Speechmatics, Silero VAD  |
| DB          | MongoDB                           |
| Deployment  | Local development with Uvicorn & Next.js |

---
