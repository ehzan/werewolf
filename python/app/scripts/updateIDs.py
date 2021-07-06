from app.models import *


def run(*args):
    if len(args) > 0:
        print(int(args[0]))
        r = Role.objects.all().order_by(
            '-team', 'hidden', '-primary', 'order')[int(args[0])]
        print('{}. {} ({}, {})'.format(r.id, r.name, r.primary, r.default))
    if len(args) > 1:
        Role.objects.create(id=int(args[1]), name=r.name, team=r.team,
                            persianName=r.persianName, description=r.description, order=r.order,
                            hidden=r.hidden, primary=r.primary, default=r.default,)
        r.delete()

    # i = 0
    # for r in Role.objects.all().order_by('-team', 'hidden', 'primary', 'order'):
    #     if int(args[0]) <= i and i <= int(args[1]):
    #         print('{}. {}'.format(r.id, r.name))
        # Role.objects.create(id=i+1, name=r.name, team=r.team,
        #                     persianName=r.persianName, description=r.description, order=r.order,
        #                     hidden=r.hidden, primary=r.primary, default=r.default,)
    #     i += 1
