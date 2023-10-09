import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDataMovieQuerySearch } from '../services/search-data-movies';

const SearchMovieList = () => {
  const { title } = useParams();
  const { data: fetchSearch } = useDataMovieQuerySearch({ query: title });
  const [Search, setSearch] = useState([]);
  const [Result, setResult] = useState(true);

  useEffect(() => {
    if (fetchSearch) {
      if (fetchSearch.results.length > 0) {
        setSearch(fetchSearch.results);
        console.log(fetchSearch.results);
      }else{
        setResult(false)
      }
    }
  }, [fetchSearch]);

  return (
    <div className='parents'>
   <div className="pop-text px-6 flex justify-between h-[3rem] my-2">
            <h1 className="font-black font-poppins tracking-wide text-[2rem]">Search Result "{title}"</h1>
            <Link to={'/movie-list'}>
            <div className="flex justify-center items-center h-[100%]">
            <p className="text-red-600 font-normal font-montserrat">See All Movie</p>
            <i className="fas fa-arrow-right text-red-600 ml-1"></i>
            </div>
            </Link>
          </div>
      {Result ? (
        <div className='flex flex-wrap gap-4 px-[1.4rem] my-8'>
        {Search.map((movie) => {
          return (
            <div className=''>
            <Link to={`/${movie.id}`}>
            <img className="poster-section hover:scale-[105%] shadow-lg shadow-slate-600 rounded-md w-[17.5rem] min-h-[28rem]" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster_path" />
            </Link>
            </div>
            )
        })}
      </div>
      ) 
      
      : (
        <div className="flex w-full h-screen justify-center items-center">
        <h1 className="font-black font-montserrat text-[5rem]">
            Movie Not Found
        </h1>
        </div>
      )}
    </div>
  );
};

export default SearchMovieList;
