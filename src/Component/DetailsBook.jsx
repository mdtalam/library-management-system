import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component"; // Import the package
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const DetailsBook = () => {
  const { bookId } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/books/${bookId}`
        );
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  const handleBorrow = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    const borrowData = {
      bookId: book._id,
      name: user.displayName,
      email: user.email,
      returnDate,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/borrow`,
        borrowData
      );

      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "You have successfully borrowed this book.",
          icon: "success",
          confirmButtonText: "Close",
        });
        setBook({ ...book, quantity: book.quantity - 1 });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      console.error("Failed to borrow book:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  if (!book) return <p>Loading...</p>;

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
      {/* React Stars Component */}
      <ReactStars
        count={5}
        value={parseFloat(book.rating)} // Parse the rating to a float value
        size={24}
        isHalf={true} // Allow half stars
        edit={false} // Make it read-only
        activeColor="#ffd700" // Star color
      />
      <p>
        <strong>Quantity:</strong> {book.quantity}
      </p>

      <button
        className="bg-purple text-white py-2 px-4 rounded mt-4 disabled:opacity-50"
        onClick={() => document.getElementById("borrow-modal").showModal()}
        disabled={book.quantity === 0}
      >
        Borrow
      </button>

      {/* Modal */}
      <dialog id="borrow-modal" className="rounded-md p-4 bg-white shadow-md">
        <form onSubmit={handleBorrow}>
          <h2 className="text-lg font-bold mb-4">Borrow Book</h2>
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
            className="bg-purple text-white py-2 px-4 rounded mt-4"
          >
            Confirm Borrow
          </button>
        </form>
        <button
          onClick={() => document.getElementById("borrow-modal").close()}
          className="mt-2 text-sm text-gray-500"
        >
          Cancel
        </button>
      </dialog>
    </div>
  );
};

export default DetailsBook;
