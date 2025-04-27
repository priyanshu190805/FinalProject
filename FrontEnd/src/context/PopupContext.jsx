import React, { createContext, useState } from 'react'

export const PopupDataContext = createContext()

const PopupContext = ({children}) => {

    const [popupMessage, setPopupMessage] = useState("");
    const [popupStatus, setPopupStatus] = useState("success");

    function showPopup(message , status) {
        setPopupMessage(message);
        setPopupStatus(status)
        setTimeout(() => {
          setPopupMessage("");
        }, 3000);
    }

    const value={
        popupMessage,
        showPopup,
        popupStatus,
    }
    
  return (
    <div>
      <PopupDataContext.Provider value={value}>
        {children}
      </PopupDataContext.Provider>
    </div>
  )
}

export default PopupContext
