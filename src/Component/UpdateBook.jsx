import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  console.log(bookId)

  const [bookData, setBookData] = useState({
    image: "",
    name: "",
    author: "",
    category: "",
    rating: "",
  });

  const categories = ["Fiction", "Science", "History", "Fantasy"];

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${bookId}`
        );
        setBookData(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/books/${bookId}`,
        bookData
      );
      alert("Book updated successfully!");
      navigate("/all-books"); // Redirect to All Books Page
    } catch (error) {
      console.error("Failed to update book:", error);
      alert("Failed to update book. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Update Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image" className="block font-medium">
            Book Cover Image URL:
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={bookData.image}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block font-medium">
            Book Title:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={bookData.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block font-medium">
            Author Name:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block font-medium">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={bookData.category}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full p-2"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rating" className="block font-medium">
            Rating (1.0 - 5.0):
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={bookData.rating}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full p-2"
            step="0.1"
            min="1.0"
            max="5.0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple text-white font-semibold rounded hover:bg-purple-dark transition"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
