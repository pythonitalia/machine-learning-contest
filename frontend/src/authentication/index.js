import React from "react";
import localforage from "localforage";

const KEY = "IS_AUTHENTICATED";

export const isAuthenticated = () => localforage.getItem(KEY);
export const setIsAuthenticated = value => localforage.setItem(KEY, value);

export class IsAuthenticated extends React.Component {
  state = {
    loading: true,
    isAuthenticated: null
  };

  componentDidMount() {
    isAuthenticated().then(is =>
      this.setState({ loading: false, isAuthenticated: is })
    );
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return this.props.children(this.state.isAuthenticated);
  }
}
