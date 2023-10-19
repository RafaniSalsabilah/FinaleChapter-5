import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../../utils/api-endpoints";
import https3 from "../../utils/https3";

const useCreateUser = () => {
  const navigate = useNavigate();

  const RegisterUser = async (input) => {
    try {
      const result = await https3.post(API_ENDPOINTS.REGISTER_USER, input);
      toast.success('Register Success!', {
      position: 'top-center', // You can customize the position
      autoClose: 2000, // Time in milliseconds to close the toast automatically
    });
      navigate('/');
      return result;
    } catch (err) {
      console.log(err.response.data.message, 'err')
      toast.error(err.response.data.message, {
      position: 'top-center', // You can customize the position
      autoClose: 2000, // Time in milliseconds to close the toast automatically
    });
    }
  };

  return useMutation(RegisterUser);
};

export { useCreateUser };

