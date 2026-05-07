from pydantic import BaseModel,Field

# document text model
class DocumentText(BaseModel):
    document_text:str=Field(...,description="user document text")

# query text model
class QueryText(BaseModel):
    query_text:str=Field(...,description="user query text")
    