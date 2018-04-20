import graphene
from graphene_django.types import DjangoObjectType

from django.core.exceptions import ObjectDoesNotExist

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
        user = root.submitted_by

        try:
            return user.team.name
        except ObjectDoesNotExist:
            pass

        return user.full_name
