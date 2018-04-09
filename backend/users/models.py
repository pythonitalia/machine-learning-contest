from django.db import models

from .managers import UserManager

from django.utils.translation import ugettext_lazy as _

from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser


class User(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(
        _('full name'),
        max_length=200,
        null=True,
        blank=True,
    )
    email = models.EmailField(_('email address'), unique=True)

    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('is staff'), default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def get_short_name(self):
        return self.email


class Team(models.Model):
    name = models.CharField(max_length=200)
    owner = models.OneToOneField(
        User,
        on_delete=models.PROTECT,
        related_name='team'
    )
