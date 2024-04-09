import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { ThreeDots } from "react-loader-spinner";
import classes from './TopRated.module.css'
import TopRatedMovies from "../Movies/Movies";
import Movies from "../Movies/Movies";

const API_KEY = "1b4fe0b78782b44a3c425fc3d5c5a080";
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export default function TopRated({ setSearch}) {
  const [pageOffset, setPageOffset] = useState(1);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      // console.log(pageOffset)
      let tMovies = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageOffset}`
      );
      tMovies = await tMovies.json();
      console.log(tMovies);
      const results = tMovies.results.map((pMovie) => ({
        id: pMovie.id,
        originalTitle: pMovie.original_title,
        posterPath: pMovie.poster_path,
        voteAverage: pMovie.vote_average,
      }));
      setApiStatus(apiStatusConstants.success);
      setTopRatedMovies(results);
    };
    fetchTopRatedMovies();
  }, [pageOffset]);

  useEffect(() => {
    setSearch('')
  },[])

  const handlePageClick = (event) => {
    setPageOffset(event.selected + 1);
  };

  return (
    <>
      {" "}
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
        <div className={classes["top-rated"]}>
          <Movies movies={topRatedMovies} />
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={465}
            pageOffset={pageOffset}
          />
        </div>
      )}
    </>
  );
}
