import graphene

from users.api.schema import UserMutations, UserQuery


class Query(UserQuery, graphene.ObjectType):
    hello = graphene.String()

    def resolve_hello(self, info):
        return 'world'


class Mutations(
    UserMutations,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutations)
