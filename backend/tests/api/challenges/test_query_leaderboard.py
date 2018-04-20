import pytest

from challenges.models import Submission, Challenge


@pytest.mark.django_db
def test_returns_empty_when_no_submissions(graphql_client):
    resp = graphql_client.query('''
        query {
            leaderboard {
                name
                score
            }
        }
    ''')

    assert 'errors' not in resp

    assert resp['data']['leaderboard'] == []


@pytest.mark.django_db
def test_returns_submissions(graphql_client, user):
    challenge = Challenge.objects.create(name='demo')
    user.full_name = 'Patrick'
    user.save()

    Submission.objects.create(
        solution='abc',
        code='abc',
        score=123,
        submitted_by=user,
        challenge=challenge,
    )

    resp = graphql_client.query('''
        query {
            leaderboard {
                name
                score
            }
        }
    ''')

    assert 'errors' not in resp

    assert len(resp['data']['leaderboard']) == 1
    assert resp['data']['leaderboard'][0]['name'] == user.full_name
