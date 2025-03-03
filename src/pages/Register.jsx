import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import loginImg from "../../src/assets/login.jpg";
import SocialLogIn from "../Shared/SocialLogIn";
const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;
    const photoURL = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const terms = form.terms.checked;
    console.log(displayName, photoURL, email, password);
    setErrorMessage({});

    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

    if (!imageRegex.test(photoURL)) {
      setErrorMessage({
        ...errorMessage,
        photo:
          "Invalid image format. Only JPG, JPEG, PNG, GIF, BMP, and WEBP are allowed.",
      });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setErrorMessage({
        ...errorMessage,
        email: "Invalid email format. Example: user@example.com",
      });
      return;
    }
    if (!terms) {
      setErrorMessage({
        ...errorMessage,
        terms: "Please accept our terms and conditions",
      });
      return;
    }
    if (password.length < 6) {
      setErrorMessage({
        ...errorMessage,
        password: "Password should be 6 characters or longer",
      });
      return;
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (!regex.test(password)) {
      setErrorMessage({
        ...errorMessage,
        password:
          "At least on uppercase, one lowercase, one number one special character",
      });
      return;
    }
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        const profile = {
          displayName: displayName,
          photoURL: photoURL,
        };
        updateUserProfile(profile)
          .then(() => {
            console.log("user profile updated");
          })
          .catch((error) => {
            console.log("user profile updated error", error.message);
          });
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <div className="lg:px-0 px-4 w-96">
            <img src={loginImg} alt="" />
          </div>
        </div>
        <form
          onSubmit={handleRegister}
          className="min-h-screen flex justify-center items-center"
        >
          <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="font-semibold text-center text-2xl">
                Register now
              </h1>
              <fieldset className="fieldset relative">
                <label className="fieldset-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input w-full"
                  placeholder="Your name"
                />
                <label className="fieldset-label">Photo</label>
                <input
                  type="text"
                  name="photo"
                  className="input w-full"
                  placeholder="photo"
                />
                {errorMessage.photo && (
                  <label className="fieldset-label text-red-400">
                    {errorMessage.photo}
                  </label>
                )}
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
                  className="btn btn-xs absolute right-5 top-[246px]"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errorMessage.password && (
                  <label className="fieldset-label text-red-400">
                    {errorMessage.password}
                  </label>
                )}

                <div className="form-control">
                  <label className="label justify-start cursor-pointer">
                    <input type="checkbox" name="terms" className="checkbox" />
                    <span className="label-text ml-2">
                      Accept terms and conditions.
                    </span>
                  </label>
                  {errorMessage.terms && (
                    <label className="fieldset-label text-red-400">
                      {errorMessage.terms}
                    </label>
                  )}
                </div>
                <button type="submit" className="btn btn-neutral mt-4">
                  Register
                </button>
                <SocialLogIn></SocialLogIn>
                <p className="py-4 text-base">
                  Already have an account? please{" "}
                  <Link className="text-blue-400 underline" to={"/signIn"}>
                    Sign in
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

export default Register;
