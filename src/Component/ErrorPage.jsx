import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router-dom";
import errorAnimation from "../assets/error.json"; // Replace with your 3D Lottie animation

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-purple-900 to-black text-white">
      <div className="w-80 h-80">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-300 mb-6 text-center">
        The page you're looking for doesn't exist or an error occurred.
      </p>
      <Link
        to="/"
        className="bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
