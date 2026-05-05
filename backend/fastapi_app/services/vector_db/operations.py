from .collections import get_collections

collection = get_collections()

def add_embedding(doc_id, text, embedding, metadata):

    collection.add(
        ids=[doc_id],
        documents=[text],
        embeddings=[embedding],
        metadatas=[metadata]
    )

def query_embedding(user_id, query_embedding, top_k=5):
    return collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where = {"user_id":user_id}
    )
    