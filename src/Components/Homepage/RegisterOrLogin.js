import React, { useContext, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ResponseContext } from "../../Store/contexts/responseContext";
import FetchApi from "../../Utils/fetchApi";
import isValidEmail from "../../Utils/isValidEmail";
import MakeStyles from "@material-ui/core/styles/makeStyles";
import FormCss from "../styles/formCss";
import AuthContext from "../../Store/contexts/AuthContext";

const RegisterOrLogin = () => {
  const classes = MakeStyles(FormCss)();
  const { redispatch } = useContext(ResponseContext);
  const { dispatch } = React.useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegisterOrLogin = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      return redispatch({
        type: "setResponse",
        payload: {
          open: true,
          variant: "error",
          msg: "Invalid Email Address",
        },
      });
    }
    setLoading(true);
    const res = await FetchApi({
      route: "/auth",
      method: "POST",
      body: {
        mail: email,
      },
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
    dispatch({ type: "setUser", token: res.jwt });
  };

  return (
    <div className={classes.bg}>
      <Typography component="h1" variant="h3" align="center" paragraph>
        Welcome to TechNotes
      </Typography>
      <Typography component="h2" variant="h5" align="center" paragraph>
        Take notes and share with your friends
      </Typography>
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h5">
            Register or Login
          </Typography>

          <form className={classes.form} onSubmit={onRegisterOrLogin}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
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
                "Register / Login"
              )}
            </Button>
          </form>
        </Paper>
      </main>
    </div>
  );
};

export default RegisterOrLogin;
