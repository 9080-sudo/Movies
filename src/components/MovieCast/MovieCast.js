import React, { useEffect, useState } from "react";

import classes from "./MovieCast.module.css";

import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cast from "../Cast/Cast";

const API_KEY = "1b4fe0b78782b44a3c425fc3d5c5a080";
const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

export default function MovieCast() {
  const params = useParams();
  const { movieId } = params;
  console.log(params);
  const [cast, setCast] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    const getCast = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
      console.log(url);
      let cast = await fetch(url);
      cast = await cast.json();
      cast = cast.cast;
      cast = cast.filter((c) => c.profile_path !== null);
      cast = cast.map((c) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profilePath: c.profile_path,
      }));
      console.log(cast);
      setApiStatus(apiStatusConstants.success);
      setCast(cast);
    };
    getCast();
  }, [movieId]);
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
        <ul className={classes['movie-cast']}>
          {cast.map((c) => (
            <Cast cast={c} key={c.id} />
          ))}
        </ul>
      )}
    </>
  );
}
