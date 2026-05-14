from pydantic import BaseModel,Field

# document text model
class DocumentText(BaseModel):
    user_id:int=Field(...,description="user id")
    file_id:int=Field(...,description="file id")
    document_text:str=Field(...,description="user document text")

# query text model
class QueryText(BaseModel):
    file_id:int=Field(...,description="file id")
    lawyers_list:list=Field(...,description="lawyers list")
    query_text:str=Field(...,description="user query text")
    