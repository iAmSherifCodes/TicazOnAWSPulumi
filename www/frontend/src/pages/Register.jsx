import React, { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
const Register = () => {
  const location = useLocation();
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {

        setLoading(true);
        const response = await fetch(backendUrl + "/v1/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            password
          })
        });
        const server = await response.json();
        if (server?.status) {
          toast.success(server?.msg || "Register Successfully");
          setTimeout(() => {
            window.location.pathname = "/login";
          }, 1000);
          setLoading(false);
        } else {
          toast.error(server?.msg || "Unable to log register user");
          setLoading(false);
        }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex pt-[105px] pb-[100px] flex-col items-center w-[100%] sm:max-w-96 m-auto  gap-4 text-gray-800"
    >
      <div className="flex flex-col gap-3 w-[100%] py-3 px-5">
        <div className='inline-flex justify-center items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>HELLO Welcome 😊</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
        <div className="flex justify-between cursor-pointer">
        <NavLink
            to="/login"
            className="text-[15px] p-3 text-center  w-full"
            style={{
              border:
                location.pathname === "/login"
                  ? "1px solid black"
                  : "1px solid gray",
                  color:
                location.pathname === "/login"
                  ? "black"
                  : "gray"
                  
            }}
          >
            LOG IN
          </NavLink>
          <NavLink
            to="/register"
            className="text-[15px] p-3 w-full text-center "
            style={{
              border:
                location.pathname === "/register"
                  ? "1px solid black"
                  : "1px solid gray",
            color:
                location.pathname === "/register"
                  ? "black"
                  : "gray"
                  
            }}
          >
            SIGN UP
          </NavLink>
        </div>

        {/* {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            name="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            required
          />
        )} */}
        <div className="flex flex-col pt-5 gap-2">
          {/* <label className="text-gray-400 font-light">Email address</label> */}
          <input
            type="text"
            name="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-300 rounded-md outline-none"
            placeholder="Username"
            required
          />
        </div>
        <div className="flex flex-col pt-5 gap-2">
          {/* <label className="text-gray-400 font-light">Email address</label> */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-300 rounded-md outline-none"
            placeholder="Email address"
            required
          />
        </div>
        <div className="flex flex-col gap-2 pt-4">
          {/* <label className="text-gray-400 font-light">Password</label> */}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-300 rounded-md outline-none"
            placeholder="Password"
            required
          />
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4">  
          {
            loading ? <BeatLoader color="white" />:
         "Sign Up"
          }
        </button>
        <div className="w-full flex justify-center text-sm mt-[-8px] pt-2">
        <p className="cursor-pointer text-blue-950 text-[16px] font-medium">
            Forgot your password?
          </p>
          {/* {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer text-blue-500 font-light"
            >
              Register Account Here!{" "}
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer"
            >
              Login Here{" "}
            </p>
          )} */}
        </div>
   
      </div>
    </form>
  );
};

export default Register;
