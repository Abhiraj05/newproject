from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
import os



load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# creates chunking
def text_splitter(document_text):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=200,
        chunk_overlap=50,
        separators=["\n", ". ", " "]
    )
    chunks = splitter.split_text(document_text)

    return chunks


# creates embeddings
def embed_text(chunks):
    vectors = []
    embeddings = GoogleGenerativeAIEmbeddings(
        model="gemini-embedding-2-preview",
        task_type="retrieval_document")
      
    for chunk in chunks:
        vector = embeddings.embed_query(chunk)
        vectors.append(vector)
        
    return vectors
    
  
