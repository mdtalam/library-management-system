import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa"; // Import password eye icons
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import loginLottiData from "../assets/login.json";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { logInUser, setUser, googleLogin } = useContext(AuthContext);
  const [userError, setUserError] = useState({});
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Reset previous error message
    setUserError({});

    logInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        Swal.fire({
          title: "Login Successful!",
          text: `Welcome back, ${user?.displayName || "User"}`,
          icon: "success",
          confirmButtonText: "Proceed",
        }).then(() => {
          navigate(location?.state ? location.state : "/");
        });
      })
      .catch((error) => {
        setUserError({ ...userError, login: error.code });
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;
      setUser(user);
      Swal.fire({
        title: "Login Successful!",
        text: `Welcome back, ${user?.displayName || "User"}`,
        icon: "success",
        confirmButtonText: "Proceed",
      }).then(() => {
        navigate(location?.state ? location.state : "/");
      });
    } catch (error) {
      setUserError((prevError) => ({ ...prevError, login: error.code }));
    }
  };
  

  return (
    <div className="mt-[104px]">
      <Helmet>
        <title>Library system | Login</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center flex-col lg:flex-row-reverse px-6">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple">
            Login
          </h2>
          <form onSubmit={handleLogin}>
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
                name="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple pr-12" // Add padding-right for the icon
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute top-[52px] right-4 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-600" />
                ) : (
                  <FaEye className="text-gray-600" />
                )}
              </button>
            </div>

            {userError.login && (
              <p className="text-crimson text-sm">{userError.login}</p>
            )}

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
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-orange text-white py-2 px-4 rounded-lg hover:bg-orange-dark transition duration-200 mb-4"
          >
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
