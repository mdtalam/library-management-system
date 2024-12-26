import { useContext, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const { user, logOutUser } = useContext(AuthContext);

  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="bg-purple text-white px-6 py-6 shadow-lg">
  <div className="container mx-auto flex items-center justify-between">
    {/* Website Logo */}
    <h1 className="text-2xl font-bold">
      <Link to="/">Library System</Link>
    </h1>

    {/* Desktop Menu */}
    <ul className="hidden md:flex items-center space-x-6">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-orange font-semibold px-4 py-2 rounded"
              : "hover:text-orange"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-orange font-semibold px-4 py-2 rounded"
              : "hover:text-orange"
          }
        >
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-book"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-orange font-semibold px-4 py-2 rounded"
              : "hover:text-orange"
          }
        >
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/borrowed-books"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-orange font-semibold px-4 py-2 rounded"
              : "hover:text-orange"
          }
        >
          Borrowed Books
        </NavLink>
      </li>
      {/* Conditional Login/Logout */}
      {!user ? (
        <>
          <li>
            <NavLink
              to="/login"
              className="bg-orange text-white px-4 py-2 rounded"
            >
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className="bg-orange text-white px-4 py-2 rounded"
            >
              Register
            </NavLink>
          </li>
        </>
      ) : (
        <li className="flex items-center space-x-4">
          <img
            referrerPolicy="no-referrer"
            src={user?.photoURL || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
            data-tooltip-id="profileTooltip"
            data-tooltip-content={user?.displayName || "User Profile"}
          />
          <Tooltip
            id="profileTooltip"
            place="bottom"
            effect="solid"
            className="bg-gray-800 text-white z-10 px-2 py-1 rounded"
          />
          <button
            onClick={logOutUser}
            className="bg-orange px-4 py-2 text-sm text-white rounded hover:bg-orange-dark transition duration-200"
          >
            Logout
          </button>
        </li>
      )}
      {/* Theme Toggle Button */}
      <li>
        <button
          onClick={toggleTheme}
          className="text-xl bg-purple text-white px-4 py-2 rounded transition flex items-center"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </li>
    </ul>

    {/* Mobile Menu Button */}
    <button
      className="block md:hidden text-orange"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle Menu"
    >
      {isMenuOpen ? "✖" : "☰"}
    </button>
  </div>

  {/* Mobile Dropdown Menu */}
  {isMenuOpen && (
    <ul className="md:hidden bg-purple text-white space-y-2 mt-4 px-4">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2"
              : "hover:text-orange block text-center mb-2"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2"
              : "hover:text-orange block text-center mb-2"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-book"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2"
              : "hover:text-orange block text-center mb-2"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/borrowed-books"
          className={({ isActive }) =>
            isActive
              ? "bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2"
              : "hover:text-orange block text-center mb-2"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Borrowed Books
        </NavLink>
      </li>
      {/* Conditional Login/Logout */}
      {!user ? (
        <>
          <li>
            <NavLink
              to="/login"
              className="bg-orange text-white px-3 py-1 rounded block text-center mb-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className="bg-orange text-white px-3 py-1 rounded block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </NavLink>
          </li>
        </>
      ) : (
        <li>
          <div className="flex flex-col items-center space-y-3">
            <img
              referrerPolicy="no-referrer"
              src={user?.photoURL || "https://via.placeholder.com/40"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
              data-tooltip-id="profileTooltip"
              data-tooltip-content={user?.displayName || "User Profile"}
            />
            <Tooltip
              id="profileTooltip"
              place="bottom"
              effect="solid"
              className="bg-gray-800 text-white z-10 px-2 py-1 rounded"
            />
            <button
              onClick={logOutUser}
              className="bg-orange px-4 py-2 text-sm text-white rounded hover:bg-orange-dark transition duration-200"
            >
              Logout
            </button>
          </div>
        </li>
      )}
      <li>
        <button
          onClick={toggleTheme}
          className="text-xl bg-purple text-white px-4 py-2 rounded transition flex items-center mx-auto mt-4"
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </li>
    </ul>
  )}
</nav>

  );
};

export default Navbar;
