from services.vector_db.client import client

# creates or get a collection
def get_collections():
    return client.get_or_create_collection(name="documents")