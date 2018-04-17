import pytest

from challenges.models import Challenge


@pytest.mark.django_db
def test_returns_none_when_no_challenge(graphql_client):
    resp = graphql_client.query('''
        query {
            challenge(id: 999) {
                name
            }
        }
    ''')

    assert 'errors' not in resp

    assert resp['data']['challenge'] is None


@pytest.mark.django_db
def test_returns_challenge(graphql_client):
    challenge = Challenge.objects.create(name='demo')

    resp = graphql_client.query(f'''
        query {{
            challenge(id: {challenge.id}) {{
                name
            }}
        }}
    ''')

    assert 'errors' not in resp

    assert resp['data']['challenge']['name'] == 'demo'
