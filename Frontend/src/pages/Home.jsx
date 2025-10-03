import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_vector-1753110898889-c648671c2fcd?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]  h-screen pt-8  flex flex-col justify-between w-full">
        <img
          className="w-16 ml-9 left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h1 className="text-3xl font-bold">Get Started with Uber </h1>
          <Link to='/users/login' className="flex items-center justify-center bg-black w-full text-white py-4 px-4 rounded-md cursor-pointer mt-4 text-xl text-semibold">
            Continue <span className="ml-2">&#8594;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
