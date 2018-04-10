import pytest

from challenges.models import Challenge


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
