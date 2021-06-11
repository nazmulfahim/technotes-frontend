import React from "react";
import Notes from "./Notes";
import FetchApi from "../../Utils/fetchApi";
import AuthContext from "../../Store/contexts/AuthContext";
import Typography from "@material-ui/core/Typography";
import PaginationButtons from "./PaginationButtons";

const sizeLimit = 5;

const MyNotes = () => {
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  const [notes, setNotes] = React.useState([]);
  const { auth } = React.useContext(AuthContext);

  const fetchSharedNotes = async () => {
    const res = await FetchApi({
      route: `/note/share?page=${page}&size=${sizeLimit}`,
      method: "GET",
      token: auth.token,
    });
    if (!res.error) {
      setNotes(res.models);
      setTotal(res.count);
    }
  };
  React.useEffect(() => {
    fetchSharedNotes();
    // eslint-disable-next-line
  }, [page]);
  return (
    <div>
      <Typography component="h3" variant="h4" paragraph align="center">
        Shared With Me
      </Typography>
      <Notes notes={notes} sharedNote={true} />
      <PaginationButtons
        sizeLimit={sizeLimit}
        setPage={setPage}
        total={total}
        page={page}
      />
    </div>
  );
};

export default MyNotes;
