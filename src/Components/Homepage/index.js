import React from "react";
import AuthContext from "../../Store/contexts/AuthContext";
import RegisterOrLogin from "./RegisterOrLogin";
import Dashboard from "../Dashboard/Index";

const Index = () => {
  const { auth } = React.useContext(AuthContext);
  return auth ? <Dashboard /> : <RegisterOrLogin />;
};

export default Index;
