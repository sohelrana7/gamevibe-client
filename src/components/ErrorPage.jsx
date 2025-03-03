import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[800px] bg-gray-100 my-12">
      <img
        src="https://i.ibb.co/23BsptYL/error.jpg"
        alt="Error"
        className="w-full max-w-md md:max-w-lg lg:max-w-xl h-[400px]"
      />
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 text-center mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#6e83b7] text-white rounded-lg shadow-md "
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
