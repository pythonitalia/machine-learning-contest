import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import LoginForm from "./form";

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
        <Typography variant="display1" style={{ marginBottom: 40 }}>
          Login
        </Typography>

        <LoginForm />
      </div>
    );
  }
}

export default withStyles(styles)(Login);
