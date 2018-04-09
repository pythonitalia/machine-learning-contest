import graphene
from graphene_django.types import DjangoObjectType

from ..models import User, Team


class TeamType(DjangoObjectType):
    class Meta:
        model = Team
        only_fields = ('name', )


class UserType(DjangoObjectType):
    team = graphene.Field(TeamType)

    def resolve_team(self, context):
        try:
            return self.team
        except Team.DoesNotExist:
            return None

    class Meta:
        model = User
        only_fields = ('full_name', 'email')
