import pytest

from users.models import User, Team

from django.contrib.sessions.models import Session


@pytest.mark.django_db
def test_registration_works(graphql_client):
    resp = graphql_client.query('''
        mutation Register($input: RegistrationInput!) {
            register(input: $input) {
                ok
                user {
                    fullName
                }
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
    assert data['user']['fullName'] == 'Patrick Arminio'

    assert User.objects.count() == 1

    user = User.objects.first()

    assert user.full_name == 'Patrick Arminio'

    cookies = graphql_client.client.cookies

    assert 'sessionid' in cookies

    session = Session.objects.get(session_key=cookies['sessionid'].value)
    uid = session.get_decoded().get('_auth_user_id')

    assert uid == str(user.id)


@pytest.mark.django_db
def test_registration_with_errors(graphql_client):
    resp = graphql_client.query('''
        mutation Register($input: RegistrationInput!) {
            register(input: $input) {
                ok
                user {
                    fullName
                }
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
            'email': '',
            'password': 'do you even 🏋🏼‍',
        }
    })

    assert 'errors' not in resp

    data = resp['data']['register']

    assert data['errors']['email'] == ['This field is required.']


@pytest.mark.django_db
def test_registration_bad_email(graphql_client):
    resp = graphql_client.query('''
        mutation Register($input: RegistrationInput!) {
            register(input: $input) {
                ok
                user {
                    fullName
                }
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
            'email': 'aaaaa',
            'password': 'do you even 🏋🏼‍',
        }
    })

    assert 'errors' not in resp

    data = resp['data']['register']

    assert data['errors']['email'] == ['Enter a valid email address.']


@pytest.mark.django_db
def test_registration_unique_email(graphql_client):
    pat = User.objects.create(email='patrick.arminio@gmail.com')

    resp = graphql_client.query('''
        mutation Register($input: RegistrationInput!) {
            register(input: $input) {
                ok
                user {
                    fullName
                }
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
            'email': pat.email,
            'password': 'do you even 🏋🏼‍',
        }
    })

    assert 'errors' not in resp

    data = resp['data']['register']

    assert data['errors']['email'] == [
        'User with this Email address already exists.'
    ]


@pytest.mark.django_db
def test_registration_creates_team(graphql_client):
    resp = graphql_client.query('''
        mutation Register($input: RegistrationInput!) {
            register(input: $input) {
                ok
                user {
                    fullName
                    team {
                        name
                    }
                }
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
    assert data['user']['team']['name'] == 'ORO 🏆'

    assert Team.objects.count() == 1

    team = Team.objects.first()

    assert team.name == 'ORO 🏆'


@pytest.mark.django_db
def test_registration_without_team(graphql_client):
    resp = graphql_client.query('''
        mutation Register($input: RegistrationInput!) {
            register(input: $input) {
                ok
                user {
                    fullName
                    team {
                        name
                    }
                }
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
            'teamName': '',
            'email': 'patrick.arminio@gmail.com',
            'password': 'do you even 🏋🏼‍',
        }
    })

    assert 'errors' not in resp

    data = resp['data']['register']

    assert all([value is None for key, value in data['errors'].items()])
    assert data['ok']
    assert data['user']['team'] is None

    assert Team.objects.count() == 0
