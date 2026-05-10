from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from user.models import User
from rest_framework.response import Response


data=[
  {
    "name": "Julianne Vance",
    "role": "Senior Partner, Litigation",
    "status": "Verified",
    "tags": ["Corporate Law", "M&A", "Risk Mitigation"],
    "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    "name": "Marcus Thorne",
    "role": "IP Specialist",
    "status": "Review",
    "tags": ["IP Rights", "Patent Law", "Tech Compliance"],
    "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    "name": "Sarah Chen",
    "role": "Global Compliance Lead",
    "status": "Verified",
    "tags": ["Data Privacy", "EU Regulation", "Fintech"],
    "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
  {
    "name": "Daniel Reyes",
    "role": "Criminal Defense Attorney",
    "status": "Verified",
    "tags": ["Criminal Law", "Trial Defense", "Appeals"],
    "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    "name": "Priya Kapoor",
    "role": "Family Law Specialist",
    "status": "Verified",
    "tags": ["Divorce", "Child Custody", "Mediation"],
    "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
  {
    "name": "Liam O’Connor",
    "role": "Real Estate Lawyer",
    "status": "Review",
    "tags": ["Property Law", "Leasing", "Land Disputes"],
    "image": "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
  },
  {
    "name": "Aisha Hassan",
    "role": "Immigration Attorney",
    "status": "Verified",
    "tags": ["Visa Law", "Asylum", "Citizenship"],
    "image": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
  {
    "name": "Ethan Brooks",
    "role": "Tax Consultant",
    "status": "Review",
    "tags": ["Tax Law", "Corporate Tax", "IRS Disputes"],
    "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },
  {
    "name": "Mei Lin Zhang",
    "role": "Environmental Law Expert",
    "status": "Verified",
    "tags": ["Environmental Policy", "Sustainability", "Regulation"],
    "image": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
  },
];

# Create your views here.
class FetchLawyers(APIView):
    permission_classes = [AllowAny]

    def get(self,request):
        lawyers = User.objects.filter(role='lawyer')
        # return Response(lawyers.values()})
        return Response({"list":data})