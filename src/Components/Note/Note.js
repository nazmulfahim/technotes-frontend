import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MakeStyles from "@material-ui/core/styles/makeStyles";
import noteCss from "../styles/noteCss";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import FetchApi from "../../Utils/fetchApi";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";
import ShareNote from "./ShareNote";
import AuthContext from "../../Store/contexts/AuthContext";

const Transition = React.forwardRef((props, ref) => (
  <Slide ref={ref} direction="up" {...props} />
));

const Note = ({ note }) => {
  const classes = MakeStyles(noteCss)();
  const { auth } = React.useContext(AuthContext);

  const [openModal, setOpenModal] = React.useState(false);
  const [sharedWith, setSharedWith] = React.useState([]);
  const handleClickOpen = () => {
    setOpenModal((p) => !p);
  };
  const fetchNotesSharedWith = async () => {
    const res = await FetchApi({
      route: `/note/user/shared-by-me`,
      method: "GET",
      token: auth.token,
    });
    if (res.error) return;
    setSharedWith(res.models);
    return;
  };
  React.useEffect(() => {
    fetchNotesSharedWith();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Paper className={classes.note}>
        <div onClick={handleClickOpen}>
          <Typography variant="h6">{note.title}</Typography>
          <Typography>{note.details.slice(0, 200) + "…"}</Typography>
        </div>
        <div className={classes.actionBtns}>
          <EditNote note={note} />
          <DeleteNote note={note} />
          <ShareNote note={note} />
        </div>
      </Paper>
      <Dialog
        fullScreen
        open={openModal}
        onClose={handleClickOpen}
        TransitionComponent={Transition}
        aria-labelledby="note-details"
        aria-describedby="note-details-modal"
      >
        <Button
          color="inherit"
          onClick={handleClickOpen}
          aria-label="Close"
          variant="text"
        >
          <CloseIcon />
        </Button>

        <DialogContent>
          <Typography variant="h4" paragraph>
            {note.title}
          </Typography>
          <Typography paragraph>
            CreatedAt: {new Date(note.created).toLocaleString()}
          </Typography>

          {note.last_edit && (
            <Typography variant="body2" paragraph>
              Last Modified: {note.last_edit}
            </Typography>
          )}
          <Typography paragraph>{note.details}</Typography>
          <Typography variant="h6" paragraph>
            Shared With:
          </Typography>
          {sharedWith.map((user) => (
            <Typography key={user.id} gutterBottom>
              {user.user.mail}
            </Typography>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Note;
