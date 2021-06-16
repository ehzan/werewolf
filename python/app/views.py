import pathlib
import json
import re
from json.encoder import JSONEncoder
from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from app.models import User, Role, Token
from json import JSONEncoder  # ?
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


def text2json(str):
    str = re.sub(r'(?<=^)\s', '', str)
    str = re.sub(r'\t', ' ', str)
    str = re.sub(r' +', ' ', str)
    str = re.sub(r'( (?=\n))|((?<=\n) )', '', str)
    str = re.sub(r'\n\n+', '\n\n', str)
    str = re.sub(r'\s:', ':', str)
    str = re.sub(r':(?=\S)', ': ', str)
    str = re.sub(r': ', '": "', str)
    str = re.sub(r':\n', '": {\n', str)
    str = re.sub(r'\n(?=\S)', '\n"', str)
    str = re.sub(r'\n*$', '', str)
    str = re.sub(r'(?<!(\{|\n))\n', '"\n', str)
    str = re.sub(r'\n(?=.*{)', '},\n', str)
    str = re.sub(r'"(?=\n(?!}))', '",', str)
    str = re.sub(r'^', '{\n"', str)
    str = re.sub(r'$', '"\n}\n}', str)
    return str


def show_roles(request):

    with open(str(pathlib.Path(__file__).parent)+"/../../data/roles.txt", 'r') as f:
        contents = f.read()
        contents = text2json(contents)
    myjson = json.loads(contents)
    for team in myjson:
        i = 0
        print("    "+team+":")
        for role in myjson[team]:
            i += 1
            if (i) > 5:
                break
            print("{}. {} -> {}".format(i, role, myjson[team][role]))

    return JsonResponse(myjson, JSONEncoder)
