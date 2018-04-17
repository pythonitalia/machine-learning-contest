import React from "react";

import { Route, Redirect } from "react-router";
import { isAuthenticated } from "../../authentication";

export class PrivateRoute extends React.Component {
  state = {
    isAuthenticated: null
  };

  componentDidMount() {
    isAuthenticated().then(authenticated =>
      this.setState({
        isAuthenticated: authenticated
      })
    );
  }

  render() {
    const { component: Component, ...rest } = this.props;

    if (this.state.isAuthenticated === null) {
      return null;
    }

    return (
      <Route
        {...rest}
        render={props =>
          this.state.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}
