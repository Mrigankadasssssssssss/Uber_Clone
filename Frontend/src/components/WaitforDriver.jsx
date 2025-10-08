import React from "react";

const WaitforDriver = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center w-[90%] absolute top-0"
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
      >
        <i className="text-3xl text-gray-200  ri-arrow-down-wide-fill"></i>
      </h5>

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
              <i className="text-lg font-bold ri-map-pin-line"></i>
            </h3>
            <div>
              <h2 className="text-lg font-medium">37,Deshbandhu Road</h2>
              <p className="text-base text-gray-500 mb-1.5">
                Birnagar,Baghajatin,Kolkata
              </p>
            </div>
          </div>
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
    </div>
  );
};

export default WaitforDriver;
