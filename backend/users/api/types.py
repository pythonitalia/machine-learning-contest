from graphene_django.types import DjangoObjectType

from ..models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        only_fields = ('full_name', 'email')
