import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, anonymous = false }) {
  if (!anonymous) {
    return <Navigate to="/" />;
  }
  return children;
}
