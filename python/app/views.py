from json.encoder import JSONEncoder
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
    this_user = User.objects.filter(token__token=this_token)
    this_role = Role.objects.filter(name=request.POST['rolename'])

    print("alakiiiiiiiiiiiiiiiiiiiiiiii")
    print(this_role)

    return JsonResponse(
        {'status': '{} fetched'.format(this_role)},
        JSONEncoder)
