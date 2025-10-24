import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logoutUser());

  return <></>;
};

export default Logout;
