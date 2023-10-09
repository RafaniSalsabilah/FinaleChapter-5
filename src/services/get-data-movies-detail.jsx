import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../utils/api-endpoints";
import https from "../utils/https";

const fetchDetailMovies = async (id) => {
        const { data } = await https.get(`${API_ENDPOINTS.DETAIL_MOVIE}${id}`);
        return data;
};

const useDataMovieQueryDetail = (id) => {
    return useQuery(["detailMovie", id], () => fetchDetailMovies(id));
};

export { useDataMovieQueryDetail };
