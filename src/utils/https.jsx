import axios from "axios";

const https = axios.create({
    baseURL: process.env.REACT_APP_SERVER,
    timeout: 30000,
    headers: {
      accept: "application/json",
      Authorization:
       `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    }
});

export default https