import graphene

from ..models import Challenge, Submission

from .types import ChallengeType, LeaderboardSubmissionType, SubmissionType
from .mutations import UploadSubmissionMutation


class ChallengeQuery():
    challenge = graphene.Field(ChallengeType, id=graphene.ID())
    challenges = graphene.List(graphene.NonNull(ChallengeType))
    leaderboard = graphene.List(graphene.NonNull(LeaderboardSubmissionType))
    my_submissions = graphene.List(graphene.NonNull(SubmissionType))

    def resolve_challenges(self, info):
        return Challenge.objects.all()

    def resolve_challenge(self, info, id):
        try:
            return Challenge.objects.get(pk=id)
        except Challenge.DoesNotExist:
            return None

    def resolve_leaderboard(self, info):
        all_submissions = Submission.objects.order_by('-score')
        leaderboard = []

        seen_user = set()

        for submission in all_submissions:
            user = submission.submitted_by

            if user.pk not in seen_user:
                leaderboard.append(submission)

            seen_user.add(user.pk)

        return leaderboard

    def resolve_my_submissions(self, info):
        if not info.context.user.is_authenticated:
            return Submission.objects.none()

        return Submission.objects.order_by('-created').filter(
            submitted_by=info.context.user
        )


class ChallengeMutations():
    upload_submission = UploadSubmissionMutation.Field()
