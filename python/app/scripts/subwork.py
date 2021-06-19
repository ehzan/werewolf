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
    for team in myjson:
        for role in myjson[team]:
            try:
                obj, created = Role.objects.update_or_create(
                    name=role,
                    defaults={
                        'team': 'w' if team == 'City Roles' else 'b',
                        # persianName='',
                        'description': myjson[team][role],
                        'hidden': False, 'checked': False, 'default': True})
            except:
                print("{} not created".format(role))
    print("insert completed")


def print_roles():
    print(Role.objects.all())
    print('====================')
    for obj in Role.objects.all():
        print("{}: {}...     {} {} {} {}".format(
            obj.name, obj.description[:50], obj.persianName,
            ("checked," if obj.checked else "uncheched,"),
            ("hidden," if obj.hidden else "display,"),
            ("default," if obj.default else "")))


def run(*args):
    if 'insert' in args:
        insert_from_file('roles.txt')
    if 'print' in args:
        print_roles()
