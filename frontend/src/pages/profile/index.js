import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

import gql from "graphql-tag";
import { Query } from "react-apollo";

const QUERY = gql`
  query {
    me {
      fullName
    }
  }
`;

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
          Profile
        </Typography>

        <Query query={QUERY}>
          {({ data, loading, error }) => {
            if (loading) {
              return <h1>Loading</h1>;
            }

            return (
              <React.Fragment>
                <div>Hello {data.me.fullName || "you"}!</div>
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
