import React, { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducers/AuthReducer";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [auth, dispatch] = useReducer(authReducer, null, () => {
    const localData = localStorage.getItem("auth");
    if (
      localData === "null" ||
      localData === undefined ||
      localData === null ||
      localData === "undefiend"
    ) {
      return null;
    }
    let parseData = JSON.parse(localData);
    let JwtDate = new Date(parseData.user.exp * 1000).getTime();
    let now = new Date().getTime();
    if (JwtDate > now) {
      setAutoLogout(JwtDate - now);
      return parseData;
    }
    return null;
  });

  function setAutoLogout(miliseconds) {
    setTimeout(function () {
      dispatch({ type: "LogOut" });
    }, miliseconds);
  }

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
