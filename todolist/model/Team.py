"""
# Team table
column mean: 
    t_id: team id - use uuid
    member: team member - related to User
"""
from django.db import models
from User import User


class Team(models.Model):
    t_id = models.CharField(max_length=36, primary_key=True)  # UUID
    member = models.ManyToManyField(User)
