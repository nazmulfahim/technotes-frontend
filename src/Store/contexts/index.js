import React from "react";
import { AuthContextProvider } from "./AuthContext";
import ResponseContextProvider from "./responseContext";

const index = (props) => {
  return (
    <AuthContextProvider>
      <ResponseContextProvider>{props.children}</ResponseContextProvider>
    </AuthContextProvider>
  );
};

export default index;
