import React from "react";
import "remixicon/fonts/remixicon.css";
const LocationSearchPanel = (props) => {
  
  const location = [
    "37, Deshbandhu Road Po. Baghajatin Kolkata, West Bengal 700086.",
    "Moloy Tea stall",
    "Bishur Chalti Cha",
    "Howraha Station",
  ];
  return (
    <div>
      {/* sample data */}
      {location.map((elem,id) => {
        return (
          <div key={id} onClick={()=>{props.setVehiclePannel(true); props.setPannelOpen(false)}} className="flex items-center mb-2 justify-start  border-2 border-gray-50 rounded-xl active:border-black gap-2">
            <i className="ri-map-pin-2-fill  text-xl"></i>

            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
};
export default LocationSearchPanel;
