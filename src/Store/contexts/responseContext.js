import React, { createContext, useReducer } from "react";
import responseReducer from "../reducers/responseReducer";

export const ResponseContext = createContext();

const ResponseContextProvider = (props) => {
  const [response, dispatch] = useReducer(responseReducer, null);

  return (
    <ResponseContext.Provider
      value={{
        response,
        redispatch: dispatch,
      }}
    >
      {props.children}
    </ResponseContext.Provider>
  );
};

export default ResponseContextProvider;
