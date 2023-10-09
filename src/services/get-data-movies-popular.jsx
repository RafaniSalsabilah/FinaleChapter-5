import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import https from '../utils/https'

const fetchDataMoviesPopular = async(page) => {
    const { data } = await https.get(`${API_ENDPOINTS.POPULAR}?language=en-US&page=${page ? page : 1}`)
    return data
}

const useDataMovieQueryPopular = (page) =>{
    return (
        useQuery(["user data", page], () => fetchDataMoviesPopular(page))
        )
};

export {fetchDataMoviesPopular, useDataMovieQueryPopular}