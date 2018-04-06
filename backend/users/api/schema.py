from .mutations import LoginMutation, LogoutMutation


class UserMutations():
    login = LoginMutation.Field()
    logout = LogoutMutation.Field()
