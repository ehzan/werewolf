from os import name
from pathlib import Path
import json
import re
from app.models import Role


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


def insert_from_file(filename):
    roles_file = Path(__file__).parent.parent.parent.parent / 'data' / filename
    with open(roles_file, 'r') as f:
        contents = f.read()
    myjson = json.loads(text2json(contents))
    n_create = n_update = 0
    for team in myjson:
        for role in myjson[team]:
            obj, created = Role.objects.get_or_create(
                name=role,
                defaults={'team': 'w' if team == 'City Roles' else 'b',
                          'description': myjson[team][role]})
            if not created:
                obj.description = myjson[team][role]
                obj.team = 'w' if team == 'City Roles' else 'b'
                obj.save()
                n_update += 1
            else:
                n_create += 1
    print("{} roles created and {} roles updated".format(n_create, n_update))


def delete_roles():
    n, dict = Role.objects.all().delete()
    print('{} roles deleted'.format(n))


def print_roles():
    print(Role.objects.all())
    print('====================')
    for obj in Role.objects.all():
        print("{}: {}...  {} {} {} {}".format(
            obj.name, obj.description[:50], obj.persianName,
            'hidden' if obj.hidden else 'visible',
            'primary' if obj.primary else 'secondary',
            'default' if obj.default else 'not default'))


def run(*args):
    if 'insert' in args:
        insert_from_file('roles.txt')
    if 'delete' in args:
        delete_roles()
    if 'print' in args:
        print_roles()
