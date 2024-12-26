import 'animate.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactStars from 'react-rating-stars-component'; // Import the ReactStars component
import { useNavigate, useParams } from 'react-router-dom';

const CategoryBooks = () => {
  const { category } = useParams(); // Get category from URL parameter
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate(); // To navigate programmatically

  // Fetch all books and filter them based on category
  const getCategoryBooks = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Filter books by category whenever the category changes
  useEffect(() => {
    getCategoryBooks();
  }, []);

  useEffect(() => {
    if (category && books.length > 0) {
      const filtered = books.filter(book => book.category.toLowerCase() === category.toLowerCase());
      setFilteredBooks(filtered);
    }
  }, [category, books]);

  // Function to navigate to book details page
  const handleDetailsClick = (bookId) => {
    navigate(`/details/${bookId}`); // Navigate to the book details page with the bookId in the URL
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Helmet>
        <title>Library system | Book Category</title>
      </Helmet>
      <div className="flex items-center justify-between mb-8">
        {/* Go Back Button */}
        <button
          onClick={() => navigate('/')}
          className="bg-orange text-white py-2 px-4 rounded hover:bg-purple-800 transition"
        >
          Go Back
        </button>

        {/* Category Length */}
        <div className="animate__animated animate__zoomIn text-xl font-semibold">
          {filteredBooks.length} Books in {category} Category
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks?.length > 0 ? (
          filteredBooks?.map((book) => (
            <div key={book._id} className="animate__animated animate__jackInTheBox border p-4 shadow rounded">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{book.name}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Category: {book.category}</p>
              <p className="text-gray-600">Quantity: {book.quantity}</p>

              {/* Rating using ReactStars component */}
              <div className="flex items-center gap-2 mt-2">
                <ReactStars
                  count={5}
                  value={book.rating} // Rating value from the book data
                  size={24} // Size of the stars
                  edit={false} // Disable editing the rating
                  activeColor="#ffd700" // Color of the filled stars
                  isHalf={true} // Allow half stars
                />
                <span className="text-gray-600">({book.rating})</span>
              </div>

              {/* Details Button */}
              <button
                onClick={() => handleDetailsClick(book._id)}
                className="mt-4 py-2 w-full px-4 bg-lightOrange text-white rounded hover:bg-purple transition"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-600">No books found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryBooks;
