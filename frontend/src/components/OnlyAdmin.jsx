import { RouteIndex, RouteSignIn } from "@/helpMe/RouteName";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const OnlyAdmin = () => {
  const user = useSelector((state) => state.user);
  if (user && user.isLoggedIn && user.user.role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to={RouteSignIn} />;
  }
};

export default OnlyAdmin;
