import pytest


@pytest.mark.django_db
def test_correct_logout_removes_cookies_and_session(
    graphql_client,
    admin_user,
):
    graphql_client.client.force_login(admin_user)

    resp = graphql_client.query('''
        mutation Logout {
            logout {
                ok
            }
        }
    ''')

    assert 'errors' not in resp

    assert resp['data']['logout']['ok']

    cookies = graphql_client.client.cookies

    assert 'sessionid' in cookies
    assert cookies['sessionid'].value == ''
