import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RenderAllMovies from "../assets/components/AllMoviesComponents/RenderAllMovies";
import SearchIcon from "@rsuite/icons/Search";
import { useDataMovieQueryPopular } from "../services/get-data-movies-popular";
import { useGetDataUser } from "../services/auth/get_me_user";
import { CookieKeys, CookieStorage } from "../utils/cookies";

const AllMoviesList = () => {
  const [Popular, setPopular] = useState([]);
  const [PageNow, setPageNow] = useState(1);
  const [Search, setSearch] = useState([]);
  const navigate = useNavigate();

  const { data: fetchUser } = useGetDataUser({});

  const { data: fetchPopular, isLoading } = useDataMovieQueryPopular({
    page: PageNow,
  });

  const handlePage = () => {
    if (PageNow > 1) {
      setPageNow(PageNow - 1);
    }
  };

  const renderAll = () => {
    return fetchPopular.data.map((movie, i) => {
      return <RenderAllMovies key={i} allMovie={movie} />;
    });
  };

  useEffect(() => {
    if (fetchPopular && fetchUser) 
    setPopular(fetchPopular.data);
  }, [fetchPopular, Popular, fetchUser]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <h1 className="font-black font-montserrat text-[5rem]">
          Sedang Memuat Data
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="parents bg-gradient-to-r from-gray-500 to-gray-700">
        <div className="header-section flex justify-between w-full pt-[.5rem]">
          <div className="brand-text flex justify-center items-center mx-[1rem]">
            <div className="text-red-600 text-[2.5rem] font-bold">
              <a href="/home">Movielist</a>
            </div>
          </div>
          <div className="search-section w-[40%] flex justify-center items-center">
            <div className="relative w-full">
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="border-2 w-full bg-transparent font-bold font-montserrat text-black border-red-600 rounded-full px-4 py-2 outline-red-600 focus:border-red-600 focus:outline-none"
                placeholder="What do you want to watch?"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                <Link to={`/search/${Search}`}>
                  <SearchIcon className="text-[1.5rem] hover:scale-[110%] text-black mx-2" />
                </Link>
              </div>
            </div>
          </div>
          <div className="head-btn z-50 flex gap-4 justify-center items-center mx-[2.5rem]">
            <button
              onClick={() => {
                CookieStorage.remove(CookieKeys.AuthToken);
                navigate("/");
              }}
              className="bg-red-500 text-white font-semibold text-[1rem] border-2 border-red-600 outline-red-600 rounded-full w-[6rem] h-[2.5rem] hover:bg-red-600 border-none"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-red-500 w-[10.5%] rounded-full h-[2.5rem] my-3 shadow-md hover:bg-red-600">
            <div className="flex gap-7 text-white">
              <button onClick={handlePage}>
                <i className="fas fa-arrow-left text-[1.3rem] text-white hover:text-black"></i>
              </button>
              <p className="font-montserrat font-extrabold text-[1.2rem]">
                {PageNow}
              </p>
              <button
                onClick={() => {
                  setPageNow(PageNow + 1);
                }}
              >
                <i className="fas fa-arrow-right text-[1.3rem] text-white hover:text-black"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="show-all-movies flex flex-wrap justify-between items-center gap-5 py-[1rem] px-[1.7rem]">
          {renderAll()}
        </div>

        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center bg-red-500 w-[10.5%] rounded-full h-[2.5rem] mb-4 my-3 hover:bg-red-600">
            <div className="flex gap-7 text-white">
              <button onClick={handlePage}>
                <i className="fas fa-arrow-left text-[1.3rem] text-white hover:text-black"></i>
              </button>
              <p className="font-montserrat font-extrabold text-[1.2rem]">
                {PageNow}
              </p>
              <button
                onClick={() => {
                  setPageNow(PageNow + 1);
                }}
              >
                <i className="fas fa-arrow-right text-[1.3rem] text-white hover:text-black"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMoviesList;
