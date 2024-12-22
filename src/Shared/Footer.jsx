
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-purple text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              Welcome to the Library Management System. We provide an easy-to-use platform to manage your books, track borrowed items, and enjoy a rich library experience.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange">Home</Link>
              </li>
              <li>
                <Link to="/all-books" className="hover:text-orange">All Books</Link>
              </li>
              <li>
                <Link to="/add-book" className="hover:text-orange">Add Book</Link>
              </li>
              <li>
                <Link to="/borrowed-books" className="hover:text-orange">Borrowed Books</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <p className="text-gray-300">
              <strong>Email:</strong> support@librarysystem.com
            </p>
            <p className="text-gray-300">
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p className="text-gray-300">
              <strong>Address:</strong> 123 Library Street, Booktown, USA
            </p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex justify-center gap-6 mt-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange">
            <FaFacebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange">
            <FaInstagram size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Library Management System. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
