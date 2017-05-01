"""
Transaction table
column mean:
    t_id: transaction id - use uuid to mark
    name: transaction name
    detail: transaction detail
    parents_id: whether the transaction is the child transaction
    creator: who create the transaction
    team: the transaction belong which team
"""

from django.db import models
from Team import Team
from User import User


class Transaction(models.Model):
    t_id = models.CharField(max_length=36, primary_key=True)  # UUID
    name = models.CharField(max_length=128)
    detail = models.CharField(max_length=2048)
    parents_id = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
