import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, anonymous = false }) {
  if (!anonymous) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
