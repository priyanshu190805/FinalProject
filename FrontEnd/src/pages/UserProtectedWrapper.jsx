import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axiosInstance from "../Utils/axiosInstance";

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const { setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axiosInstance
      .get("/users/profile")
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">...</div>
    );
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;
