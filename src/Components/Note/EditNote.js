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

const EditNote = ({ note }) => {
  const classes = makeStyles(formCss)();
  const [values, setValues] = React.useState({
    title: note.title,
    details: note.details,
  });
  const { redispatch } = React.useContext(ResponseContext);
  const { auth } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const onChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  const onEditNote = async (e) => {
    e.preventDefault();
    if (isEmpty(values.title) || isEmpty(values.details)) {
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
      route: `/note/${note.id}`,
      method: "PUT",
      body: {
        ...values,
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
    // toggleModal();
    window.location.reload();
    return;
  };
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography component="h2" variant="h5">
          Edit This Note
        </Typography>

        <form className={classes.form} onSubmit={onEditNote}>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              name="title"
              autoComplete="title"
              value={values.title}
              onInput={onChange}
            />
          </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="details">Details</InputLabel>
            <Input
              id="details"
              name="details"
              autoComplete="details"
              value={values.details}
              onInput={onChange}
              multiline={true}
              rows={5}
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
              "Edit Note"
            )}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

const EditNoteModal = ({ note }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen((p) => !p);
  };
  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        <img src={require("../../Assets/edit.png")} alt="edit" />
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
          <EditNote note={note} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditNoteModal;
