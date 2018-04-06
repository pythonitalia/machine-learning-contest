import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from "material-ui/List";
import GradeIcon from "material-ui-icons/Grade";

const styles = theme => ({});

const winners = ["Valerio Maggio", "Ernesto Arbitrio"];

class Leaderboard extends PureComponent {
  render() {

    return (
      <div>
        <Typography variant="display1" style={{ marginBottom: 40 }}>
          Leaderboard
        </Typography>

        {winners.map(x => (
          <ListItem key={x}>
            <ListItemIcon>
              <GradeIcon />
            </ListItemIcon>
            <ListItemText primary={x} />
          </ListItem>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Leaderboard);
