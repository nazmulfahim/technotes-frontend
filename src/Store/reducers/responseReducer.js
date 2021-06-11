const authReducer = (state, action) => {
  switch (action.type) {
    case "setResponse":
      return { ...action.payload };
    case "clearResponse":
      return null;
    default:
      return state;
  }
};

export default authReducer;
