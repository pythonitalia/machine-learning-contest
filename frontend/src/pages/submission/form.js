import React, { PureComponent } from "react";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";
import Chip from "material-ui/Chip";
import idx from "idx";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { FormHelperText } from "material-ui";

const UPLOAD_SUBMISSION = gql`
  mutation UploadSubmission($input: UploadSubmissionInput!) {
    uploadSubmission(input: $input) {
      ok
      result
    }
  }
`;

class SubmissionForm extends PureComponent {
  state = {
    solution: null,
    code: null
  };

  handleFileChange = event => {
    const { name } = event.target;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = reader => {
      this.setState({ [name]: reader.target.result });
    };

    reader.readAsText(file);
  };

  render() {
    const { classes } = this.props;

    const hasData = this.state.code && this.state.solution;

    return (
      <Mutation mutation={UPLOAD_SUBMISSION}>
        {(upload, { data, loading, called }) => {
          const errors = idx(
            data,
            _ => _.uploadSubmission.errors.nonFieldErrors
          );

          return (
            <form
              className={classes.container}
              noValidate
              autoComplete="off"
              onSubmit={e => {
                e.preventDefault();

                upload({
                  variables: {
                    input: {
                      code: this.state.code,
                      solution: this.state.solution,
                      challenge: +this.props.id
                    }
                  }
                });
              }}
            >
              {errors && (
                <FormHelperText error>{errors.join(" ")}</FormHelperText>
              )}

              {loading && <LinearProgress />}

              {!loading &&
                called && (
                  <div>
                    {data.uploadSubmission.ok ? (
                      <h1>Upload successful</h1>
                    ) : (
                      <h1>Upload unsuccessful</h1>
                    )}

                    {data.uploadSubmission.result && (
                      <p>Your result is {data.uploadSubmission.result}</p>
                    )}
                  </div>
                )}

              <label>
                <Chip label="Solution" />

                <input
                  name="solution"
                  onChange={this.handleFileChange}
                  accept="text/plain"
                  type="file"
                />
              </label>

              <label>
                <Chip label="Code" />

                <input
                  name="code"
                  onChange={this.handleFileChange}
                  accept="text/plain"
                  type="file"
                />
              </label>

              <Button
                variant="raised"
                color="primary"
                type="submit"
                disabled={loading || !hasData}
                className={classes.button}
              >
                Send
              </Button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default SubmissionForm;
