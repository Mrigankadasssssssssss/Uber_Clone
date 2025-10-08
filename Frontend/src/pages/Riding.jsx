import React from "react";
import { Link } from "react-router-dom";
const Riding = () => {
  return (
    <div className="h-screen">
      <Link to='/home' className="fixed right-2 top-2 bg-white flex items-center justify-center h-10 w-10 rounded-full">
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img className="h-16" src="../../public/uber_car.png" />
          <div className="text-right">
            <h2 className="text-lg font-medium">Mriganka</h2>
            <h3 className="text-xl font-semibold">WB093847LP</h3>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        <div className="flex gap-2 flex-col justify-between items-center">
          <div className="w-full p-3 m-3">
            <div className="flex gap-3 border-b-1 mb-3">
              <h3>
                <i className="text-lg font-semibold ri-map-pin-3-line"></i>
              </h3>
              <div>
                <h2 className="text-lg font-medium">37,Deshbandhu Road</h2>
                <p className="text-base text-gray-500 mb-1.5">
                  Birnagar,Baghajatin,Kolkata
                </p>
              </div>
            </div>
            <div className="flex gap-3  mb-3">
              <h3>
                <i className="text-lg font-bold ri-cash-line"></i>
              </h3>
              <div>
                <h2 className="text-lg font-medium">₹193.23</h2>
                <p className="text-base text-gray-500">Payment - Cash</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-green-600 text-white text-xl font-semibold p-3 rounded-lg hover:bg-green-400">
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
