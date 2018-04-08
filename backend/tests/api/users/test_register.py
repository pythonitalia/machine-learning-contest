import pytest

from users.models import User

from django.contrib.sessions.models import Session


@pytest.mark.django_db
def test_registration_works(graphql_client):
    resp = graphql_client.query('''
        mutation Register($input: RegistrationInput!) {
            register(input: $input) {
                ok
                errors {
                    fullName
                    teamName
                    email
                    password
                    nonFieldErrors
                }
            }
        }
    ''', variables={
        'input': {
            'fullName': 'Patrick Arminio',
            'teamName': 'ORO 🏆',
            'email': 'patrick.arminio@gmail.com',
            'password': 'do you even 🏋🏼‍',
        }
    })

    assert 'errors' not in resp

    data = resp['data']['register']

    assert all([value is None for key, value in data['errors'].items()])
    assert data['ok']

    assert User.objects.count() == 1

    user = User.objects.first()

    assert user.full_name == 'Patrick Arminio'

    cookies = graphql_client.client.cookies

    assert 'sessionid' in cookies

    session = Session.objects.get(session_key=cookies['sessionid'].value)
    uid = session.get_decoded().get('_auth_user_id')

    assert uid == str(user.id)
