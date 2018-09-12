import React from "react";
import moment from 'moment';

const MovieItem = ({ movie }) => {
  return (
    <tr>
      <td>{movie.title}</td>
      <td>{moment(movie.release_date).format('dddd,  MMMM Do YYYY')}</td>
    </tr>
  );
};

export default MovieItem;