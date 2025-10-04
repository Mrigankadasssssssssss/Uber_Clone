/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({ email: "", password: "" });
  const {user,setUser} = React.useContext(UserDataContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { email: email, password: password };
    try {
      const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/login", userData);
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
    // Reset form fields
    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-16  mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-xl font-semibold mb-2">What's Your Email?</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee]  border border-gray-300 p-2 rounded-md mb-4 w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="example@gmail.com"
          />
          <h3 className="text-xl font-semibold mb-2">Enter Your Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee]  border border-gray-300 p-2 rounded-md mb-4 w-full text-lg placeholder:text-base"
            required
            type="password"
            placeholder="********"
          />
          <button
            className="bg-black text-white py-2 px-4 rounded-md w-full font-semibold text-xl"
            type="submit"
          >
            Login
          </button>
          <p className="mt-4 text-gray-500 text-center">
            Don't have an account?{" "}
            <Link
              to="/users/register"
              className="text-blue-500 text-lg text-semibold underline"
            >
              Create New Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/drivers/login"
          className="bg-[#02ab5c] text-white py-4 px-4 rounded w-full font-semibold text-xl flex items-center justify-center "
        >
          SignIn As a Driver
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
