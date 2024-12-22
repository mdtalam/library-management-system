import Lottie from "lottie-react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginLottiData from "../assets/login.json";

const Login = () => {
  return (
    <div className="">
      <div className="min-h-screen flex items-center justify-center flex-col lg:flex-row-reverse bg-gray-100 px-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple">
            Login
          </h2>
          <form>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="Enter your password"
              />
            </div>

            <div className="text-start mb-4">
              <button
                type="button"
                className="text-sm text-purple hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple text-white py-2 px-4 rounded-lg hover:bg-purple-dark transition duration-200 mb-4"
            >
              Login
            </button>
          </form>

          {/* Google Login Button */}
          <button className="w-full flex items-center justify-center bg-orange text-white py-2 px-4 rounded-lg hover:bg-orange-dark transition duration-200 mb-4">
            <FaGoogle className="mr-2" />
            Login with Google
          </button>

          {/* Redirect to Register */}
          <p className="text-center text-gray-600">
            Don`t have an account?{" "}
            <Link to="/register" className="text-purple hover:underline">
              Register here
            </Link>
          </p>
        </div>
        <div className="divider lg:divider-horizontal py-32 px-10"></div>
        <div>
          <Lottie animationData={loginLottiData}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Login;
