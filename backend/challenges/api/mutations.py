import graphene


class UploadSubmissionInput(graphene.InputObjectType):
    challenge = graphene.Int(required=True)
    data = graphene.String(required=True)


class UploadSubmissionErrors(graphene.ObjectType):
    challenge = graphene.List(graphene.NonNull(graphene.String))
    data = graphene.List(graphene.NonNull(graphene.String))


class UploadSubmissionMutation(graphene.Mutation):
    ok = graphene.Boolean()
    result = graphene.String()
    errors = graphene.Field(UploadSubmissionErrors, required=True)

    class Arguments:
        input = UploadSubmissionInput(required=True)

    @classmethod
    def mutate(cls, root, info, input):
        if not info.context.user.is_authenticated:
            raise ValueError('You are not logged in.')
