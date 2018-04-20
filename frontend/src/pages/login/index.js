import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import LoginForm from "./form";

import { Link } from "react-router-dom";

const styles = theme => ({});

class Login extends PureComponent {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Typography variant="display1" gutterBottom>
          Login
        </Typography>

        <Typography variant="body1" gutterBottom>
          Not registered? <Link to="/register">Register here</Link>
        </Typography>

        <LoginForm />
      </div>
    );
  }
}

export default withStyles(styles)(Login);
