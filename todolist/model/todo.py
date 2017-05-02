from django.db import models


class User(models.Model):
    u_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=128)
    pwd = models.CharField(max_length=64)


class Team(models.Model):
    t_id = models.CharField(max_length=36, primary_key=True)  # UUID
    member = models.ManyToManyField(User)


class Transaction(models.Model):
    t_id = models.CharField(max_length=36, primary_key=True)  # UUID
    name = models.CharField(max_length=128)
    detail = models.CharField(max_length=2048)
    parents_id = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
