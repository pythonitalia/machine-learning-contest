import graphene

from users.api.schema import UserMutations, UserQuery
from challenges.api.schema import ChallengeQuery


class Query(
    ChallengeQuery,
    UserQuery,
    graphene.ObjectType
):
    hello = graphene.String()

    def resolve_hello(self, info):
        return 'world'


class Mutations(
    UserMutations,
    graphene.ObjectType
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutations)
