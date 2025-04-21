import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>loading....</div>;

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
export default ProtRoute;
