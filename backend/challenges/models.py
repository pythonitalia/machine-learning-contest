from django.db import models


class Challenge(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        self.name
