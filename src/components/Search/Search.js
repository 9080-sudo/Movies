import React, { useEffect, useRef, useState } from "react";
import Movies from "../Movies/Movies";
import Pagination from "../Pagination/Pagination";
import { ThreeDots } from "react-loader-spinner";
import classes from "./Search.module.css";

const API_KEY = "1b4fe0b78782b44a3c425fc3d5c5a080";
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};
export default function Search({ search }) {
  const [searchResults, setSearchResults] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [pageOffset, setPageOffset] = useState(1);
  const prevSearch = useRef(search)
  const pageCount = useRef(0);
  useEffect(() => {
    const fetchSearchMovies = async () => {
      setApiStatus(apiStatusConstants.inProgress);
    //   console.log(prevSearch.current, search)
    let pSet = pageOffset
    if(prevSearch.current !== search){
        pSet = 1 
    }
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${pSet}`;
      let sResults = await fetch(url);
      sResults = await sResults.json();
      pageCount.current = sResults.total_pages;
      console.log(sResults)
      const results = sResults.results.map((sMovie) => ({
        id: sMovie.id,
        originalTitle: sMovie.original_title,
        posterPath: sMovie.poster_path,
        voteAverage: sMovie.vote_average,
      }));
      setApiStatus(apiStatusConstants.success);
      setSearchResults(results);
      if(prevSearch.current !== search){
        prevSearch.current = search 
        setPageOffset(1)
    }
    };
    fetchSearchMovies();
  }, [search, pageOffset]);

  const handlePageClick = (event) => {
    setPageOffset(event.selected + 1);
  };


  return (
    <>
      {search === "" && (
        <p>Please type something in search and click on search btn</p>
      )}
      {search !== "" && apiStatus === apiStatusConstants.inProgress && (
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
      {search !== "" &&
        apiStatus === apiStatusConstants.success &&
        searchResults.length === 0 && (
          <p>There are no matching results with the search</p>
        )}
      {search !== "" &&
        apiStatus === apiStatusConstants.success &&
        searchResults.length > 0 && (
          <div className={classes['search-container']}>
            <Movies movies={searchResults} />
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount.current}
              pageOffset={pageOffset}
            />
          </div>
        )}
    </>
  );
}
