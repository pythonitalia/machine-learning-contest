import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import List from "material-ui/List";
import Divider from "material-ui/Divider";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import HomeIcon from "material-ui-icons/Home";
import StarIcon from "material-ui-icons/Star";
import AccountCircleIcon from "material-ui-icons/AccountCircle";
import ExitIcon from "material-ui-icons/ExitToApp";

import { Link } from "react-router-dom";
import { IsAuthenticated } from "../../authentication";

const styles = {
  root: {
    width: "100%"
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  }
};

class Header extends React.Component {
  state = {
    drawerOpen: false
  };

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <Link to="/" className={classes.link}>
                PyData Challenge
              </Link>
            </Typography>

            <IsAuthenticated>
              {authenticated =>
                !authenticated && (
                  <Button component={Link} to="/login" color="inherit">
                    Login
                  </Button>
                )
              }
            </IsAuthenticated>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.drawerOpen} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            <div className={classes.list}>
              <List>
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/leaderboard">
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Leaderboard" />
                </ListItem>

                <IsAuthenticated>
                  {authenticated =>
                    !authenticated && (
                      <ListItem button component={Link} to="/register">
                        <ListItemIcon>
                          <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Register" />
                      </ListItem>
                    )
                  }
                </IsAuthenticated>
              </List>
              <Divider />
              <List>
                <ListItem
                  button
                  component={({ children, ...props }) => (
                    <a {...props}>{children}</a>
                  )}
                  target="_blank"
                  href="https://www.pycon.it"
                >
                  <ListItemIcon>
                    <ExitIcon />
                  </ListItemIcon>
                  <ListItemText primary="PyCon Nove" />
                </ListItem>
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
