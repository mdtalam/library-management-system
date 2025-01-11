import 'animate.css';
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from '../Component/Loading';
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BorrowedBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // Default view mode is table
  const navigate = useNavigate();

  // Fetch borrowed books for the logged-in user
  useEffect(() => {
    if (user) {
      const fetchBorrowedBooks = async () => {
        setLoading(true);
        try {
          const response = await axiosSecure.get(`/borrowed/${user.email}`);
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
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/borrow`, {
        data: {
          recordId,
          bookId,
          userEmail: user.email,
        },
      });

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
    return <Loading />;
  }

  return (
    <div className="mx-auto p-6 shadow-md rounded mt-[104px] mb-8">
      <Helmet>
        <title>Library System | Borrowed Books</title>
      </Helmet>

      <h1 className="animate__animated animate__zoomIn text-2xl font-bold mb-6">
        Borrowed Books
      </h1>

      {/* Toggle View Button */}
      <div className="mb-6">
        <button
          onClick={() => setViewMode(viewMode === "table" ? "card" : "table")}
          className="bg-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-lightOrange transition"
        >
          Switch to {viewMode === "table" ? "Card" : "Table"} View
        </button>
      </div>

      {/* Conditionally Render Table or Card View */}
      {borrowedBooks?.length === 0 ? (
        <p className="animate__animated animate__zoomIn text-center">
          You have no borrowed books.
        </p>
      ) : viewMode === "table" ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full animate__animated animate__zoomIn table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300">Title</th>
                <th className="px-4 py-2 border border-gray-300">Category</th>
                <th className="px-4 py-2 border border-gray-300">Borrowed Date</th>
                <th className="px-4 py-2 border border-gray-300">Return Date</th>
                <th className="px-4 py-2 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{book.title}</td>
                  <td className="px-4 py-2 border border-gray-300">{book.category}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(book.borrowedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(book.returnDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      onClick={() => handleReturn(book._id, book.bookId)}
                      className="bg-red-600 text-white py-1 px-4 rounded"
                    >
                      Return Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {borrowedBooks.map((book) => (
            <div
              key={book._id}
              className="animate__animated animate__rotateInDownLeft p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-sm">{book.category}</p>
              <p className="text-sm mt-2">
                <strong>Borrowed on:</strong>{" "}
                {new Date(book.borrowedDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
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
