import Jwt_Decode from "jwt-decode";

const authReducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      const user = Jwt_Decode(action.token);
      return { user, token: action.token };
    case "LogOut":
      return null;
    default:
      return state;
  }
};

export default authReducer;
