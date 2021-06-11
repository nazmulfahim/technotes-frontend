import React from "react";
import Notes from "./Notes";
import FetchApi from "../../Utils/fetchApi";
import AuthContext from "../../Store/contexts/AuthContext";
import Typography from "@material-ui/core/Typography";
import PaginationButton from "./PaginationButtons";

const sizeLimit = 5;

const MyNotes = () => {
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [notes, setNotes] = React.useState([]);
  const { auth } = React.useContext(AuthContext);

  const fetchMyNotes = async () => {
    const res = await FetchApi({
      route: `/note?page=${page}&size=${sizeLimit}`,
      method: "GET",
      token: auth.token,
    });
    if (!res.error) {
      setNotes(res.notes);

      setTotal(res.count);
    }
  };
  React.useEffect(() => {
    fetchMyNotes();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <Typography component="h3" variant="h4" paragraph align="center">
        My Notes
      </Typography>
      <Notes notes={notes} />
      <PaginationButton
        sizeLimit={sizeLimit}
        setPage={setPage}
        total={total}
        page={page}
      />
    </div>
  );
};

export default MyNotes;
