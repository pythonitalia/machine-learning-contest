import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import GradeIcon from "material-ui-icons/Grade";
import { format } from "date-fns";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

import Form from "./form";

const printDate = s => format(Date.parse(s), "D MMM [at] HH[:]mm");

const GET_CHALLENGE = gql`
  query GetChallenge($id: ID!) {
    challenge(id: $id) {
      name
    }
  }
`;

const GET_SUBMISSIONS = gql`
  query {
    mySubmissions {
      created
      score
    }
  }
`;

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  label: {
    width: 100,
    margin: 10,
    display: "inline-block"
  },
  button: {
    margin: theme.spacing.unit
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
      <React.Fragment>
        <Query query={GET_CHALLENGE} variables={this.props.match.params}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error || data.challenge === null) return <div>Error :(</div>;

            const { challenge } = data;

            return (
              <div>
                <Typography variant="display1" gutterBottom>
                  Submit for <strong>{challenge.name}</strong>
                </Typography>

                <Form id={this.props.match.params.id} classes={classes} />
              </div>
            );
          }}
        </Query>

        <Typography
          variant="headline"
          color="secondary"
          gutterBottom
          style={{ marginTop: 20 }}
        >
          Previous submissions
        </Typography>

        <Query query={GET_SUBMISSIONS}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading previous submissions...</div>;
            if (error) return <div>Error while loading your submissions.</div>;

            const { mySubmissions } = data;

            if (mySubmissions.length === 0)
              return <div>No previous submission.</div>;

            return mySubmissions.map(x => (
              <ListItem key={x.name}>
                <ListItemIcon>
                  <GradeIcon />
                </ListItemIcon>
                <ListItemText primary={printDate(x.created)} />
                <ListItemText primary={x.score} />
              </ListItem>
            ));
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Submission);
