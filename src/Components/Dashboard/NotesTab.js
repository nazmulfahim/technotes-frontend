import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import MyNotes from "../Notes/MyNotes";
import SharedWithMe from "../Notes/SharedWithMe";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      style={{ paddingTop: 30, paddingBottom: 70 }}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const NotesTab = () => {
  const [tab, setTab] = React.useState(0);
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <div>
      <Paper>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="My Notes" />
          <Tab label="Shared With Me" />
        </Tabs>
      </Paper>

      <TabPanel value={tab} index={0}>
        <MyNotes />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <SharedWithMe />
      </TabPanel>
    </div>
  );
};

export default NotesTab;
