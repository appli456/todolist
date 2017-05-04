from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from app_todolist.models import Transaction
from app_todolist.serializers import TransactionSerializer


@csrf_exempt
def get_data(req):
    """
    get data
    :param req: 
    :return: 
    """
    if req.method == 'GET':
        transaction = Transaction.objects.all()
        serializer = TransactionSerializer(transaction, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif req.method == 'POST':
        data = JSONParser().parse(req)
        serializer = TransactionSerializer(data=data)
        if serializer.is_valid():
            # serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    return HttpResponse('cannot find it', status=404)


def add_data(req):
    if req.method == 'POST':
        pass
    return HttpResponse('Not allow', status=403)
