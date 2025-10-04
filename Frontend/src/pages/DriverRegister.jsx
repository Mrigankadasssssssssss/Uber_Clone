/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DriverDataContext } from "../context/DriverContext";
import axios from "axios";
const DriverRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleNumberPlate, setVehicleNumberPlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [vehicleType, setVehicleType] = useState("");

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { driver, setDriver } = React.useContext(DriverDataContext);

 const handleSubmit = async (e) => {
    e.preventDefault();

    const newDriver = {
      fullName: { firstName: firstName, lastName: lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        numberPlate: vehicleNumberPlate,
        capacity: Number(vehicleCapacity),
        vehicleType,
      },
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/drivers/register",
        newDriver
      );

      
      // console.log("Driver register response:", response);

      
      const resData = response.data || {};
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

      // Put driver data in context (adjust based on your backend shape)
      const driverPayload = resData.driver || resData;
      setDriver(driverPayload);

      // redirect to protected home
      navigate("/drivers-home");

      // Reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVehicleColor("");
      setVehicleNumberPlate("");
      setVehicleCapacity(0);
      setVehicleType("");
    } catch (error) {
      console.error("Registration error:", error.response || error);
    }
  };
  return (
    <div className="h-screen p-7 flex flex-col justify-between">
      <div>
        <img
          className="w-16  mb-2"
          src="../../public/driverlogo.png"
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
          <h3 className="text-xl font-semibold mb-2">Vehicle Details</h3>
          <div className="flex gap-4 mb-4">
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className="bg-[#eeeeee]  border border-gray-300 p-2 rounded-md mb-4 w-full text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Color"
            />
            <input
              value={vehicleNumberPlate}
              onChange={(e) => setVehicleNumberPlate(e.target.value)}
              className="bg-[#eeeeee]  border border-gray-300 p-2 rounded-md mb-4 w-full text-lg placeholder:text-base"
              required
              type="text"
              placeholder="Number Plate"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className="bg-[#eeeeee]  border border-gray-300 p-2 rounded-md mb-4 w-full text-lg placeholder:text-base"
              required
              type="number"
              placeholder="Capacity"
            />
            {/* Vehicle Type dropdown */}
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="bg-[#eeeeee] border border-gray-300 p-2 rounded-md mb-4 w-full text-lg"
              required
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          <button
            className="bg-black text-white py-2 px-4 rounded-md w-full font-semibold text-xl"
            type="submit"
          >
            Create Driver's Account
          </button>
          <p className="mt-4 text-gray-500 text-center">
            Already have an account?{" "}
            <Link
              to="/drivers/login"
              className="text-blue-500 text-lg text-semibold underline"
            >
              Go to Login
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-gray-500 text-[10px] leading-tight">
          Uber drivers need a valid driver's license, proof of residency, an
          eligible four-door vehicle, and must pass a background check to
          register.{" "}
        </p>
      </div>
    </div>
  );
};

export default DriverRegister;
