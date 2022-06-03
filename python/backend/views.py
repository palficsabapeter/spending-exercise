from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from .models import Spending

from . import dtos

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
    rows = Spending.objects.values_list()
    response = []
    for r in rows:
        response.append(dtos.createDtoFromDbo(r))

    return HttpResponse(jsonpickle.encode(response, unpicklable = False), content_type = 'application/json')

def saveSpending(request):
    body = request.body.decode('utf-8')
    try:
        dto = json.loads(body, object_hook = dtos.createUploadDto)
        Spending.objects.create(
            description = dto.description,
            amount = dto.amount,
            spent_at = dto.spent_at,
            currency = dto.currency
        )
        return HttpResponse('{}', content_type = 'application/json')
    except (Exception) as error:
        res = {'error': str(error).replace("'", "")}
        return HttpResponseBadRequest(json.dumps(res), content_type = 'application/json')