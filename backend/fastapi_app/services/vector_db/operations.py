from services.vector_db.collections import get_collections
import uuid

# get's collection
collection = get_collections()

# add embeddings to the collection
def add_embedding(chunks, embeddings, user_id, file_id):
    collection.add(
        ids=[str(uuid.uuid4()) for _ in chunks],
        documents=chunks,
        embeddings=embeddings,
        metadatas=[
            {
                "user_id": str(user_id),
                "file_id": str(file_id)
            }
            for _ in chunks
        ]
    )


# get queries of specified user
def query_embedding(query_embedding, file_id, top_k=5):
    return collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where={"file_id":str(file_id)}
    )
