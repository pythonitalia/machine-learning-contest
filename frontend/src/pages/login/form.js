import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import { LinearProgress } from "material-ui/Progress";
import TextField from "material-ui/TextField";
import idx from "idx";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { FormHelperText } from "material-ui";

const LOGIN = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      ok
      errors {
        nonFieldErrors
      }
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  }
});

class LoginForm extends PureComponent {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Mutation mutation={LOGIN}>
        {(login, { data, loading }) => {
          const errors = idx(data, _ => _.login.errors.nonFieldErrors);

          return (
            <form
              className={classes.container}
              noValidate
              autoComplete="off"
              onSubmit={e => {
                e.preventDefault();

                console.log("sending");

                login({
                  variables: {
                    email: this.state.email,
                    password: this.state.password
                  }
                });
              }}
            >
              {errors && (
                <FormHelperText error>{errors.join(" ")}</FormHelperText>
              )}

              {loading && <LinearProgress />}

              <TextField
                label="Email"
                value={this.state.email}
                onChange={this.handleChange("email")}
                type="email"
                margin="normal"
              />

              <TextField
                label="Password"
                value={this.state.password}
                onChange={this.handleChange("password")}
                type="password"
                autoComplete="current-password"
                margin="normal"
              />

              <Button raised color="primary" type="submit">
                Login
              </Button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(LoginForm);
