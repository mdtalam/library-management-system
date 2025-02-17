import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for password visibility toggle
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import registerLottiData from "../assets/register.json";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile, googleLogin, logOutUser } =
    useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Reset previous error message
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password should be 6 characters or longer");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Include at least one uppercase letter and lowercase letter"
      );
      return;
    }

    // Create new user
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        // Update user profile with name and photo URL
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            Swal.fire({
              title: "Registration Successful!",
              text: `Welcome, ${user?.displayName}`,
              icon: "success",
              confirmButtonText: "Proceed to Login",
            }).then(() => {
              // Log out the user immediately after registration
              logOutUser()
                .then(() => {
                  navigate("/login");
                })
                .catch((error) => {
                  setErrorMessage(error.message);
                });
            });
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="mt-[104px]">
      <Helmet>
        <title>Library system | Register</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center flex-col lg:flex-row-reverse py-10">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple">
            Register
          </h2>
          <form onSubmit={handleRegister}>
            {/* Name Input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="Enter your name"
              />
            </div>

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
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="Enter your email"
              />
            </div>

            {/* Photo URL Input */}
            <div className="mb-4">
              <label
                htmlFor="photoURL"
                className="block text-gray-700 font-medium mb-2"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                name="photo"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="Enter your photo URL"
              />
            </div>

            {/* Password Input with Show/Hide Functionality */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[52px] right-4 transform -translate-y-1/2 text-gray-600"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errorMessage && (
              <label className="label text-red-500 text-sm">
                {errorMessage}
              </label>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-purple text-white py-2 px-4 rounded-lg hover:bg-purple-dark transition duration-200 mb-4"
            >
              Register
            </button>
          </form>

          {/* Redirect to Login */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple hover:underline">
              Login here
            </Link>
          </p>
        </div>
        <div className="divider lg:divider-horizontal py-32 px-10"></div>
        <div>
          <Lottie animationData={registerLottiData}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;
