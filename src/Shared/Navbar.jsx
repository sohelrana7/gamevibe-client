import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#6e83b7] font-bold border-b-2 border-[#6e83b7] pb-1"
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allReviews"
          className={({ isActive }) =>
            isActive
              ? "text-[#6e83b7] font-bold border-b-2 border-[#6e83b7] pb-1"
              : ""
          }
        >
          All Reviews
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addReview"
          className={({ isActive }) =>
            isActive
              ? "text-[#6e83b7] font-bold border-b-2 border-[#6e83b7] pb-1"
              : ""
          }
        >
          Add Review
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/myReviews/${user?.email}`}
          className={({ isActive }) =>
            isActive
              ? "text-[#6e83b7] font-bold border-b-2 border-[#6e83b7] pb-1"
              : ""
          }
        >
          My Reviews
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`myWatchList/${user?.email}`}
          className={({ isActive }) =>
            isActive
              ? "text-[#6e83b7] font-bold border-b-2 border-[#6e83b7] pb-1"
              : ""
          }
        >
          Game Watch List
        </NavLink>
      </li>
    </>
  );
  const handleLogOut = () => {
    logOutUser();
    navigate("/");
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <img src="https://i.ibb.co.com/0Rrb6qhc/logo.png" alt="" />
          <h3 className="text-xl font-semibold">
            Game<span className="text-slate-600">Vibe</span>
          </h3>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown relative">
            <div
              tabIndex={0}
              role="button"
              className="group relative flex items-center"
            >
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-300 hover:scale-105 transition-transform"
              />

              {/* Tooltip (User Name) */}
              <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded-md py-1 px-2 whitespace-nowrap">
                {user.displayName || "User"}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg border">
                {/* <p className="p-2 text-center font-medium text-gray-700 border-b">
                  {user.displayName || "User"}
                </p> */}
                <button
                  onClick={handleLogOut}
                  className="w-full px-4 py-2 text-red-600 hover:bg-red-100 transition"
                >
                  Log Out
                </button>
              </div>
            </ul>
          </div>
        ) : (
          <Link to="/signIn">Sign In</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
