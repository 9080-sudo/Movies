import React from 'react'
import Movie from '../Movie/Movie'
import classes from './Movies.module.css'

export default function Movies({movies}) {
  return (
    <ul className={classes['movies']}>
      {movies.map((popularMovie) => (
        <Movie key={popularMovie.id} movie={popularMovie} />
      ))}
    </ul>
  )
}
