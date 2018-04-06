import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  }
});

class Registration extends PureComponent {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography type="display1" style={{ marginBottom: 40 }}>
          Register
        </Typography>

        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            label="Full name"
            value={this.state.fullName}
            onChange={this.handleChange("fullName")}
            margin="normal"
          />

          <TextField
            label="Username"
            value={this.state.username}
            helperText="This will be public"
            onChange={this.handleChange("username")}
            margin="normal"
          />

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

          <Button raised color="primary">
            Register
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(Registration);
