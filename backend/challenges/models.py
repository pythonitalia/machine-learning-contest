from django.conf import settings
from django.db import models

from model_utils.models import TimeStampedModel


class Challenge(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Submission(TimeStampedModel):
    solution = models.TextField()
    code = models.TextField()
    score = models.CharField(max_length=10, editable=False)
    submitted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT
    )
    challenge = models.ForeignKey(Challenge, on_delete=models.PROTECT)

    def __str__(self):
        return f'Submission on {self.challenge} by {self.submitted_by}'
