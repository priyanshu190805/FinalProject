import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({ setVehiclePanelOpen, setPanelOpen, setPickup, activeField, suggestions, setDestination, darkMode}) => {

  const handleSuggestionClick = (elem) => {
    if(activeField === 'pickup'){
      setPickup(elem.description)
    }
    else if (activeField === 'destination'){
      setDestination(elem.description)
    }
  }

  return (
    <div className="">
      {suggestions.map(function(elem, idx){
        return (
          <div key={idx} onClick={() => handleSuggestionClick(elem)} className={`flex ${darkMode ? "active:bg-[#1a1a1a] border-[#303030]" : "active:bg-[#eee] border-[#eeee]"} p-3 border-2 rounded-xl items-center my-2 justify-start gap-2`}>
        <FaLocationDot className="bg-[#eee] p-2 rounded-full w-[34px] h-[34px] text-[30px]" />
        <h4 className={`text-[18px] ${darkMode ? "text-white" : "text-black"} font-medium`}>
          {elem.description }
        </h4>
      </div>
        )
      })}
    </div>
  );
};

export default LocationSearchPanel;
