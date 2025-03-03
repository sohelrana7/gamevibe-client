import { useContext, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import SocialLogIn from "../Shared/SocialLogIn";
import loginImg from "../../src/assets/login.jpg";

const SignIn = () => {
  const { signInUser, forgetPassword } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const emailRef = useRef();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    setErrorMessage({});
    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage({
          ...errorMessage,
          signIn: error.message,
        });
      });
  };
  const handleForgetPassword = () => {
    console.log("forget Password", emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      console.log("please provide a valid email");
    } else {
      forgetPassword(email).then(() => {
        alert("Password reset email sent, please check your email");
      });
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="lg:px-0 px-4 w-96">
          <img src={loginImg} alt="" />
        </div>
        <form
          onSubmit={handleSignIn}
          className="lg:min-h-screen flex justify-center items-center"
        >
          <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="font-semibold text-center text-2xl">
                Sign In now
              </h1>
              <fieldset className="fieldset relative">
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  placeholder="Email"
                />
                {errorMessage.email && (
                  <label className="fieldset-label text-red-400">
                    {errorMessage.email}
                  </label>
                )}
                <label className="fieldset-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input w-full"
                  placeholder="Password"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                  className="btn btn-xs absolute right-5 top-[106px]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errorMessage.signIn && (
                  <label className="fieldset-label text-red-400">
                    {errorMessage.signIn}
                  </label>
                )}

                <div onClick={handleForgetPassword}>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-neutral mt-4">
                  Sign In
                </button>
                <SocialLogIn></SocialLogIn>
                <p className="py-4 text-base">
                  Do not have an Account? please{" "}
                  <Link className="text-blue-400 underline" to={"/register"}>
                    Register
                  </Link>
                </p>
              </fieldset>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
