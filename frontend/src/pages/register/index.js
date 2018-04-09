import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { FormControl, FormHelperText } from "material-ui/Form";
import { LinearProgress } from "material-ui/Progress";
import { withRouter } from "react-router-dom";

import idx from "idx";

const getErrors = (data, key) => idx(data, _ => _.register.errors[key]) || [];
const hasErrors = (data, key) => getErrors(data, key).length > 0;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  }
});

const REGISTER = gql`
  mutation Register($input: RegistrationInput!) {
    register(input: $input) {
      ok
      user {
        fullName
        team {
          name
        }
      }
      errors {
        fullName
        teamName
        email
        password
        nonFieldErrors
      }
    }
  }
`;

class Registration extends PureComponent {
  state = {
    fullName: "",
    email: "",
    teamName: "",
    password: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="display1" style={{ marginBottom: 40 }}>
          Register
        </Typography>

        <Mutation
          mutation={REGISTER}
          onCompleted={data => {
            const ok = idx(data, _ => _.register.ok);

            if (ok) {
              this.props.history.push("/profile");
            }
          }}
          variables={{ input: this.state }}
        >
          {(register, { loading, error, data }) => (
            <React.Fragment>
              {loading && <LinearProgress />}

              {error && (
                <Typography color="error">
                  {error.message}, make sure you have compiled all the field
                  correctly
                </Typography>
              )}

              <form
                onSubmit={e => {
                  e.preventDefault();
                  register();
                }}
                className={classes.container}
                noValidate
                autoComplete="off"
              >
                <FormControl error={hasErrors(data, "fullName")}>
                  <TextField
                    label="Full name"
                    required
                    value={this.state.fullName}
                    onChange={this.handleChange("fullName")}
                    margin="normal"
                    disabled={loading}
                  />
                  <FormHelperText>
                    {getErrors(data, "fullName").join(" ")}
                  </FormHelperText>
                </FormControl>

                <FormControl error={hasErrors(data, "teamName")}>
                  <TextField
                    label="Team Name"
                    value={this.state.teamName}
                    helperText="This will be public"
                    onChange={this.handleChange("teamName")}
                    margin="normal"
                    disabled={loading}
                  />
                  <FormHelperText>
                    {getErrors(data, "teamName").join(" ")}
                  </FormHelperText>
                </FormControl>

                <FormControl error={hasErrors(data, "email")}>
                  <TextField
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    type="email"
                    margin="normal"
                    required
                    disabled={loading}
                  />
                  <FormHelperText>
                    {getErrors(data, "email").join(" ")}
                  </FormHelperText>
                </FormControl>

                <FormControl error={hasErrors(data, "password")}>
                  <TextField
                    label="Password"
                    value={this.state.password}
                    onChange={this.handleChange("password")}
                    type="password"
                    autoComplete="current-password"
                    required
                    margin="normal"
                    disabled={loading}
                  />
                  <FormHelperText>
                    {getErrors(data, "password").join(" ")}
                  </FormHelperText>
                </FormControl>

                <Button
                  variant="raised"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 20
                  }}
                >
                  Register
                </Button>
              </form>
            </React.Fragment>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Registration));
