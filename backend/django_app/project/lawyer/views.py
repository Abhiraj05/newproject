from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from user.models import User
from rest_framework.response import Response

# Create your views here.

# fetches all the lawyers data and sends to frontend


class FetchLawyers(APIView):
    permission_classes = [AllowAny]

    # fetches all the lawyers
    def get(self, request):
        try:
            lawyers_list = User.objects.filter(
                role='lawyer').values().all().order_by("-id")

            if not lawyers_list:
                return Response({"message": "lawyers not found !"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"lawyers_list": lawyers_list}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "failed to extract lawyers !"}, status=status.HTTP_400_BAD_REQUEST)
