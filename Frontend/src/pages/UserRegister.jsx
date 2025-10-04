/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const UserRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const {user,setUser} = React.useContext(UserDataContext);
  let navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newUser = {
      fullName: { firstName: firstName, lastName: lastName },
      email: email,
      password: password,
    };

    const response = await axios.post(import.meta.env.VITE_BASE_URL + "/users/register", newUser);
    if(response.status === 201){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    // Reset form fields
    setFirstName("");
    setLastName("");
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
          <h3 className="text-xl font-semibold mb-2">What's Your Name?</h3>
          <div className="flex gap-4 mb-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee]  border border-gray-300 p-2 rounded-md  w-1/2 text-lg placeholder:text-base"
              required
              type="text"
              placeholder="John"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee]  border border-gray-300 p-2 rounded-md w-1/2 text-lg placeholder:text-base"
              type="text"
              placeholder="Doe"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">What's Your Email?</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee]  border border-gray-300 p-2 rounded-md mb-4 w-full text-lg placeholder:text-base"
            required
            type="email"
            placeholder="example@gmail.com"
          />
          <h3 className="text-xl font-semibold mb-2">Create Your Password</h3>
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
            Sign Up
          </button>
          <p className="mt-4 text-gray-500 text-center">
            Already have an account?{" "}
            <Link
              to="/users/login"
              className="text-blue-500 text-lg text-semibold underline"
            >
              Go to Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-gray-500 text-[10px] leading-tight">
          Uber's registration policy for drivers, vehicles, and accounts is
          based on a set of core requirements but can vary significantly
          depending on local laws and the specific Uber product. The primary
          regulations focus on driver eligibility, vehicle qualifications,
          background checks, and proper documentation.{" "}
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
