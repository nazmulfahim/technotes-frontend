import React from "react";
import Note from "../Note/Note";
import makeStyles from "@material-ui/core/styles/makeStyles";

const style = (theme) => ({
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "space-around",
    flexWrap: "wrap",
  },
});

const Notes = ({ notes, sharedNote }) => {
  const classes = makeStyles(style)();
  return (
    <div className={classes.grid}>
      {notes.map((note, i) => (
        <Note
          note={sharedNote ? note.note : note}
          key={note.id || note.note.id}
        />
      ))}
    </div>
  );
};

export default Notes;
