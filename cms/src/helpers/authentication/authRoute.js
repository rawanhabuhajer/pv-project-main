import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.authentication);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default AuthRoute;
