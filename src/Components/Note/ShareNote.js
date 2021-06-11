import React from "react";
import formCss from "../styles/formCss";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import FetchApi from "../../Utils/fetchApi";

import { ResponseContext } from "../../Store/contexts/responseContext";
import AuthContext from "../../Store/contexts/AuthContext";

import isEmpty from "../../Utils/is-empty";

const Transition = React.forwardRef((props, ref) => (
  <Slide ref={ref} direction="up" {...props} />
));

const ShareNote = ({ note }) => {
  const classes = makeStyles(formCss)();
  const [shared_to, setShared_to] = React.useState("");
  const { redispatch } = React.useContext(ResponseContext);
  const { auth } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const onShareNote = async (e) => {
    e.preventDefault();
    if (isEmpty(shared_to)) {
      return redispatch({
        type: "setResponse",
        payload: {
          open: true,
          variant: "error",
          msg: "All Fields are Required",
        },
      });
    }
    setLoading(true);
    const res = await FetchApi({
      route: "/note/share",
      method: "POST",
      body: {
        shared_to,
        note_id: note.id,
      },
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
    redispatch({
      type: "setResponse",
      payload: {
        open: true,
        variant: "success",
        msg: "Note Shared Successfully",
      },
    });
    setShared_to("");
    return;
  };
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5">
          Share This Note
        </Typography>

        <form className={classes.form} onSubmit={onShareNote}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="share_to">Share With</InputLabel>
            <Input
              id="share_to"
              name="share_to"
              autoComplete="share_to"
              value={shared_to}
              onInput={(e) => setShared_to(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            className={classes.submit}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={35} color="secondary" />
            ) : (
              "Share"
            )}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

const ShareNoteModal = ({ note }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen((p) => !p);
  };
  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        {" "}
        <img src={require("../../Assets/share.png")} alt="Share" />
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
          <ShareNote note={note} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ShareNoteModal;
