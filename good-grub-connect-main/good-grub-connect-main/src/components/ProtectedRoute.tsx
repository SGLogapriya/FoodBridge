import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  role?: "donor" | "ngo";
}

const ProtectedRoute = ({ children, role }: Props) => {
  const userData = localStorage.getItem("user");

  // ❌ Not logged in
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userData);

  // ❌ Wrong role trying to access
  if (role && user.role !== role) {
    alert("Access denied! Wrong role.");
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return <>{children}</>;
};

export default ProtectedRoute;