import pytest

from challenges.models import Challenge


@pytest.mark.django_db
def test_returns_empty_when_no_challenges(graphql_client):
    resp = graphql_client.query('''
        query {
            challenges {
                name
            }
        }
    ''')

    assert 'errors' not in resp

    assert resp['data']['challenges'] == []


@pytest.mark.django_db
def test_returns_challenges(graphql_client):
    Challenge.objects.create(name='demo')

    resp = graphql_client.query('''
        query {
            challenges {
                name
            }
        }
    ''')

    assert 'errors' not in resp

    assert len(resp['data']['challenges']) == 1
    assert resp['data']['challenges'][0]['name'] == 'demo'
