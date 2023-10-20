import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import https3 from "../../utils/https3";

const fetchUserData = async ({ queryKey }) => {
  const [_key] = queryKey;
  const { data } = await https3
    .get(_key)
    .then((result) => {
      let dataResult = {
        name: result.data.data.name,
        email: result.data.data.email,
      };

      return { data: dataResult };
    })
    .catch((err) => {
      if (err.response.status === 401) {
        window.location.href = "/";
        alert('You are not logged in');
      }
    });
  return data;
};

const useGetDataUser = (options) => {
  return useQuery([API_ENDPOINTS.GET_USER, options], fetchUserData);
};

export { fetchUserData, useGetDataUser };
