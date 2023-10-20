import React from "react";
import { Link } from "react-router-dom";

const RenderAllMovies = (props) => {
  return (
    <div className="bg-red-500 hover:scale-[105%] hover:bg-red-600 rounded-md">
      <Link to={`/${props.allMovie.id}`}>
        <img
          className="poster-section min-h-[28rem] w-[17.5rem]"
          src={`https://image.tmdb.org/t/p/original/${props.allMovie.poster_path}`}
          alt="poster_path"
        />
      </Link>
      <div className="movie-title flex justify-center items-center font-extrabold font-poppins h-[4rem] max-w-[17.5rem] text-white text-center text-[15px]">
        <h1 className="mx-2">{props.allMovie.title}</h1>
      </div>
    </div>
  );
};

export default RenderAllMovies;
