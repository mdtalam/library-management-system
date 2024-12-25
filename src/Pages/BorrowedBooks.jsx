import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BorrowedBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch borrowed books for the logged-in user
  useEffect(() => {
    if (user) {
      const fetchBorrowedBooks = async () => {
        setLoading(true);
        try {
          const response = await axiosSecure.get(
            `/borrowed/${user.email}`
          );
          setBorrowedBooks(response.data);
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to load borrowed books. Please try again later.",
            icon: "error",
            confirmButtonText: "Close",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchBorrowedBooks();
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleReturn = async (recordId, bookId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/borrow`,
        {
          data: {
            recordId, // The _id of the borrowed book record
            bookId,   // The book's ID in the collection
            userEmail: user.email, // User's email
          },
        }
      );
  
      if (response.data.message === "Book returned successfully") {
        Swal.fire({
          title: "Success!",
          text: "The book has been returned successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
  
        // Update UI to remove the returned book
        setBorrowedBooks(borrowedBooks.filter((book) => book._id !== recordId));
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to return the book. Please try again later.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };
  

  // Loading state display
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="spinner-border text-purple-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white shadow-md rounded mt-8">
      <h1 className="text-2xl font-bold mb-6">Borrowed Books</h1>

      {borrowedBooks?.length === 0 ? (
        <p className="text-center">You have no borrowed books.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {borrowedBooks?.map((book) => (
            <div
              key={book._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
              <p className="text-sm text-gray-600">{book.category}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Borrowed on:</strong>{" "}
                {new Date(book.borrowedDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Return by:</strong>{" "}
                {new Date(book.returnDate).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleReturn(book._id, book.bookId)}
                className="bg-red-600 text-white py-2 px-4 rounded mt-4 w-full"
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedBooks;
