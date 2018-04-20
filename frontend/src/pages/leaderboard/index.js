import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import GradeIcon from "material-ui-icons/Grade";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const styles = theme => ({});

const LEADERBOARD = gql`
  query {
    leaderboard {
      name
      score
    }
  }
`;

class Leaderboard extends PureComponent {
  render() {
    return (
      <div>
        <Typography variant="display1" style={{ marginBottom: 40 }}>
          Leaderboard
        </Typography>

        <Query query={LEADERBOARD}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;
            if (data.leaderboard.length === 0)
              return <div>No submission yet</div>;

            return data.leaderboard.map(x => (
              <ListItem key={x.name}>
                <ListItemIcon>
                  <GradeIcon />
                </ListItemIcon>
                <ListItemText primary={x.name || "no name"} />
                <ListItemText primary={x.score} />
              </ListItem>
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(Leaderboard);
