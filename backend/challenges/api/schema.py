import graphene

from ..models import Challenge

from .types import ChallengeType
from .mutations import UploadSubmissionMutation


class ChallengeQuery():
    challenges = graphene.List(graphene.NonNull(ChallengeType))

    def resolve_challenges(self, info):
        return Challenge.objects.all()


class ChallengeMutations():
    upload_submission = UploadSubmissionMutation.Field()
