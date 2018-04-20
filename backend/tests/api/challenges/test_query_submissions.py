import pytest

from challenges.models import Submission, Challenge
from users.models import User


@pytest.mark.django_db
def test_returns_empty_when_no_submissions(graphql_client):
    resp = graphql_client.query('''
        query {
            mySubmissions {
                score
            }
        }
    ''')

    assert 'errors' not in resp

    assert resp['data']['mySubmissions'] == []


@pytest.mark.django_db
def test_returns_submissions(graphql_client, user):
    challenge = Challenge.objects.create(name='demo')

    Submission.objects.create(
        solution='abc',
        code='abc',
        score=123,
        submitted_by=user,
        challenge=challenge,
    )

    graphql_client.client.force_login(user)

    resp = graphql_client.query('''
        query {
            mySubmissions {
                score
            }
        }
    ''')

    assert 'errors' not in resp

    assert len(resp['data']['mySubmissions']) == 1
    assert resp['data']['mySubmissions'][0]['score'] == '123'


@pytest.mark.django_db
def test_returns_user_submissions(graphql_client, user):
    challenge = Challenge.objects.create(name='demo')

    b = User.objects.create(full_name='example')

    Submission.objects.create(
        solution='abc',
        code='abc',
        score=123,
        submitted_by=user,
        challenge=challenge,
    )

    Submission.objects.create(
        solution='abc',
        code='abc',
        score=777,
        submitted_by=b,
        challenge=challenge,
    )

    graphql_client.client.force_login(user)

    resp = graphql_client.query('''
        query {
            mySubmissions {
                score
            }
        }
    ''')

    assert 'errors' not in resp

    assert len(resp['data']['mySubmissions']) == 1
    assert resp['data']['mySubmissions'][0]['score'] == '123'
