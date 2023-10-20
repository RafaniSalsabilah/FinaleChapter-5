import React from "react";
import { Link } from "react-router-dom";

const PopularMovies = (props) => {
  return (
    <div className="">
      <Link to={`/${props.dataPopular.id}`}>
        <img
          className="poster-section hover:scale-[105%] shadow-lg shadow-slate-600 rounded-md w-[14.5rem]"
          src={`https://image.tmdb.org/t/p/original/${props.dataPopular.poster_path}`}
          alt="poster_path"
        />
      </Link>
    </div>
  );
};

export default PopularMovies;
