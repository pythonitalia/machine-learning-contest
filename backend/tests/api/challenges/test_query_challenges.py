import pytest


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
