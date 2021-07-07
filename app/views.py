import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from app import models
from json.encoder import JSONEncoder
from django.http import JsonResponse
from django.http.response import HttpResponse
from django.db.models import Q, Max
# Create your views here.


@csrf_exempt
def say_hi(request):
    """ alaki """

    # #TODO: validate data on request/role
    this_token = request.POST['token']
    this_user = User.objects.filter(token__token=this_token)  # .get()
    this_role = Role.objects.filter(name=request.POST['rolename'])
    print(this_role)

    return JsonResponse(
        {'status': '{} fetched'.format(this_role)},
        JSONEncoder)


# @csrf_exempt
def REST(request):
    requestData = request.POST if request.method == 'POST' else(
        request.GET if request.method == 'GET' else None)
    responseData = {}
    responseData['Method'] = request.method
    responseData['Size'] = len(requestData)
    for key in requestData:
        responseData[key] = requestData[key]
    return render(request, 'REST.html', {'data': responseData})


@csrf_exempt
def AJAX(request):
    requestData = request.POST if request.method == 'POST' else(
        request.GET if request.method == 'GET' else None)
    data = {}
    data['Method'] = request.method
    data['Size'] = len(requestData)
    for key in requestData:
        data[key] = requestData[key]

    return HttpResponse(str(data).replace('\'', '\"'))


def json_roles(request):
    data = {}
    for obj in models.Role.objects.all():
        item = {}
        item[obj.name] = obj.description
        if obj.persianName:
            item['Persian Name'] = obj.persianName
        item['state'] = '{}, {}, {}'.format('hidden' if obj.hidden else 'visible',
                                            'primary' if obj.primary else 'secondary',
                                            'default' if obj.default else 'not default',)
        team = 'INNOCENT' if obj.team == 'w' else 'MAFIA'
        if team not in data:
            data[team] = []
        data[team].append(item)
    return JsonResponse(data, safe=False)


def show_roles(request):
    context = {}
    context['role_list'] = list(
        models.Role.objects.filter(hidden=False).order_by('order').values())
    # injectin = '</script><script> btnGo.onclick=function () { alert("You\'re hacked"); }; //'
    return render(request, 'roles.html', context)


def register(request):
    context = {'message': 'amghzi'}
    return render(request, 'register.html', context)
