import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from app.models import User, Role, Token
from json.encoder import JSONEncoder
from django.http import JsonResponse
from django.http.response import HttpResponse
from django.db.models import Q
# Create your views here.


@csrf_exempt
def say_hi(request):
    """ alaki """

    # #TODO: validate data on request/role
    this_token = request.POST['token']
    this_user = User.objects.filter(token__token=this_token)  # .get()
    this_role = Role.objects.filter(name=request.POST['rolename'])

    print("alakiiiiiiiiiiiiiiiiiiiiiiii")
    print(this_role)

    return JsonResponse(
        {'status': '{} fetched'.format(this_role)},
        JSONEncoder)


def json_roles(request):
    data = {}
    for obj in Role.objects.all():
        item = {}
        item[obj.name] = obj.description
        if obj.persianName:
            item['Persian Name'] = obj.persianName
        item['state'] = '{}, {}, {}'.format('hidden' if obj.hidden else 'visible',
                                            'checked' if obj.checked else 'unchecked',
                                            'default' if obj.default else 'not default')
        team = 'Innocent' if obj.team == 'w' else 'Mafia'
        if team not in data:
            data[team] = []
        data[team].append(item)
    return JsonResponse(data, safe=False)


def show_roles(request):
    context = {}
    context['role_list'] = list(
        Role.objects.filter(hidden=False).order_by('-order').values())
    # context['mylist'] = list("111", "222")
    # array = ['aaaaa', 'bbbbbb', 'cccccc']
    # injectin = '</script><script> btnGo.onclick=function () { alert("You\'re hacked"); }; //'
    # context['dict'] = dict

    return render(request, 'roles.html', context)


def register(request):
    context = {'message': 'amghzi'}
    return render(request, 'register.html', context)
