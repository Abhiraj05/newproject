from pydantic import BaseModel,Field

class DocumentText(BaseModel):
    document_text:str=Field(...,description="user document text")

class QueryText(BaseModel):
    query_text:str=Field(...,description="user query text")
    