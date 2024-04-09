import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { ThreeDots } from "react-loader-spinner";
import classes from "./Upcoming.module.css";
import Movies from "../Movies/Movies";

const API_KEY = "1b4fe0b78782b44a3c425fc3d5c5a080";
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};
export default function Upcoming({setSearch}) {
  const [pageOffset, setPageOffset] = useState(1);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      // console.log(pageOffset)
      let uMovies = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageOffset}`
      );
      uMovies = await uMovies.json();
      console.log(uMovies);
      const results = uMovies.results.map((pMovie) => ({
        id: pMovie.id,
        originalTitle: pMovie.original_title,
        posterPath: pMovie.poster_path,
        voteAverage: pMovie.vote_average,
      }));
      setApiStatus(apiStatusConstants.success);
      setTopRatedMovies(results);
    };
    fetchUpcomingMovies();
  }, [pageOffset]);

  const handlePageClick = (event) => {
    setPageOffset(event.selected + 1);
  };

  useEffect(() => {
    setSearch('')
  },[setSearch])

  return (
    <>
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
        <div className={classes["upcoming"]}>
          <Movies movies={topRatedMovies} />
          <Pagination
            handlePageClick={handlePageClick}
            pageCount={62}
            pageOffset={pageOffset}
          />
        </div>
      )}
    </>
  );
}
