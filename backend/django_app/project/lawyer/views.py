from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from user.models import User
from rest_framework.response import Response

# Create your views here.

# fetches all the lawyers data and sends to frontend
class FetchLawyers(APIView):
    permission_classes = [AllowAny]
    
    # fetches all the lawyers 
    def get(self,request):
        lawyers = User.objects.filter(role='lawyer')
        return Response({"lawyers_list":lawyers.values()})
        