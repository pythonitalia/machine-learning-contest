import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_CHALLENGE = gql`
  query GetChallenge($id: ID!) {
    challenge(id: $id) {
      name
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Submission extends PureComponent {
  state = {};

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Query query={GET_CHALLENGE} variables={this.props.match.params}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error || data.challenge === null) return <div>Error :(</div>;

          const { challenge } = data;

          return (
            <div>
              <Typography variant="display1" style={{ marginBottom: 40 }}>
                Submit for <strong>{challenge.name}</strong>
              </Typography>

              <form className={classes.container} noValidate autoComplete="off">
                <input
                  accept="image/*"
                  className={classes.input}
                  id="raised-button-file"
                  multiple
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
                  className={classes.button}
                >
                  Send
                </Button>
              </form>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Submission);
