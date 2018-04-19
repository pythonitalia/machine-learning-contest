import React, { PureComponent } from "react";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import List, { ListItem, ListItemText } from "material-ui/List";
import FileDownloadIcon from "@material-ui/icons/FileDownload";
import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Stepper, { Step, StepLabel } from "material-ui/Stepper";
import { Link } from "react-router-dom";

const styles = theme => ({});

class Home extends PureComponent {
  render() {
    return (
      <div>
        <Typography variant="display1" color="primary">
          Welcome to the PyCon Italia Machine Learning Challenge
        </Typography>

        <Typography variant="subheading" gutterBottom>
          We have a prepared a little contest for those of you who love
          challenges and machine learning.
        </Typography>

        <Typography variant="body1" paragraph>
          The challenge "AI FOR Precision Medicine" has been created by{" "}
          <strong>GenomeUp</strong>.
        </Typography>

        <Typography variant="body1" paragraph>
          You will have the following files:
          <List dense={true}>
            <ListItem
              component="a"
              href={`${process.env.PUBLIC_URL}/data/variants.csv`}
            >
              <Avatar>
                <FileDownloadIcon />
              </Avatar>

              <ListItemText
                primary="variants.csv"
                secondary="This file is composed by 49264 records and 8 fields"
              />
            </ListItem>

            <ListItem
              component="a"
              href={`${process.env.PUBLIC_URL}/data/variants_year.db`}
            >
              <Avatar>
                <FileDownloadIcon />
              </Avatar>

              <ListItemText
                primary="variants_year.db"
                secondary="A SQLite database with additional information for each record"
              />
            </ListItem>
          </List>
        </Typography>

        <Typography variant="display1" color="primary" gutterBottom>
          Objective
        </Typography>

        <Typography variant="body1" paragraph>
          The objective of the challenge is to compile the 4000 empty fields of
          the "Clinical significance" of the file <strong>variants.csv</strong>.
          <br />
          Each row is identified by one of the following string: "CHROM",
          "START", "REF", "ALT"
          <br />
          The “Clinical significance” field conveys the degree of harmfulness of
          the corresponding mutation.
        </Typography>

        <Typography variant="display1" color="primary" gutterBottom>
          Steps
        </Typography>

        <Typography variant="headline" color="secondary" gutterBottom>
          Phase one
        </Typography>

        <Stepper activeStep={-1} orientation="vertical">
          <Step>
            <StepLabel>Read each row from the variants.csv file</StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Get additional data for each row from the variants_year.db
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              Create a MongoDB database with the associated information
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>Make it work in a multicore environment</StepLabel>
          </Step>
        </Stepper>

        <Typography variant="headline" color="secondary">
          Phase two
        </Typography>

        <Stepper activeStep={-1} orientation="vertical">
          <Step>
            <StepLabel>
              Create a machine learning algorithm that will be able to find the
              degree of harmfulness of the genetic mutations
            </StepLabel>
          </Step>
        </Stepper>

        <Typography variant="headline" color="secondary">
          Solution
        </Typography>

        <Typography variant="body1" paragraph>
          Once you have completed the previous phases you can upload the CSV
          file with the results and the code here:
        </Typography>

        <Button
          variant="raised"
          color="primary"
          type="submit"
          component={Link}
          to="/challenge/1/submit"
          style={{
            marginBottom: 10
          }}
        >
          Upload solutions
        </Button>

        <Typography variant="headline" color="secondary">
          Scoring
        </Typography>

        <Typography variant="body1" paragraph>
          The winner will be judged based on the accuracy of their machine
          learning algorithm
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
