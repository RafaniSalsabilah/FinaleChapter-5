import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RenderAllMovies from "../assets/components/AllMoviesComponents/RenderAllMovies";
import { useDataMovieQuery } from "../services/get-data-movies";
import { useDataMovieQuerySearch } from "../services/search-data-movies";
import SearchIcon from "@rsuite/icons/Search";


const AllMoviesList = () => {
  const [AllMovieList, setAllMovieList] = useState([]);
  const [PageNow, setPageNow] = useState(1);
  const [Search, setSearch] = useState([]);
    const navigate = useNavigate()

  const { data: fetchAllMovies } = useDataMovieQuery({
    page: PageNow,
  });

  const { data : fetchSearch} =  useDataMovieQuerySearch({
    query : Search
  })

  const handlePage = () => {
    if (PageNow > 1) {
      setPageNow(PageNow - 1);
    }
  };

    const renderAll = () => {
    return AllMovieList.map((movie, i) => {
      return <RenderAllMovies key={i} allMovie={movie} />;
    });
  };

  useEffect(() => {
    if (fetchAllMovies && fetchSearch) {
      setAllMovieList(fetchAllMovies.results);
    }
  }, [fetchAllMovies, fetchSearch]);

  return (
    <>
    <div className="parents">
         <div className="header-section flex justify-between w-full">
          <div className="brand-text flex justify-center items-center">
          <Link to={'/'}>
            <h1 className="font-black outline-red-600 tracking-wider font-poppins text-[2.5rem] text-red-600 ml-2 ">
              MovieList
            </h1>
          </Link>
          </div>
          <div className="search-section w-[40%] flex justify-center items-center">
            <div className="relative w-full">
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="border-2 w-full bg-transparent font-bold font-montserrat text-black border-red-600 rounded-full px-4 py-2 outline-red-600 focus:border-red-600 focus:outline-none"
                placeholder="what do you want to watch?"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
              <Link to={`/search/${Search}`}>
                <SearchIcon className="text-[1.5rem] hover:scale-[110%] text-black mx-2" />
              </Link>
              </div>
            </div>
          </div>
          <div className="head-btn flex gap-4 justify-center items-center mr-2">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="bg-transparent py-0.5 px-1 font-normal text-[1rem] border-2 text-red-600 border-red-600 outline-red-600 rounded-full w-[6rem] h-[2.5rem]"
            >
              Login
            </button>
            <button className="bg-red-600 text-white py-0.5 px-1 font-normal text-[1rem] border-2 border-red-600 outline-red-600 rounded-full w-[6rem] h-[2.5rem]">
              Register
            </button>
          </div>
        </div>

     <div className="flex justify-center items-center">
     <div className="flex justify-center items-center bg-slate-600 w-[10%] rounded-full h-[3rem] my-2 shadow-md shadow-slate-600">
        <div className="flex gap-10">
          <button onClick={handlePage}>
            <i className="fas fa-arrow-left text-[1.5rem] text-white hover:text-green-600"></i>
          </button>
          <p className="font-montserrat font-extrabold text-[1.2rem]">
            {PageNow}
          </p>
          <button
            onClick={() => {
              setPageNow(PageNow + 1);
            }}
          >
            <i className="fas fa-arrow-right text-[1.5rem] text-white hover:text-green-600"></i>
          </button>
        </div>
      </div>
      </div>
     
     <div className="show-all-movies flex flex-wrap gap-4 py-[1rem] px-[1.7rem]">
        {renderAll()}
     </div>
    
    <div className="flex justify-center items-center">
     <div className="flex justify-center items-center bg-slate-600 shadow-md shadow-slate-600 w-[10%] rounded-full h-[3rem] mb-4">
        <div className="flex gap-10">
          <button onClick={handlePage}>
            <i className="fas fa-arrow-left text-[1.5rem] text-white hover:text-green-600"></i>
          </button>
          <p className="font-montserrat font-extrabold text-[1.2rem]">
            {PageNow}
          </p>
          <button
            onClick={() => {
              setPageNow(PageNow + 1);
            }}
          >
            <i className="fas fa-arrow-right text-[1.5rem] text-white hover:text-green-600"></i>
          </button>
        </div>
      </div>
      </div>
     </div>
    </>
  );
};

export default AllMoviesList;
