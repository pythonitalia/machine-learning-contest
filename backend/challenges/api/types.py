import graphene
from graphene_django.types import DjangoObjectType

from ..models import Challenge, Submission


class ChallengeType(DjangoObjectType):
    class Meta:
        model = Challenge
        only_fields = ('name', )


class LeaderboardSubmissionType(DjangoObjectType):
    name = graphene.String()

    class Meta:
        model = Submission
        only_fields = ('score', )

    def resolve_name(root, info):
        return root.submitted_by.full_name
