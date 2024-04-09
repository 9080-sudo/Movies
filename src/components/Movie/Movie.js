import React from "react";

import classes from "./Movie.module.css";
import { Link } from "react-router-dom";

const BASE_POSTER_PATH = "https://image.tmdb.org/t/p/w500";
export default function Movie({ movie }) {
  const { id, posterPath, originalTitle, voteAverage } = movie;

  return (
    <Link to={`/movie-details/${id}`} className={classes["movie-link"]}>
      <li className={classes["movie"]}>
        <img
          src={`${BASE_POSTER_PATH}${posterPath}`}
          alt={movie.originalTitle}
          className={classes["image"]}
        />
        <h3 className={classes["name"]}>{originalTitle}</h3>
        <p className={classes["rating"]}>{voteAverage}</p>
      </li>
    </Link>
  );
}
