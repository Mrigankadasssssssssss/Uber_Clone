import React from "react";

const VehiclePannel = (props) => {
  return (
    <div>
      <h5
        className="p-3 text-center w-[90%] absolute top-0"
        onClick={() => {
          props.setVehiclePannel(false);
        }}
      >
        <i className="text-3xl text-gray-200 mb-1.5 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-2">Choose your ride:</h3>
      <div onClick={()=>{props.setConfirmRidePannel(true), props.setVehiclePannel(false);}} className="flex border-2 border-transparent active:border-black  rounded-xl w-full items-center justify-between p-3 mb-3">
        <img className="h-15" src="../../public/uber_car.png" />
        <div className="w-1/2">
          <h4 className="font-semibold text-base">
            Car{" "}
            <span>
              <i className="ri-user-line text-lg font-bold"></i> 4
            </span>
          </h4>
          <h5 className="text-sm font-medium">2 mins away...</h5>
          <p className="text-xs text-gray-600 font-normal">
            Affordable, Compact Rides
          </p>
        </div>
        <h2 className="text-xl font-medium">₹193.23</h2>
      </div>
      <div onClick={()=>{props.setConfirmRidePannel(true), props.setVehiclePannel(false);} } className="flex border-2 border-transparent active:border-black rounded-xl w-full items-center justify-between p-3 mb-3">
        <img className="h-15" src="../../public/moto.png" />
        <div className="w-1/2">
          <h4 className="font-semibold text-base">
            Moto{" "}
            <span>
              <i className="ri-user-line text-lg font-bold"></i> 1
            </span>
          </h4>
          <h5 className="text-sm font-medium">3 mins away...</h5>
          <p className="text-xs text-gray-600 font-normal">
            Affordable, Motorcycle Rides
          </p>
        </div>
        <h2 className="text-xl font-medium">₹93</h2>
      </div>
      <div onClick={()=>{props.setConfirmRidePannel(true), props.setVehiclePannel(false);}} className="flex border-2 border-transparent active:border-black rounded-xl w-full items-center justify-between p-3 mb-3">
        <img className="h-15 mr-5" src="../../public/auto.png" />
        <div className="w-1/2">
          <h4 className="font-semibold text-base">
            Auto{" "}
            <span>
              <i className="ri-user-line text-lg font-bold"></i> 3
            </span>
          </h4>
          <h5 className="text-sm font-medium">5 mins away...</h5>
          <p className="text-xs text-gray-600 font-normal">
            Affordable, Auto Rides
          </p>
        </div>
        <h2 className="text-xl font-medium">₹108.28</h2>
      </div>
    </div>
  );
};

export default VehiclePannel;
