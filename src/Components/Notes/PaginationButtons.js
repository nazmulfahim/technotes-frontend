import React from "react";
import Button from "@material-ui/core/Button";

const PaginationButtons = ({ sizeLimit, total, setPage, page }) => {
  const onPrevious = () => {
    if (page < 1) return;
    setPage((v) => v - 1);
  };
  const totalPage = Math.round(total / sizeLimit);
  const onNext = () => {
    if (total < 1) return;
    if (page >= totalPage) return;
    setPage((v) => v + 1);
  };
  return (
    <>
      {page > 1 && <Button onClick={onPrevious}>Previous</Button>}
      {page < totalPage && <Button onClick={onNext}>Next</Button>}
    </>
  );
};

export default PaginationButtons;
