import { Navigate } from "react-router-dom";
import { ReactNode } from "react";


const ProtectedRoute = ({ children, role }: any) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login"/>;
  }
  // ❌ Wrong role trying to access
  if (role && user.role !== role) {
    alert("Access denied! Wrong role.");
    return <Navigate to="/login"/>;
  }

  // ✅ Allowed
  return children;
};

export default ProtectedRoute;