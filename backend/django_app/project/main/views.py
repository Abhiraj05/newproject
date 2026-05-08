import os
import uuid
import requests
from rest_framework import status
from markitdown import MarkItDown
from rest_framework.views import APIView
from rest_framework.response import Response
from main.serializers import DocumentSerializer
from rest_framework.permissions import IsAuthenticated


# Create your views here.

# extracts the text from pdf,doc and returns a plan text
class ExtractFileText(APIView):
    permission_classes = [IsAuthenticated]
    
    # extract text from document
    def extract_text(self, file):
        temp_path = None
        text = None
        md = MarkItDown()
        temp_path = f"temp_{uuid.uuid4()}_{file}"
        f = open(temp_path, "wb")
        
        for chunk in file.chunks():
            f.write(chunk)
        f.close()

        try:
            result = md.convert(temp_path)
            text = result.text_content
        except Exception as e:
            if not isinstance(text, str):
                return None
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)
        return text
    

    # send extracted text to fastapi server
    def post(self, request, format=None):
        serializer=DocumentSerializer(data=request.data)
        
        if serializer.is_valid():
            file = request.FILES.get("file")
            try:
                if file is None:
                    return Response({"message": "file upload failed !"},status=status.HTTP_400_BAD_REQUEST)

                extracted_text = self.extract_text(file)

                if not extracted_text:
                    return Response({"message": "text extraction failed !"},status=status.HTTP_400_BAD_REQUEST)
                
                requests.post("http://127.0.0.1:8001/generate_embeddings",
                                        json={"text": extracted_text})
            except:
                return Response({"message": "invalid file type !"}, status=status.HTTP_400_BAD_REQUEST)
                
