// import { useQuery } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINTS } from "../utils/api-endpoints"
import https3 from "../utils/https3"


const fetchSearchMovie = async ({queryKey}) =>{
    const [_key, _params] = queryKey
    const { data } = await https3.get(_key, {params : _params})
    return data
}

const useDataMovieQuerySearch = (options) =>{
    return useQuery([API_ENDPOINTS.SEARCH_MOVIE, options], fetchSearchMovie)
};

export { fetchSearchMovie, useDataMovieQuerySearch }