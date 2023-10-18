import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
// import https from "../utils/https";
import https3 from "../utils/https3";

const fetchDetailMovies = async (id) => {
        const { data } = await https3.get(`${API_ENDPOINTS.DETAIL_MOVIE}${id}`);
        return data;
};

const useDataMovieQueryDetail = (id) => {
    return useQuery(["detailMovie", id], () => fetchDetailMovies(id));
};

export { useDataMovieQueryDetail };
