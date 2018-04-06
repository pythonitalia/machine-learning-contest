import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const styles = theme => ({});

const GET_HELLO = gql`
  query {
    hello
  }
`;

class Home extends PureComponent {
  render() {
    return (
      <div>
        <Typography variant="display1" style={{ marginBottom: 40 }}>
          Home
        </Typography>

        <Query query={GET_HELLO}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error :(</div>;

            return (
              <Typography style={{ marginBottom: 40 }}>{data.hello}</Typography>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
