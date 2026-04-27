from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
import os

app = FastAPI()

origins = ["http://127.0.0.1:8000/"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


@app.get("/")
async def scan_doc():
    model = ChatGoogleGenerativeAI(
        model="gemini-3-flash-preview",
        temperature=1.0,
        max_tokens=None,
        timeout=None,
        max_retries=2
    )

    messages = [
        (
            "system",
            "You are a helpful assistant that translates English to French. Translate the user sentence.",
        ),
        ("human", "I love programming."),
    ]
    ai_msg = model.invoke(messages)
    print(ai_msg.content)


@app.get("/generate_embeddings")
async def generate_embeddings():
    embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")
    vector = embeddings.embed_query("hello, world!")
    print(vector[:5])
