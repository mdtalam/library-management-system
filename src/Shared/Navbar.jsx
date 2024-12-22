import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu

  return (
    <nav className="bg-purple text-white px-6 py-4 shadow-lg">
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
          <>
            <li>
              <NavLink
                to="/login"
                className='bg-orange text-white px-4 py-2 rounded'
              >
                Log In
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className='bg-orange text-white px-4 py-2 rounded'
                
              >
                Register
              </NavLink>
            </li>
          </>
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
                isActive ? 'bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2' : 'hover:text-orange block text-center mb-2'
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
                isActive ? 'bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2' : 'hover:text-orange block text-center mb-2'
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
                isActive ? 'bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2' : 'hover:text-orange block text-center mb-2'
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
                isActive ? 'bg-white text-orange font-semibold px-3 py-1 rounded block text-center mb-2' : 'hover:text-orange block text-center mb-2'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Borrowed Books
            </NavLink>
          </li>

          {/* "Log In" and "Register" Buttons - Adjusted for Mobile */}
          <li>
            <NavLink
              to="/login"
              className= "bg-orange  text-white px-3 py-1 rounded block text-center mb-2"
              
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
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
