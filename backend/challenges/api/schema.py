import graphene

from ..models import Challenge, Submission

from .types import ChallengeType, LeaderboardSubmissionType
from .mutations import UploadSubmissionMutation


class ChallengeQuery():
    challenge = graphene.Field(ChallengeType, id=graphene.ID())
    challenges = graphene.List(graphene.NonNull(ChallengeType))
    leaderboard = graphene.List(graphene.NonNull(LeaderboardSubmissionType))

    def resolve_challenges(self, info):
        return Challenge.objects.all()

    def resolve_challenge(self, info, id):
        try:
            return Challenge.objects.get(pk=id)
        except Challenge.DoesNotExist:
            return None

    def resolve_leaderboard(self, info):
        return Submission.objects.all()


class ChallengeMutations():
    upload_submission = UploadSubmissionMutation.Field()
