import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  return !isLoggedIn ? children : <Navigate replace={true} to="/" />;
};

export default GuestRoute;
