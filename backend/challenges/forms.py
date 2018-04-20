from django import forms

from .models import Submission


class SubmissionForm(forms.ModelForm):
    class Meta:
        model = Submission
        fields = ['code', 'solution', 'challenge']

    def save(self, user):
        submission = super().save(commit=False)
        submission.submitted_by = user
        submission.save()

        return submission
