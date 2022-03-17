import React from "react";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    profile: {
      name: "",
      email: "",
      website: "",
      password: "",
      role: "",
      image: "",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(JSON.parse(localStorage.getItem("auth")));
    }
  }, []);

  if (process.server) {
    axios.defaults.baseURL = process.env.API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  } else {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  }

  axios.interceptors.response.use(
    function (response) {
      // Do something before request is sent
      return response;
    },
    function (error) {
      // Do something with request error
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setAuth({
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        router.push("/signin");
        console.log("LOGOUT FORCECULLY ======> ");
      }
    }
  );

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
