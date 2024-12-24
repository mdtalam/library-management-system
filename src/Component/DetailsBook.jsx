import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const DetailsBook = () => {
  const { bookId } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [returnDate, setReturnDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${bookId}`
        );
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to load book details. Please try again later.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    };
    fetchBookDetails();
  }, [bookId]);

  // Handle borrow form submission
  const handleBorrow = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Not Logged In!",
        text: "You need to log in to borrow a book.",
        icon: "info",
        confirmButtonText: "Log In",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    if (!returnDate || new Date(returnDate) < new Date()) {
      Swal.fire({
        title: "Invalid Return Date!",
        text: "Please select a return date that is in the future.",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }

    setIsSubmitting(true);

    const borrowData = {
      bookId: book._id,
      name: user.displayName,
      email: user.email,
      title: book.title,
      image: book.image,
      category: book.category,
      borrowedDate: new Date().toISOString(),
      returnDate,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/borrow`,
        borrowData
      );
      if (data.borrowResult.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "You have successfully borrowed this book.",
          icon: "success",
          confirmButtonText: "Close",
        });

        // Update quantity
        setBook((prevBook) => ({
          ...prevBook,
          quantity: prevBook.quantity - 1,
        }));
        setIsModalOpen(false);
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Unable to borrow the book.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      console.error("Failed to borrow book:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while borrowing the book. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!book) return <p>Loading book details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <img src={book.image} alt={book.title} className="w-full rounded mb-4" />
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Category:</strong> {book.category}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Rating:</strong>
      </p>
      <ReactStars
        count={5}
        value={parseFloat(book.rating)}
        size={24}
        isHalf={true}
        edit={false}
        activeColor="#ffd700"
      />
      <p>
        <strong>Quantity:</strong> {book.quantity}
      </p>

      <button
        className="bg-purple text-white py-2 px-4 rounded mt-4 disabled:opacity-50"
        onClick={() => setIsModalOpen(true)}
        disabled={book.quantity === 0}
      >
        {book.quantity === 0 ? "Out of Stock" : "Borrow"}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Borrow Book</h2>
            <form onSubmit={handleBorrow}>
              <p>
                <strong>Name:</strong> {user?.displayName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "N/A"}
              </p>
              <div className="mt-4">
                <label htmlFor="returnDate" className="block font-medium">
                  Return Date:
                </label>
                <input
                  type="date"
                  id="returnDate"
                  className="border border-gray-300 rounded w-full p-2"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-purple text-white py-2 px-4 rounded mt-4 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Borrow"}
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-sm text-gray-500 w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsBook;
