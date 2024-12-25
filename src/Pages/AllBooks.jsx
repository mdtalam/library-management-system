import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const { user } = useContext(AuthContext);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [viewMode, setViewMode] = useState("card");
  const [showAvailable, setShowAvailable] = useState(false);
  const navigate = useNavigate();

  const getAllBooks = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
    setBooks(data);
    setFilteredBooks(data);
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  
  const handleViewChange = (e) => {
    setViewMode(e.target.value);
  };

  
  const handleShowAvailable = () => {
    setShowAvailable((prev) => !prev);
    if (!showAvailable) {
      setFilteredBooks(books.filter((book) => book.quantity > 0));
    } else {
      setFilteredBooks(books);
    }
  };

  return (
    <div>
      <div className="mx-auto p-6">
        {/* View Mode Dropdown */}
        <div className="mb-6">
          <select
            value={viewMode}
            onChange={handleViewChange}
            className="px-4 py-2 border rounded"
          >
            <option value="card">Card View</option>
            <option value="table">Table View</option>
          </select>
        </div>

        {/* Filter Button for Available Books */}
        <div className="mb-6">
          <button
            onClick={handleShowAvailable}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded"
          >
            {showAvailable ? "Show All Books" : "Show Available Books"}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">
          All Books: {filteredBooks.length}
        </h1>

        {/* Conditional Rendering of Card View or Table View */}
        {viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div key={book._id} className="border p-4 shadow rounded">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-semibold">{book.title}</h2>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Category: {book.category}</p>
                <p className="text-gray-600">Quantity: {book.quantity}</p>
                <div className="flex items-center gap-2 mt-2">
                  <ReactStars
                    count={5}
                    value={book.rating}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                    isHalf={true}
                  />
                  <span className="text-gray-600">({book.rating})</span>
                </div>
                <button
                  className={`font-semibold w-full py-1 px-4 rounded transition ${
                    book.email === user?.email
                      ? "bg-purple text-white hover:bg-purple-dark"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    book.email === user?.email &&
                    navigate(`/update-book/${book._id}`)
                  }
                  disabled={book.email !== user?.email}
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        ) : (
          // Table View
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Title</th>
                  <th className="border px-4 py-2">Author</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Quantity</th>
                  <th className="border px-4 py-2">Rating</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book) => (
                  <tr key={book._id}>
                    <td className="border px-4 py-2">{book.title}</td>
                    <td className="border px-4 py-2">{book.author}</td>
                    <td className="border px-4 py-2">{book.category}</td>
                    <td className="border px-4 py-2">{book.quantity}</td>
                    <td className="border px-4 py-2">
                      <ReactStars
                        count={5}
                        value={book.rating}
                        size={20}
                        edit={false}
                        activeColor="#ffd700"
                        isHalf={true}
                      />
                      <span className="text-gray-600">({book.rating})</span>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className={`font-semibold py-1 px-4 rounded transition ${
                          book.email === user?.email
                            ? "bg-purple text-white hover:bg-purple-dark"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={() =>
                          book.email === user?.email &&
                          navigate(`/update-book/${book._id}`)
                        }
                        disabled={book.email !== user?.email}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
