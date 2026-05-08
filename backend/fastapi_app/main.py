import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_google_genai import ChatGoogleGenerativeAI
from rag import text_splitter, embed_text
from services.vector_db.operations import add_embedding
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
async def generate_embeddings(text: DocumentText):
    user_document_text = text.document_text
    
    # genertes chunks
    chunks = text_splitter(user_document_text)
    
    # genertes embeddings
    embeddings = embed_text(chunks)

    # add chunks & embeddings to the collection
    add_embedding(chunks, embeddings)



# handles user query
@app.post("/user_query")
async def rag_answer(query: QueryText):
    user_query = query.query_text
    
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

    # get's collection
    collection = get_collections()

    # retrieve from chormadb
    results = collection.query(
        query_embeddings=[embeded_query],
        n_results=2
    )

    # retrieved chunks
    retrieved_chunks = results["documents"][0]
    context = "\n\n".join(retrieved_chunks)


    # generate
    prompt = f"""answer using only context below.
    If the answer is not in context, say "I don't know!"
    
    Context:
    {context}
    
    Question:{user_query}
    Answer:"""

    # model response
    response = llm_model.invoke(prompt)

    return {"answer": response.content}
