import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin");

  return isAdmin === "true" ? children : <Navigate to="/admin" />;
};

export default AdminRoute;
