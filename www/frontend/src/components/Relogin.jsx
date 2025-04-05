import React, { useState } from "react";
import styled from "styled-components";
import LabelinputLayout from "../layout/LabelinputLayout";
import PasswordLayout from "../layout/PasswordLayout";
import ButtonLayout from "../layout/ButtonLayout";
import toast from "react-hot-toast";
import PuffLoader from "react-spinners/PuffLoader";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from "react-router-dom";

function Relogin({ closeRelogin }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleLogin = async () => {
    setLoading(true);
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password
      })
    });
    const server = await response.json();
    if (server?.status) {
      toast.success(`Welcome Back ${server?.username}`);
      localStorage.setItem("token", server?.token);
      setTimeout(() => {
        closeRelogin(false);
      }, 1000);
      setLoading(false);
    } else {
      toast.error(server?.msg || "Unable to log user in");
      setLoading(false);
    }
  };
  return (
    <HeaderContainer>
      <div className="contain">
        <div className="content" data-aos="zoom-in">
          <div className="flex items-center justify-between">
            <p className="text-center text-[25px]"></p>
            <p className="text-center text-[25px]">Login</p>
            <RxCross1 size={35} className="pr-3" onClick={()=>{
                closeRelogin(false)
            }}/>
          </div>
          <div className="flex flex-col gap-3 pb-4">
            <LabelinputLayout
              label="Email"
              fontSize="18px"
              onChange={(e) => {
                setEmail(e?.target?.value);
              }}
              placeholder="Enter your email address"
            />
            <PasswordLayout
              label="Password"
              type="password"
              fontSize="18px"
              onChange={(e) => {
                setPassword(e?.target?.value);
              }}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between pb-3">
            <span>Don't have an account?</span>

            <NavLink to="/register" className="text-blue-400 text-[17px] cursor-pointer font-light">Register here</NavLink>
          </div>
          <ButtonLayout title="Login" onClick={handleLogin} loading={loading} />
        </div>
      </div>
    </HeaderContainer>
  );
}

export default Relogin;
const HeaderContainer = styled.div`
  .contain {
    background-color: #0000009a;
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }
  .content {
    background-color: white;
    /* height: 50vh; */
    width: 45vw;
    border-radius: 20px;
    padding: 40px;
  }
`;
