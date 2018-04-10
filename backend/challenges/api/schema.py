import graphene

from ..models import Challenge

from .types import ChallengeType


class ChallengeQuery():
    challenges = graphene.List(graphene.NonNull(ChallengeType))

    def resolve_challenges(self, info):
        return Challenge.objects.all()
