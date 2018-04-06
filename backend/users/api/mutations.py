import graphene

from django.contrib.auth import login, logout, authenticate


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
