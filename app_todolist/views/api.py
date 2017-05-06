from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from app_todolist.models import Transaction
from app_todolist.serializers import TransactionSerializer
from uuid import uuid4


def execute_post_data(data):
    """
    execute post data
    :param data: 
    :return: 
    """
    serializer = TransactionSerializer(data=data)
    print (serializer.is_valid())
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=201)
    return JsonResponse(serializer.errors, status=400)


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
        # print(data)
        return execute_post_data(data)
    return HttpResponse('Not allow', status=403)


@csrf_exempt
def edit_data(req, t_id):
    if req.method == 'POST':
        data = JSONParser().parse(req)
        print (data)
        Transaction.objects.filter(t_id=t_id).update(finish=data['finish'],
                                                     name=data['name'],
                                                     detail=data['detail'],
                                                     expire_date=data['expire_date'],
                                                     priority=data['priority'])
        return JsonResponse(data, safe=False)
    return HttpResponse(status=404)


@csrf_exempt
def delete_data(req, t_id1):
    if req.method == 'GET':
        # data = JSONParser().parse(req)
        Transaction.objects.filter(t_id=t_id1).delete()
        return JsonResponse({"success": True}, safe=False)
    return HttpResponse(status=404)
