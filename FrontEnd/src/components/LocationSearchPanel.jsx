import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({
  setPickup,
  activeField,
  suggestions,
  setDestination,
  darkMode,
}) => {
  const handleSuggestionClick = (elem) => {
    if (activeField === "pickup") {
      setPickup(elem.description);
    } else if (activeField === "destination") {
      setDestination(elem.description);
    }
  };

  return (
    <div className="overflow-y-auto">
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(elem)}
          className={`flex ${
            darkMode
              ? "active:bg-[#242424] border-[#303030]"
              : "active:bg-[#eee] border-[#eeee]"
          } p-3 border-2 rounded-xl items-center my-2 justify-start gap-3`}
        >
          <div className="flex-shrink-0 w-[32px] h-[32px] bg-[#eee] rounded-full flex items-center justify-center">
            <FaLocationDot className="text-[16px] text-black" />
          </div>
          <h4
            className={`text-[18px] ${
              darkMode ? "text-white" : "text-black"
            } font-medium`}
          >
            {elem.description}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
