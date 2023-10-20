import React, { useEffect, useState } from "react";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";
import SearchIcon from "@rsuite/icons/Search";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import PopularMovies from "../assets/components/PopularComponents/PopularMovies";
import { useDataMovieQueryPopular } from "../services/get-data-movies-popular";
import { Link, useNavigate } from "react-router-dom";
import { CookieKeys, CookieStorage } from "../utils/cookies";
import { useGetDataUser } from "../services/auth/get_me_user";

const HomePage = () => {
  const navigate = useNavigate();
  const [Search, setSearch] = useState("");
  const [Popular, setPopular] = useState([]);
  const [User, setUser] = useState([]);

  const { data: fetchUser } = useGetDataUser({});
  const { data: fetchPopular, isLoading } = useDataMovieQueryPopular({});
  const renderPopularMovieList = () => {
    return Popular.slice(0, 5).map((movie, i) => {
      return <PopularMovies key={i} dataPopular={movie} />;
    });
  };

  useEffect(() => {
    if (fetchPopular && fetchUser) {
      setPopular(fetchPopular.data);
      setUser(fetchUser);
    }
  }, [fetchPopular, fetchUser, User]);

  SwiperCore.use([Pagination, Autoplay]);
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
      <div className="parents">
        <div className="header-section absolute flex justify-between z-50 w-full">
          <div className="brand-text flex justify-center items-center mx-6">
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
                className="border-2 w-full bg-transparent font-bold font-montserrat text-white border-red-600 rounded-full px-4 py-2 outline-red-600 focus:border-red-600 focus:outline-none"
                placeholder="what do you want to watch?"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                <Link to={`/search/${Search}`}>
                  <SearchIcon className="text-[1.5rem] hover:scale-[110%] text-slate-300 mx-2" />
                </Link>
              </div>
            </div>
          </div>
          <div className="head-btn flex gap-4 justify-center items-center mx-6">
            <button
              onClick={() => {
                CookieStorage.remove(CookieKeys.AuthToken);
                navigate("/");
              }}
              className="bg-red-600 text-white py-0.5 px-1 font-normal text-[1rem] border-2 border-red-600 outline-red-600 rounded-full w-[6rem] h-[2.5rem]"
            >
              Logout
            </button>
          </div>
        </div>
        {/* Description */}
        <Swiper
          modules={[Autoplay]}
          loop={true}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 2000 }}
          pagination={{ clickable: true }}
        >
          {Popular.slice(0, 3).map((movie, i) => {
            const backgroundStyle = {
              backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
            };
            return (
              <SwiperSlide key={i}>
                <div
                  className={
                    "w-full relative bg-center bg-cover bg-no-repeat min-h-screen"
                  }
                  style={backgroundStyle}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-opacity-60 bg-black -z-50"></div>
                  <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="flex flex-col justify-center absolute inset-0 w-1/2 gap-4 mx-[1.5rem]">
                    <h1 className="text-white font-bold text-[4rem]">
                      {movie.title}
                    </h1>
                    <p className="text-white">{movie.overview}</p>
                    <button className="bg-red-600 text-white font-semibold rounded-full px-[1rem] py-[.5rem] w-fit flex">
                      <PlayOutlineIcon className="mt-[.3rem] mr-[.5rem]" />{" "}
                      Watch Trailer
                    </button>
                  </div>
                  {/* <div
                    key={i}
                    className={`desc-section flex flex-col gap-4 w-[50%] text-white mx-4`}
                  >
                    <div className="Movie-title">
                      <h1 className="font-extrabold  font-montserrat text-[4rem] leading-[4.5rem]">
                        {movie.title}
                      </h1>
                    </div>
                    <div className="Movie-overview">
                      <p className="text-[0.8rem] text-justify font-normal font-montserrat">
                        {movie.overview}
                      </p>
                    </div>
                    <div className="desc-btn">
                      <button className="bg-red-600 rounded-full px-3 font-montserrat font-bold py-1 h-[2.5rem] text-[0.8rem] w-[10rem]">
                        <PlayOutlineIcon className="text-[1rem] mx-[0.3rem] mb-[0.2rem]" />
                        WATCH TRAILER
                      </button>
                    </div>
                  </div> */}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="pop-movie-list mx-0 py-2">
          <div className="pop-text px-6 flex justify-between h-[3rem]">
            <h1 className="font-black font-poppins tracking-wide text-[2rem]">
              Popular Movie
            </h1>
            <Link to={"/movie-list"}>
              <div className="flex justify-center items-center h-[100%]">
                <p className="text-red-600 font-normal font-montserrat">
                  See All Movie
                </p>
                <i className="fas fa-arrow-right text-red-600 ml-1"></i>
              </div>
            </Link>
          </div>
          <div className="flex flex-wrap justify-between items-center px-[1.7rem] gap-4 py-[2rem]">
            {renderPopularMovieList()}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
