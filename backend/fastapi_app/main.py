import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from rag import text_splitter, embed_text
from services.vector_db.operations import add_embedding,query_embedding
from services.vector_db.collections import get_collections
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from schemas.request_schemas import DocumentText, QueryText



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



# generate_embeddings
@app.post("/generate_embeddings")
async def generate_embeddings(request: DocumentText):
    user_id = request.user_id
    file_id = request.file_id
    user_document_text = request.document_text
   
    # genertes chunks
    chunks = text_splitter(user_document_text)
    
    # genertes embeddings
    embeddings = embed_text(chunks)

    # add chunks & embeddings to the collection
    add_embedding(chunks, embeddings, user_id, file_id)
    
    return {"message":"embeddings generated successfully"}



# handles user query
@app.post("/user_query")
async def rag_answer(request: QueryText):
    file_id = request.file_id
    lawyers_list = request.lawyers_list
    user_query = request.query_text
   
    # embedding model
    query_embedding_model = GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-2-preview",
        task_type="retrieval_query")
    
    # llm model
    llm_model = ChatGoogleGenerativeAI(
        model="gemini-3-flash-preview",
        temperature=1.0,
        max_tokens=None,
        timeout=None,
        max_retries=2
    )

    # embed user query
    embeded_query = query_embedding_model.embed_query(user_query)

    # retrieve from chormadb
    results = query_embedding(embeded_query, file_id)
   
    # retrieved chunks
    retrieved_chunks = results["documents"][0]
    context = "\n\n".join(retrieved_chunks)
    
    # generate
    prompt = f"""
    You are a professional legal advisor AI assistant.

    Your task is to answer the user's legal question strictly using the provided context from uploaded legal documents, agreements, contracts, policies, case files, evidence, and available lawyer information.

    Rules:
    1. Use ONLY the provided context.
    2. Do NOT make assumptions or generate information outside the context.
    3. If the answer is not present in the context, reply exactly:
    "I don't know based on the provided legal documents."
    4. Provide responses in a professional legal-advisory tone.
    5. When possible, cite relevant clauses, sections, or statements from the context.
    6. Keep the answer concise, clear, and legally structured.
    7. Do NOT provide fabricated legal advice or imaginary laws.
    8. If the user asks to recommend, suggest, or find the best lawyer:
    - Use ONLY the provided lawyer list/array.
    - Recommend lawyers based on relevance to the user's legal issue
        (for example: criminal law, family law, corporate law, property law, etc.).
    - Mention the lawyer's name, specialization, experience, fees and any available rating/details from the provided data.
    - Do NOT invent lawyer details that are not present in the context.
    9. If multiple lawyers match, provide the top relevant options from the given list.
    10. If no suitable lawyer is available in the provided list, reply exactly:
    "No suitable lawyer found in the provided lawyer list."

    Provided Legal Context:
    {context}

    Available Lawyers:
    {lawyers_list}

    User Legal Question:
    {user_query}

    Legal Advisor Response:
    """

    # model response
    response = llm_model.invoke(prompt)

    return response.content
