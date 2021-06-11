import React from "react";
import CreateNote from "../Note/CreateNote";
import DashboardCss from "../styles/dashboardCss";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import NotesTab from "./NotesTab";

const Dashboard = () => {
  const classes = makeStyles(DashboardCss)();

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h3" color="primary" paragraph>
        TechNotes
      </Typography>
      <CreateNote />
      <NotesTab />
    </div>
  );
};

export default Dashboard;
