import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import Form from "./form";

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

              <Form id={this.props.match.params.id} classes={classes} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(Submission);
