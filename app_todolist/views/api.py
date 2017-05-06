from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from app_todolist.models import Transaction
from app_todolist.serializers import TransactionSerializer
from uuid import uuid4

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
    return HttpResponse(status=404)


@csrf_exempt
def add_data(req):
    if req.method == 'POST':
        data = JSONParser().parse(req)
        data[u't_id'] = str(uuid4())
        print(data)
        serializer = TransactionSerializer(data=data)
        print (serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    return HttpResponse('Not allow', status=403)


@csrf_exempt
def edit_data(req):
    if req.method == 'POST':
        data = JSONParser().parse(req)
        t_id = data.t_id
        data.pop('t_id')
        target = Transaction.objects.filter(t_id=t_id).update(data)
        target.save()
    return HttpResponse(status=404)


@csrf_exempt
def delete_data(req):
    if req.method == 'POST':
        data = JSONParser().parse(req)
        target = Transaction.objects.filter(t_id=data.t_id).delete()
        target.save()
    return HttpResponse(status=404)