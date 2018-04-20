from django import forms

from .models import User, Team


class RegisterForm(forms.ModelForm):
    team_name = forms.CharField(max_length=200, required=False)

    class Meta:
        model = User
        fields = '__all__'

    def save(self, *args, **kwargs):
        obj = super().save(*args, **kwargs)

        obj.is_active = True
        obj.set_password(self.cleaned_data['password'])
        obj.save()

        if self.cleaned_data['team_name']:
            Team.objects.create(name=self.cleaned_data['team_name'], owner=obj)

        return obj
