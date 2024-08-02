import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectRoute = () => {
  const allusers = useSelector((state) => state.auth);
  const { userInfo } = allusers;

  if (userInfo?.token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectRoute;
