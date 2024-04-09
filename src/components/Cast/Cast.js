import React from "react";

import classes from './Cast.module.css'

const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

export default function Cast({ cast }) {
  const { name, character, profilePath } = cast;
  return (
    <li className={classes['cast']}>
      <img src={`${BASE_IMAGE_PATH}${profilePath}`} alt={name} className={classes['image']}/>
      <h3 className={classes['name']}>{name}</h3>
      <p className={classes['character']}>Character: {character}</p>
    </li>
  );
}
