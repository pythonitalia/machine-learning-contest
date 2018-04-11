import pytest

from challenges.models import Challenge, Submission


@pytest.mark.django_db
def test_does_not_work_when_not_logged_in(graphql_client):
    challenge = Challenge.objects.create(name='demo')

    resp = graphql_client.query('''
        mutation UploadSubmission($input: UploadSubmissionInput!) {
            uploadSubmission(input: $input) {
                ok
                result
            }
        }
    ''', variables={
        'input': {
            'challenge': challenge.pk,
            'data': 'example data',
        }
    })

    assert 'errors' in resp

    assert resp['errors'][0]['message'] == 'You are not logged in.'


# TODO: "404s"

@pytest.mark.django_db
def test_works_when_logged_in(graphql_client, user):
    challenge = Challenge.objects.create(name='demo')
    graphql_client.client.force_login(user)

    resp = graphql_client.query('''
        mutation UploadSubmission($input: UploadSubmissionInput!) {
            uploadSubmission(input: $input) {
                ok
                result
            }
        }
    ''', variables={
        'input': {
            'challenge': challenge.pk,
            'data': 'example data',
        }
    })

    assert 'errors' not in resp

    assert Submission.objects.count() == 1

    # TODO: test score
    submission = Submission.objects.first()

    assert submission.submitted_by == user
    assert submission.challenge == challenge
