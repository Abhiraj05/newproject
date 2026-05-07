from .client import client

def get_collections():
    return client.get_or_create_collection(name="documents")