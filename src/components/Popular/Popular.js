import React, { useEffect, useRef, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { ThreeDots } from "react-loader-spinner";
import classes from "./Popular.module.css";
import Movies from "../Movies/Movies";

const API_KEY = "1b4fe0b78782b44a3c425fc3d5c5a080";
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};
export default function Popular({setSearch}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [pageOffset, setPageOffset] = useState(1);
  const [popularMovies, setPopularMovies] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  // const pageCount = useRef(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  useEffect(() => {
    const fetchPopularMovies = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      // console.log(pageOffset)
      let pMovies = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageOffset}`
      );
      pMovies = await pMovies.json();
      console.log(pMovies);
      const results = pMovies.results.map((pMovie) => ({
        id: pMovie.id,
        originalTitle: pMovie.original_title,
        posterPath: pMovie.poster_path,
        voteAverage: pMovie.vote_average,
      }));
      setApiStatus(apiStatusConstants.success);
      setPopularMovies(results);
      // pageCount.current = pMovies.total_pages;
    };
    fetchPopularMovies();
  }, [pageOffset]);

  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = items.slice(itemOffset, endOffset);
  // const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    console.log(typeof event.selected, event.selected);
    // const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // setItemOffset(newOffset);
    setPageOffset(event.selected + 1);
  };

  useEffect(() => {
    setSearch('')
  },[])

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={classes["pagination"]}
        previousLinkClassName={classes["page-num"]}
        pageLinkClassName={classes["page-num"]}
        nextLinkClassName={classes["page-num"]}
        activeLinkClassName={classes["active"]}
      /> */}
      {apiStatus === apiStatusConstants.inProgress && (
        <div className={classes["loader"]}>
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {apiStatus === apiStatusConstants.success && (
        <div className={classes['popular']}>
          <Movies movies={popularMovies} />
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={500}
            pageOffset={pageOffset}
          />
        </div>
      )}
    </>
  );
}
