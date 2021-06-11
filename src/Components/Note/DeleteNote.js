import React from "react";
import formCss from "../styles/formCss";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import FetchApi from "../../Utils/fetchApi";

import { ResponseContext } from "../../Store/contexts/responseContext";
import AuthContext from "../../Store/contexts/AuthContext";

const Transition = React.forwardRef((props, ref) => (
  <Slide ref={ref} direction="up" {...props} />
));

const DeleteNote = ({ note, Cancel }) => {
  const classes = makeStyles(formCss)();
  const { redispatch } = React.useContext(ResponseContext);
  const { auth } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const onDeleteNote = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await FetchApi({
      route: `/note/${note.id}`,
      method: "DELETE",
      token: auth.token,
    });
    setLoading(false);
    if (res.error) {
      return redispatch({
        type: "setResponse",
        payload: {
          open: true,
          variant: "error",
          msg: res.error,
        },
      });
    }
    window.location.reload();
    return;
  };
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5" color="error">
          Are You Sure You Want to delete this note?
        </Typography>
        <Button
          fullWidth
          className={classes.submit}
          disabled={loading}
          onClick={onDeleteNote}
          color="secondary"
        >
          {loading ? (
            <CircularProgress size={35} color="secondary" />
          ) : (
            "Delete Note"
          )}
        </Button>

        <Button onClick={Cancel} className={classes.submit}>
          Cancel
        </Button>
      </Paper>
    </div>
  );
};

const DeleteNoteModal = ({ note }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen((p) => !p);
  };
  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        <img src={require("../../Assets/delete.png")} alt="Delete" />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClickOpen}
        TransitionComponent={Transition}
        aria-labelledby="create-product-modal"
        aria-describedby="create-product-modal"
      >
        <Button
          edge="start"
          color="inherit"
          onClick={handleClickOpen}
          aria-label="Close"
          variant="text"
        >
          <CloseIcon />
        </Button>

        <DialogContent>
          <DeleteNote note={note} Cencel={handleClickOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default DeleteNoteModal;
