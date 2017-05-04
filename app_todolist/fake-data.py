"""
generate fake data 
"""

import uuid
from datetime import datetime
from hashlib import sha1
from hashlib import sha256
from hashlib import sha512
from random import random
from math import floor

from app_todolist.models import User, Team, Transaction

# username = str(uuid.uuid1())
# user = User(name=username,
#             pwd=sha256(username).hexdigest())
#
# user.save()

# team_name = str(uuid.uuid1())
# #
# team = Team(t_id=team_name)
# team.save()

team = Team.objects.all()[0]
# print (team)
user = User.objects.get(pk=2)
# team[0].member.add(user)

# print (team.t_id)

for i in range(0, 30):
    transaction = Transaction(t_id=str(uuid.uuid4()),
                              name=sha1(str(uuid.uuid4())).hexdigest(),
                              detail=sha512(str(uuid.uuid4())).hexdigest(),
                              finish=floor(random() * 2),
                              expire_date=datetime.now(),
                              priority=(floor(random() * 5) + 1),
                              parents_id=None,
                              creator=user,
                              team=team)
    transaction.save()

