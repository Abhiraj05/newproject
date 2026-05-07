from .collections import get_collections
import uuid

collection = get_collections()


def add_embedding(chunks, embeddings):
    collection.add(
        ids=[str(uuid.uuid4()) for _ in chunks],
        documents=chunks,
        embeddings=embeddings
    )



def query_embedding(user_id, query_embedding, top_k=5):
    return collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where={"user_id": user_id}
    )
