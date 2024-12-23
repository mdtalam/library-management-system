import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider"; // Import AuthContext

const AddBook = () => {
  const { user } = useContext(AuthContext); // Access the authenticated user
  const [bookData, setBookData] = useState({
    image: "", // Image URL instead of a file
    name: "",
    quantity: "",
    author: "",
    category: "",
    description: "",
    rating: "",
    email: user?.email || "", // Pre-fill with authenticated user's email
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Fiction", "Science", "History", "Fantasy"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Save book details, including the image URL, to the database
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/books`, bookData);

      console.log("Book Added Successfully:", data);
      alert("Book added successfully!");

      // Reset the form
      setBookData({
        image: "",
        name: "",
        quantity: "",
        author: "",
        category: "",
        description: "",
        rating: "",
        email: user?.email || "",
      });
    } catch (error) {
      console.error("Error saving book to the database:", error);
      alert("Failed to add the book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h1 className="text-2xl font-bold text-center mb-6">Add a Book</h1>
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
            placeholder="Enter image URL"
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
          <label htmlFor="quantity" className="block font-medium">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={bookData.quantity}
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
          <label htmlFor="description" className="block font-medium">
            Short Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleInputChange}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
