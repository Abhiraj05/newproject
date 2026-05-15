import chromadb
from chromadb.config import Settings
import os

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
CHROMA_PATH = os.path.join(BASE_DIR, "db" , "chroma")

# db client
client = chromadb.PersistentClient(path=CHROMA_PATH)