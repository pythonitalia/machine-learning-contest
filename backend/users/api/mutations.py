import graphene

from django.contrib.auth import login, logout, authenticate

from ..forms import RegisterForm


class LoginErrors(graphene.ObjectType):
    non_field_errors = graphene.List(graphene.NonNull(graphene.String))


class LoginMutation(graphene.Mutation):
    ok = graphene.Boolean()
    errors = graphene.Field(LoginErrors, required=True)

    class Arguments:
        username = graphene.String()
        password = graphene.String()

    @classmethod
    def mutate(cls, root, info, username, password):
        user = authenticate(username=username, password=password)

        if user is None:
            error = [
                'Unable to log in with provided credentials'
            ]

            return cls(
                errors=LoginErrors(non_field_errors=error),
                ok=False,
            )

        if not user.is_active:
            error = [
                'It seems your account has been disabled'
            ]

            return cls(
                errors=LoginErrors(non_field_errors=error),
                ok=False,
            )

        login(info.context, user)

        return cls(ok=True, errors=LoginErrors())


class LogoutMutation(graphene.Mutation):
    ok = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info):
        logout(info.context)

        return cls(ok=True)


class RegistrationInput(graphene.InputObjectType):
    full_name = graphene.String(required=True)
    team_name = graphene.String()
    email = graphene.String(required=True)
    password = graphene.String(required=True)


class RegistrationErrors(graphene.ObjectType):
    full_name = graphene.List(graphene.NonNull(graphene.String))
    team_name = graphene.List(graphene.NonNull(graphene.String))
    email = graphene.List(graphene.NonNull(graphene.String))
    password = graphene.List(graphene.NonNull(graphene.String))
    non_field_errors = graphene.List(graphene.NonNull(graphene.String))


class RegisterMutation(graphene.Mutation):
    # TODO: return user info
    ok = graphene.Boolean()
    errors = graphene.Field(RegistrationErrors, required=True)

    class Arguments:
        input = RegistrationInput(required=True)

    @classmethod
    def mutate(cls, root, info, input):
        form = RegisterForm(data=input)

        if form.is_valid():
            form.save()

            return cls(ok=True, errors=RegistrationErrors())

        return cls(ok=False, errors=RegistrationErrors(**form.errors))
