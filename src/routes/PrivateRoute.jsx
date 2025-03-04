import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate to="/signIn"></Navigate>
    </div>
  );
};

export default PrivateRoute;
