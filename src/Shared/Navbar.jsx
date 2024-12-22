import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="bg-purple text-white px-6 py-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Website Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">Library System</Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'bg-white text-orange font-semibold px-4 py-2 rounded' : 'hover:text-orange'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-books"
              className={({ isActive }) =>
                isActive ? 'bg-white text-orange font-semibold px-4 py-2 rounded' : 'hover:text-orange'
              }
            >
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-book"
              className={({ isActive }) =>
                isActive ? 'bg-white text-orange font-semibold px-4 py-2 rounded' : 'hover:text-orange'
              }
            >
              Add Book
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/borrowed-books"
              className={({ isActive }) =>
                isActive ? 'bg-white text-orange font-semibold px-4 py-2 rounded' : 'hover:text-orange'
              }
            >
              Borrowed Books
            </NavLink>
          </li>

          {/* Conditional Login/Logout */}
          {!user ? (
            <>
              <li>
                <NavLink to="/login" className="bg-orange text-white px-4 py-2 rounded">
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="bg-orange text-white px-4 py-2 rounded">
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li className="relative group">
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <img
                    src={user?.photoURL || 'https://via.placeholder.com/40'}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-white text-purple text-sm font-medium rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {user?.displayName || 'User'}
                  </div>
                </div>
                <button
                  onClick={logOutUser}
                  className="bg-orange px-4 py-2 text-sm text-white rounded hover:bg-orange-dark transition duration-200"
                >
                  Logout
                </button>
              </div>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-orange"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? '✖' : '☰'}
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
                  ? 'bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2'
                  : 'hover:text-orange block text-center mb-2'
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
                  ? 'bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2'
                  : 'hover:text-orange block text-center mb-2'
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
                  ? 'bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2'
                  : 'hover:text-orange block text-center mb-2'
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
                  ? 'bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2'
                  : 'hover:text-orange block text-center mb-2'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Borrowed Books
            </NavLink>
          </li>

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
            <li className="text-center">
              <p className="mb-2">{user?.displayName || 'User'}</p>
              <button
                onClick={logOutUser}
                className="bg-orange px-4 py-2 text-sm text-white rounded hover:bg-orange-dark transition duration-200"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
