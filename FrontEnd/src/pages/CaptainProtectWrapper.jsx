import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axiosCaptainInstance from "../Utils/axiosCaptainInstance";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }

    axiosCaptainInstance
      .get("/captains/profile")
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">...</div>
    );
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
