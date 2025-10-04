/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DriverDataContext } from "../context/DriverContext";
import axios from "axios";
const DriverLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [driverData, setDriverData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { driver, setDriver } = React.useContext(DriverDataContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const driverData = { email: email, password: password };
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "/drivers/login",
      driverData
    );
    if (response.status === 200) {
      const resData = response.data;
      // Store token and driver info
      const token =
        resData.token ||
        resData.driver?.token ||
        response?.headers?.authorization ||
        response?.headers?.["x-auth-token"];

      if (!token) {
        console.warn("No token found in response — check API response shape.");
      } else {
        localStorage.setItem("Drivertoken", token);
      }

      setDriver(resData.driver);
      navigate("/drivers-home");
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
          src="../../public/driverlogo.png"
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
            New Driver?{" "}
            <Link
              to="/drivers/register"
              className="text-blue-500 text-lg text-semibold underline"
            >
              Create New Account
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/users/login"
          className="bg-[#c73f00] text-white py-4 px-4 rounded w-full font-semibold text-xl flex items-center justify-center "
        >
          SignIn As a User
        </Link>
      </div>
    </div>
  );
};

export default DriverLogin;
