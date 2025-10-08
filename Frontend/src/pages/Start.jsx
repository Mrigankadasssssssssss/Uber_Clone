import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { RiArrowDownLine } from "@remixicon/react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePannel from "../components/VehiclePannel";
import ConfirmRides from "../components/ConfirmRides";
import WaitforDriver from "../components/WaitforDriver";
import LookingForDriver from "../components/LookingForDriver";

const Start = () => {
  const [pickUp, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [pannelOpen, setPannelOpen] = useState(false);
  const [vehiclePannel, setVehiclePannel] = useState(false);
  const [confirmRidePannel, setConfirmRidePannel] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const pannelRef = useRef(null);
  const arrowRef = useRef(null);
  const vehiclePannelRef = useRef(null);
  const confirmRidePannelRef = useRef(null);
  const driverfoundRef = useRef(null);
  const waitingfordriverRef = useRef(null);
  useGSAP(() => {
    if (pannelOpen) {
      gsap.to(pannelRef.current, {
        height: "70%",
        padding: 24,
      });
      gsap.to(arrowRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(pannelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(arrowRef.current, {
        opacity: 0,
      });
    }
  }, [pannelOpen]);

  useGSAP(()=>{
    if(vehiclePannel){
      gsap.to(vehiclePannelRef.current,{
      transform:'translateY(0)',
    })
    }else{
      gsap.to(vehiclePannelRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[vehiclePannel])

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  useGSAP(()=>{
    if(confirmRidePannel){
      gsap.to(confirmRidePannelRef.current,{
      transform:'translateY(0)',
    })
    }else{
      gsap.to(confirmRidePannelRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[confirmRidePannel])
  useGSAP(()=>{
    if(driverFound){
      gsap.to(driverfoundRef.current,{
      transform:'translateY(0)',
    })
    }else{
      gsap.to(driverfoundRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[driverFound])

  useGSAP(()=>{
    if(waitingForDriver){
      gsap.to(waitingfordriverRef.current,{
      transform:'translateY(0)',
    })
    }else{
      gsap.to(waitingfordriverRef.current,{
      transform:'translateY(100%)',
    })
    }
  },[waitingForDriver])
  

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
        />
      </div>
      <div className="flex flex-col justify-end absolute bottom-0 left-1/2 transform -translate-x-1/2 h-screen rounded-lg shadow-lg w-full max-w-md">
        <div className="bg-white p-7 h-[30%] relative">
          <div
            onClick={() => {
              setPannelOpen(false);
            }}
            ref={arrowRef}
            className="absolute top-9 right-6 opacity-0"
          >
            {" "}
            <RiArrowDownLine size="24px" color="black" />
          </div>
          <h4 className="text-3xl font-semibold">Find A Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col gap-2 mt-5
        "
          >
            <input
              onClick={() => {
                setPannelOpen(true);
              }}
              value={pickUp}
              onChange={(e) => {
                setPickUp(e.target.value);
              }}
              className="bg-[#eee] w-full px-8 py-2 rounded-lg"
              type="text"
              placeholder="Add a pickup location"
            />
            <input
              onClick={() => {
                setPannelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee] w-full px-8 py-2 rounded-lg"
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
        </div>
        <div ref={pannelRef} className="h-0 bg-white ">
          <LocationSearchPanel setPannelOpen={setPannelOpen} setVehiclePannel = {setVehiclePannel} />
        </div>
      </div>
      <div ref={vehiclePannelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-10  bg-white">
        <VehiclePannel setConfirmRidePannel={setConfirmRidePannel} setVehiclePannel={setVehiclePannel}/>
      </div>
      <div ref={confirmRidePannelRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6  bg-white">
        <ConfirmRides setConfirmRidePannel={setConfirmRidePannel} setDriverFound={setDriverFound} />
      </div>
      <div ref={driverfoundRef} className="fixed w-full z-10 bottom-0 translate-y-full px-3 py-6  bg-white">
        <LookingForDriver setDriverFound={setDriverFound}/>
      </div>
      <div ref={waitingfordriverRef} className="fixed w-full z-10 bottom-0  px-3 py-6  bg-white">
        <WaitforDriver setWaitingForDriver={setWaitingForDriver}/>
      </div>
    </div>
  );
};

export default Start;
