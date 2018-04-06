import pytest

from django.contrib.sessions.models import Session


@pytest.mark.django_db
def test_correct_login_adds_cookie(graphql_client, admin_user):
    resp = graphql_client.query('''
        mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                ok
                errors {
                    nonFieldErrors
                }
            }
        }
    ''', variables={
        'username': admin_user.email,
        'password': 'password',
    })

    assert 'errors' not in resp
    assert not resp['data']['login']['errors']['nonFieldErrors']

    assert resp['data']['login']['ok']

    cookies = graphql_client.client.cookies

    assert 'sessionid' in cookies

    session = Session.objects.get(session_key=cookies['sessionid'].value)
    uid = session.get_decoded().get('_auth_user_id')

    assert uid == str(admin_user.id)


@pytest.mark.django_db
def test_wrong_email_returns_error(graphql_client, admin_user):
    resp = graphql_client.query('''
        mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                ok
                errors {
                    nonFieldErrors
                }
            }
        }
    ''', variables={
        'username': 'wrong-email',
        'password': 'password',
    })

    assert not resp['data']['login']['ok']
    assert resp['data']['login']['errors']['nonFieldErrors']

    errors = resp['data']['login']['errors']

    assert (
        errors['nonFieldErrors'] == [
            'Unable to log in with provided credentials'
        ]
    )

    cookies = graphql_client.client.cookies

    assert 'sessionid' not in cookies
