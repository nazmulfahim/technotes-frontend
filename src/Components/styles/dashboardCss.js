const css = (theme) => ({
  root: {
    padding: "20px 10px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    backgroundImage: ` linear-gradient(#eee .1em, transparent .1em)`,
    backgroundSize: "100% 1.2em",
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      backgroundImage: ` linear-gradient(#eee .1em, transparent .1em)`,
    },
  },
});

export default css;
