import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarWrapper from "./snackBar";
import { ResponseContext } from "../../Store/contexts/responseContext";

const Response = () => {
  const { response, redispatch } = useContext(ResponseContext);
  return (
    <React.Fragment>
      {response && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={response.open}
          autoHideDuration={3000}
          onClose={() => redispatch({ type: "clearResponse" })}
        >
          <SnackbarWrapper
            onClose={() => redispatch({ type: "clearResponse" })}
            variant={response.variant}
            message={response.msg}
          />
        </Snackbar>
      )}
    </React.Fragment>
  );
};

export default Response;
