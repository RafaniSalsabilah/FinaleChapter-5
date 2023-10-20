import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { CookieKeys, CookieStorage } from "../../../utils/cookies";
import GoogleLogo from "../../img/google-logo.png";

function GoogleLogin({ buttonText }) {
  const [LoggedIn, setLoggedIn] = useState(false);
  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_SERVER}/api/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      CookieStorage.set(CookieKeys.AuthToken, token);
      toast.success("Login Success!! Click to go to HomePage", {
        position: "top-center",
        autoClose: 2000,
        onClick: () => setLoggedIn(true),
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message , {
        position: "top-center",
        });
        return;
      }
      toast.error(error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  return (
    <div>
      {LoggedIn ? (
            window.location.href = "/home"
      ) : (
        <div className="flex flex-row">
          <button onClick={() => loginWithGoogle()} className="bg-white hover:bg-rose-400 rounded-md w-[13rem] h-[2.5rem] font-bold font-poppins tracking-wider focus:outline-none flex justify-center items-center">
            {buttonText} <img src={GoogleLogo} alt="Google Logo" style={{ width: "24px", height: "24px", marginLeft: "10px" }}/>
        </button>
        </div>
        
      )}
    </div>
  );
}

export default GoogleLogin;
