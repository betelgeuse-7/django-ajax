from django.shortcuts import render
from django.views.generic import View

from django.http import JsonResponse

from .models import Note

# import json library
import json


class Index(View):
    def get(self, request):
        notes = Note.objects.all()
        context = {
            "notes": notes
        }

        return render(request, 'index.html', context)


class NewNote(View):
    # get request
    def get(self, request):
        return render(request, 'new.html')

    # post request
    def post(self, request):
        title = json.loads(request.body)['title']
        text = json.loads(request.body)['text']

        print(json.loads(request.body))
        print(title, text)

        # we can now do our thing here in django

        if title and text:
            new_note = Note.objects.create(title=title, text=text)

            # dont forget saving it to the db.
            new_note.save()

            return JsonResponse({
                "msg": "OK "
            })

        else:
            return JsonResponse({
                "msg": "Invalid data "
            })


class DeleteNote(View):
    def post(self, request):
        id = json.loads(request.body)['id']

        if id:
            note_to_delete = Note.objects.get(id=id)
            note_to_delete.delete()
            return JsonResponse({
                "msg": "GONE "
            })
        else:
            return JsonResponse({
                "errmsg": "NO "
            })
