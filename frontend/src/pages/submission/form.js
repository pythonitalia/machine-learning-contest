import React, { PureComponent } from "react";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";
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
    data: null
  };

  handleFileChange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = reader => {
      this.setState({ data: reader.target.result });
    };

    reader.readAsText(file);
  };

  render() {
    const { classes } = this.props;

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
                      data: this.state.data,
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

              <input
                onChange={this.handleFileChange}
                accept="text/plain"
                className={classes.input}
                id="raised-button-file"
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="raised"
                  component="span"
                  className={classes.button}
                >
                  Upload solution
                </Button>
              </label>

              <Button
                variant="raised"
                color="primary"
                type="submit"
                disabled={loading || !this.state.data}
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
