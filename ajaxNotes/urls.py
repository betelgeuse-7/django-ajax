from django.urls import path

from .views import Index, NewNote, DeleteNote

app_name = "ajaxNotes"

urlpatterns = [
    path("", Index.as_view(), name="index"),
    path("new/", NewNote.as_view(), name="create"),
    path('delete/', DeleteNote.as_view(), name="delete"),
]
