import React from "react";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import Grid from "material-ui/Grid";

import { ApolloProvider } from "react-apollo";

import { Switch, Route } from "react-router";

import { BrowserRouter } from "react-router-dom";

import Header from "./components/header";

import HomePage from "./pages/home";
import RegisterPage from "./pages/register";
import SubmissionPage from "./pages/submission";
import LeaderboardPage from "./pages/leaderboard";
import LoginPage from "./pages/login";

import { client } from "./client";
import { PrivateRoute } from "./components/private-route";

const theme = createMuiTheme();

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Header />
        <Grid
          style={{ margin: "40px auto", width: "90%", maxWidth: "1600px" }}
          container
          spacing={0}
        >
          <Grid item xs={12}>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/submission" component={SubmissionPage} />
              <Route exact path="/leaderboard" component={LeaderboardPage} />
              <PrivateRoute
                exact
                path="/profile"
                component={() => <h1>Profile</h1>}
              />
              <Route component={() => <h1>Not Found</h1>} />
            </Switch>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
