import graphene

from .mutations import LoginMutation, LogoutMutation, RegisterMutation

from .types import UserType


class UserMutations():
    login = LoginMutation.Field()
    logout = LogoutMutation.Field()
    register = RegisterMutation.Field()


class UserQuery():
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        if not info.context.user.is_authenticated:
            raise ValueError('You are not logged in.')
