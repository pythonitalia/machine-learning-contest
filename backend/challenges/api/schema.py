import graphene

from ..models import Challenge

from .types import ChallengeType
from .mutations import UploadSubmissionMutation


class ChallengeQuery():
    challenge = graphene.Field(ChallengeType, id=graphene.ID())
    challenges = graphene.List(graphene.NonNull(ChallengeType))

    def resolve_challenges(self, info):
        return Challenge.objects.all()

    def resolve_challenge(self, info, id):
        try:
            return Challenge.objects.get(pk=id)
        except Challenge.DoesNotExist:
            return None


class ChallengeMutations():
    upload_submission = UploadSubmissionMutation.Field()
