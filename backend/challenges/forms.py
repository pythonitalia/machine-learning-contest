import tempfile

from django import forms

from .models import Submission

# try:
from .score_calculator import calculate_score
# except ImportError:
#     def calculate_score(*args):
#         return 1


def save_to_tmp(content):
    with tempfile.NamedTemporaryFile('w', suffix='.csv', delete=False) as tmp:
        tmp.write(content)

    return tmp.name


class SubmissionForm(forms.ModelForm):
    class Meta:
        model = Submission
        fields = ['code', 'solution', 'challenge']

    def clean_solution(self):
        path = save_to_tmp(self.cleaned_data['solution'])

        try:
            self.score = calculate_score(path)
        except Exception as error:
            raise forms.ValidationError(error)

        return self.cleaned_data['solution']

    def save(self, user):
        submission = super().save(commit=False)
        submission.submitted_by = user
        submission.score = self.score

        submission.save()

        return submission
