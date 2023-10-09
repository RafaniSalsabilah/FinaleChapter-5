import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllMoviesList from '../pages/AllMoviesList'
import DetailMovies from '../pages/DetailMovies'
import Home from '../pages/Home'
import SearchMovieList from '../pages/SearchMovieList'

const RouterList = () => {
  return (
   <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:id" element={<DetailMovies/>}/>
            <Route path="/search/:title" element={<SearchMovieList/>}/>
            <Route path='/movie-list' element={<AllMoviesList/>}/>
        </Routes>
   </BrowserRouter>

  )
}

export default RouterList
