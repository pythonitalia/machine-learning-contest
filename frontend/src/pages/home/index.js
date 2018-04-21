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
          The challenge "AI for Precision Medicine" has been created by{" "}
          <a href="https://www.genomeup.com/">
            <strong>GenomeUp</strong>
          </a>.
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

            <ListItem
              component="a"
              href={`${process.env.PUBLIC_URL}/data/description.txt`}
            >
              <Avatar>
                <FileDownloadIcon />
              </Avatar>

              <ListItemText
                primary="description.txt"
                secondary="Description of all the fields of the csv"
              />
            </ListItem>
          </List>
        </Typography>

        <Typography variant="display1" color="primary" gutterBottom>
          Objective
        </Typography>

        <Typography variant="body1" paragraph>
          The objective of the challenge is to complete the data for the
          "Clinical significance" for the entries missing from the file{" "}
          <strong>variants.csv</strong>.
          <br />
          The “Clinical significance” field conveys the degree of harmfulness of
          the corresponding mutation.
          <br />
          Each row is uniquely identified by one of the following four field
          information: "CHROM", "START", "REF", "ALT".
          <br />
          The values of the Clinical significance can be one of the following:
          <ol start="0">
            <li>Benign</li>
            <li>Likely-Benign</li>
            <li>Benign / Likely-Benign</li>
            <li>Likely-Pathogenic</li>
            <li>Likely-Pathogenic / Pathogenic</li>
            <li>Pathogenic</li>
            <li>Other</li>
          </ol>
          The <strong>only</strong> classes of interest for the challenge are
          the following:{" "}
          <strong>Benign, Likely-Benign, Likely-Pathogenic, Pathogenic</strong>.
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
              A multicore solution will be considered a plus
            </StepLabel>
          </Step>
        </Stepper>

        <Typography variant="headline" color="secondary">
          Phase two
        </Typography>

        <Stepper activeStep={-1} orientation="vertical">
          <Step>
            <StepLabel>
              Create a machine learning algorithm that will be able to find the
              degree of harmfulness of the genetic mutations considering the
              data matched in phase one
            </StepLabel>
          </Step>
        </Stepper>

        <Typography variant="headline" color="secondary">
          Output format
        </Typography>

        <Typography variant="body1" paragraph>
          The solution is expected to be a textual file formatted as follows:
          <pre>CHROM;START;REF;ALT;{"{PREDICTED CLINICAL SIGNIFICANCE}"}</pre>
          where {"{PREDICTED CLINICAL SIGNIFICANCE}"} is one of 0,1,3,5 from the
          list above
          <pre>
            {`chr22;49910903;G;A;5
chr9;37781507;T;C;5
chr7;21590585;C;G;0
chr21;46134692;G;A;1`}
          </pre>
        </Typography>

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
        <Typography variant="body1" paragraph>
          <strong>NOTE:</strong> solutions without code won't qualify for the
          prizes.
        </Typography>
        <Typography variant="headline" color="secondary">
          Scoring
        </Typography>

        <Typography variant="body1" paragraph>
          The winner will be judged based on the accuracy of the machine
          learning model
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
