"""
 todolist's table
"""

from django.db import models


class User(models.Model):
    """
    User: 
        u_id - user id(integer)
        name - username
        pwd - user password
    """
    u_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128, unique=True)
    pwd = models.CharField(max_length=64)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now_add=True)


class Team(models.Model):
    """
    Team:
        t_id - team id (uuid)
        member - team member
    """
    t_id = models.CharField(max_length=36, primary_key=True)  # UUID
    member = models.ManyToManyField(User)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now_add=True)


class Transaction(models.Model):
    """
    Transaction:
        t_id - transaction id (uuid)
        name - transaction title
        detail - transaction detail
        finish - whether finish transaction
        expired_data - expire date
        priority - priority from 1 to 5
        parents_id - transaction parents transaction(related to Transaction)
        creator - creator (related to User)
        team - belong team (related to Team)
    """
    t_id = models.CharField(max_length=36, primary_key=True)  # UUID
    name = models.CharField(max_length=128)
    detail = models.CharField(max_length=2048)
    finish = models.BooleanField(default=False)
    expire_date = models.DateField(blank=True, null=True)
    priority = models.IntegerField(default=1)
    parents_id = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now_add=True)
