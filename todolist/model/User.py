"""
# User table
column mean:
    u_id: User id 
    name: username
    pwd: user password - use sha2
    team: user's team - related Team
"""

from django.db import models
from Team import Team


class User(models.Model):
    u_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)
    pwd = models.CharField(max_length=64)
    team = models.ManyToManyField(Team)

