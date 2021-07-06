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

    print("alakiiiiiiiiiiiiiiiiiiiiiiii")
    print(this_role)

    return JsonResponse(
        {'status': '{} fetched'.format(this_role)},
        JSONEncoder)


def sortbykey(item):
    return item['key']


@csrf_exempt
def create_game(request):
    myjson = json.loads(request.body) if request.method == 'POST' else (
        json.loads(request.GET['Players']) if request.method == 'GET' else None)
    if myjson:
        myjson.sort(key=lambda item: item['key'])
        # verbose = ', '.join(map(lambda item: item['role'], myjson))
        verbose = ', '.join(item['role'] for item in myjson)
        maxid = models.Game.objects.aggregate(Max('id'))['id__max']
        theGame = models.Game.objects.create(
            id=maxid+1 if maxid else 1, verbose=verbose, active=True)
        index = 0
        for item in myjson:
            try:
                role = models.Role.objects.get(name=item['role'])
            except models.Role.DoesNotExist:
                role = models.Role.objects.get(name='Unknown')
            finally:
                index += 1
                models.Player.objects.create(
                    number=index, game_id=theGame, role_id=role, state='alive')
        return HttpResponse('Game #{} started.'.format(theGame.id))
    else:
        return HttpResponse('Not valid!')


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
