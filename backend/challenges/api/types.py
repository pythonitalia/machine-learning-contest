from graphene_django.types import DjangoObjectType

from ..models import Challenge


class ChallengeType(DjangoObjectType):
    class Meta:
        model = Challenge
        only_fields = ('name', )
