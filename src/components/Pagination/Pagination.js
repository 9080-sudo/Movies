import React from "react";
import ReactPaginate from "react-paginate";
import classes from "./Pagination.module.css";

export default function Pagination({ handlePageClick, pageCount, pageOffset }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName={classes["pagination"]}
      previousLinkClassName={classes["page-num"]}
      pageLinkClassName={classes["page-num"]}
      nextLinkClassName={classes["page-num"]}
      activeLinkClassName={classes["active"]}
      initialPage={pageOffset -1}
    />
  );
}
