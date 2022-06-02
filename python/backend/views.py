from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt

from . import db, dtos

import jsonpickle, json

@csrf_exempt
def handleSpendingsReq(request):
    if request.method == 'POST':
        return saveSpending(request)
    elif request.method == 'GET':
        return readSpendings(request)
    else:
        return HttpResponseNotAllowed(['GET', 'POST'])

def readSpendings(request):
    rows = db.Database().read()
    response = []
    for r in rows:
        response.append(dtos.createDtoFromDbo(r))

    return HttpResponse(jsonpickle.encode(response, unpicklable = False))

def saveSpending(request):
    body = request.body.decode('utf-8')
    try:
        dto = json.loads(body, object_hook = dtos.createUploadDto)
        db.Database().insert(dto)
        return HttpResponse('Saved spending')
    except (Exception) as error:
        print(error)
        return HttpResponseBadRequest(error)