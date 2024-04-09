import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import classes from "./MovieDetails.module.css";
import { ThreeDots } from "react-loader-spinner";
import MovieCast from "../MovieCast/MovieCast";

const API_KEY = "1b4fe0b78782b44a3c425fc3d5c5a080";
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};
const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

const getGenres = (genres) => {
  let genre = genres.reduce((a, b) => {
    return a + b.name + ",";
  }, "");
  return genre.substring(0, genre.length - 1);
};

export default function MovieDetails() {
  const params = useParams();
  const { movieId } = params;
  // console.log(params)
  const [movieDetails, setMovieDetails] = useState({});
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  useEffect(() => {
    const getMovieDetails = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
      let mDetails = await fetch(url);
      mDetails = await mDetails.json();
      mDetails = {
        originalTitle: mDetails.original_title,
        voteAverage: mDetails.vote_average,
        runtime: mDetails.runtime,
        genre: getGenres(mDetails.genres),
        releaseDate: new Date(mDetails.release_date),
        overview: mDetails.overview,
        backdropPath: mDetails.backdrop_path,
        posterPath: mDetails.poster_path,
      };
      //   console.log(mDetails.releaseDate)
      console.log(mDetails);
      setApiStatus(apiStatusConstants.success);
      setMovieDetails(mDetails);
    };
    getMovieDetails();
  }, [movieId]);


  const {
    originalTitle,
    voteAverage,
    runtime,
    genre,
    releaseDate,
    overview,
    backdropPath,
    posterPath,
  } = movieDetails;
  return (
    <>
      {apiStatus === apiStatus.inProgress && (
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
        <div className={classes["movie-details"]}>
          <div className={classes['poster-backdrop-container']}>
            <div className={classes['m-s-details']}>
              <div className={classes["movie-sub-details"]}>
                <img
                  src={`${BASE_IMAGE_PATH}${posterPath}`}
                  alt={originalTitle}
                  className={classes["poster-image"]}
                />
                <div className={classes["movie-sub-details-2"]}>
                  <h3 className={classes["title"]}>{originalTitle}</h3>
                  <p className={classes["rating"]}>Rating: {voteAverage}</p>
                  <div className={classes["genre-runtime-container"]}>
                    <p className={classes["runtime"]}>{runtime} min</p>
                    <p className={classes["genre"]}>{genre}</p>
                  </div>
                  <p className={classes["release-date"]}>
                    Release Date: {releaseDate.toString().substr(0, 15)}
                  </p>
                </div>
              </div>
              <div className={classes['overview-container']}>
                <h4 className={classes["overview-heading"]}>Overview</h4>
                <p className={classes["overview"]}>{overview}</p>
              </div>
            </div>
            <img
              src={`${BASE_IMAGE_PATH}${backdropPath}`}
              alt={originalTitle}
              className={classes['backdrop-image']}
            />
          </div>
          <MovieCast />
        </div>
      )}
    </>
  );
}
