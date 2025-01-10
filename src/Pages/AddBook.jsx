import axios from "axios";
import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import addBookLotti from "../assets/addBook.json";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [bookData, setBookData] = useState({
    image: "", // Image URL instead of a file
    title: "",
    quantity: "",
    author: "",
    category: "",
    description: "",
    rating: "",
    email: user?.email || "",
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
      const bookDataWithNumbers = {
        ...bookData,
        quantity: Number(bookData.quantity), // Ensure quantity is a number
        rating: Number(bookData.rating), // Ensure rating is a number
      };

      // Axios sends cookies for JWT automatically if configured with credentials
      axios.defaults.withCredentials = true;

      // Save book details to the database
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/books`,
        bookDataWithNumbers
      );

      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Book added successfully!",
          icon: "success",
          confirmButtonText: "Close",
        });
      }

      console.log("Book Added Successfully:", data);

      // Reset the form
      setBookData({
        image: "",
        title: "",
        quantity: "",
        author: "",
        category: "",
        description: "",
        rating: "",
        email: user?.email || "",
      });
    } catch (error) {
      console.error("Error saving book to the database:", error);
      if (error.response?.status === 401) {
        Swal.fire({
          title: "Unauthorized!",
          text: "You are not logged in. Please log in to add books.",
          icon: "error",
          confirmButtonText: "Close",
        });
      } else if (error.response?.status === 403) {
        Swal.fire({
          title: "Forbidden!",
          text: "You are not authorized to add books.",
          icon: "error",
          confirmButtonText: "Close",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add the book. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 shadow-lg rounded my-10 mt-[104px]">
      <Helmet>
        <title>Library system | Add Book</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-6">Add a Book</h1>

      {/* Flex container to hold the form and animation side by side */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-10">
        {/* Form Section */}
        <div className="w-full md:w-1/2">
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
                id="title"
                name="title"
                value={bookData.title}
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

        {/* Lottie Animation Section */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0">
          <Lottie animationData={addBookLotti} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default AddBook;
