import pytest


@pytest.mark.django_db
def test_returns_error_when_not_logged_in(graphql_client):
    resp = graphql_client.query('''
        query {
            me {
                fullName
            }
        }
    ''')

    assert 'errors' in resp

    assert resp['errors'][0]['message'] == 'You are not logged in.'


@pytest.mark.django_db
def test_returns_user_when_logged_in(graphql_client, user):
    user.full_name = 'Polly'
    user.save()
    graphql_client.client.force_login(user)

    resp = graphql_client.query('''
        query {
            me {
                fullName
            }
        }
    ''')

    assert 'errors' not in resp

    assert resp['data']['me']
    assert resp['data']['me']['fullName'] == 'Polly'
