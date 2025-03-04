import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";

import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const SocialLogIn = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline btn-accent w-full "
      >
        <FcGoogle size={20} />
        Social Sign In
      </button>
    </div>
  );
};

export default SocialLogIn;
