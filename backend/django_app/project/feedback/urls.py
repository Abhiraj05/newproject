from django.urls import path
from feedback.views import UserFeedback

urlpatterns = [
    path('send_feedback/',UserFeedback.as_view(),name="send_feedback")
]
