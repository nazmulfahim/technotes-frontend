const css = (theme) => ({
  bg: {
    width: "100vw",
    height: "100vh",
    paddingTop: 40,
    backgroundColor: "#fff",
    backgroundImage: ` linear-gradient(90deg, transparent 0px, #abced4 0px, #abced4 25px, transparent 25px), linear-gradient(#eee .1em, transparent .1em)`,
    backgroundSize: "100% 1.2em",
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      backgroundImage: ` linear-gradient(90deg, transparent 25px, #abced4 25px, #abced4 50px, transparent 50px), linear-gradient(#eee .1em, transparent .1em)`,
    },
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: "12vh",
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(2),
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});

export default css;
