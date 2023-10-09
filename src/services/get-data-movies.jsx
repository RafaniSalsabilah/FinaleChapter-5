import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import https from "../utils/https";

const fetchDataMovies = async ({ queryKey }) => {
  // Versi-3
  // const { data } = await https.get(`${API_ENDPOINTS.NOW_PLAYING}?language=en-US&page=${page ? page : 1}`)
  // return data

  // Versi-4
  // console.log(queryKey, "queryKey")
  const [_key, _params] = queryKey;
  const { data } = await https.get(_key, { params: _params });
  return data;
};

// Versi-3
// const useDataMovieQuery = (page) =>{
//     return (
//         useQuery(["user data", page], () => fetchDataMovies(page))
//         )
// };

// Versi-4
const useDataMovieQuery = (options) => {
  return useQuery([API_ENDPOINTS.NOW_PLAYING, options], fetchDataMovies);
};

export { fetchDataMovies, useDataMovieQuery };
