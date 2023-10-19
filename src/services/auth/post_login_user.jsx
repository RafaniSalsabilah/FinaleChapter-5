import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import { CookieKeys, CookieStorage } from "../../utils/cookies";
import { toast } from 'react-toastify';
import https3 from "../../utils/https3";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();

  const LoginUser = async (input) => {
    try {
      const result = await https3.post(API_ENDPOINTS.LOGIN_USER, input);
      CookieStorage.set(CookieKeys.AuthToken, result.data.data.token);
      toast.success('Login Success!', {
      position: 'top-center', // You can customize the position
      autoClose: 2000, // Time in milliseconds to close the toast automatically
    });
      navigate('/home');
      return result;
    } catch (err) {
      toast.error(err.response.data.message, {
      position: 'top-center', // You can customize the position
      autoClose: 2000, // Time in milliseconds to close the toast automatically
    });
    }
  };

  return useMutation(LoginUser);
};

export { useLogin };
