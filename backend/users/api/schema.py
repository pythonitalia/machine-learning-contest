from .mutations import LoginMutation, LogoutMutation, RegisterMutation


class UserMutations():
    login = LoginMutation.Field()
    logout = LogoutMutation.Field()
    register = RegisterMutation.Field()
