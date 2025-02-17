import 'animate.css';
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../Component/Loading";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading, updateUserProfile, setUser } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table' view
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility state
  const [name, setName] = useState(""); // State for name input
  const [photoURL, setPhotoURL] = useState(""); // State for photoURL input
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        const fetchBorrowedBooks = async () => {
          setLoadingBooks(true);
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
            setLoadingBooks(false);
          }
        };
        fetchBorrowedBooks();
      } else {
        navigate("/login");
      }
    }
  }, [user, loading, navigate, axiosSecure]);

  if (loading || loadingBooks) {
    return <Loading />;
  }

  const handleToggleView = () => {
    setViewMode((prevMode) => (prevMode === "card" ? "table" : "card"));
  };

  const handleOpenModal = () => {
    setName(user?.displayName || ""); // Set initial name value
    setPhotoURL(user?.photoURL || ""); // Set initial photoURL value
    setModalOpen(true); // Open modal
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });
      setUser({ ...user, displayName: name, photoURL: photoURL }); // Update user context
      Swal.fire({
        title: "Success!",
        text: "Profile updated successfully.",
        icon: "success",
        confirmButtonText: "Close",
      });
      setModalOpen(false); // Close modal after success
    } catch (error) {
      console.error("Profile update error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile. Please try again later.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[104px] animate__animated animate__zoomIn">
    <Helmet>
        <title>Library system | My Profile</title>
      </Helmet>
      <h2 className="text-3xl text-center font-bold mb-6">My Profile</h2>

      {/* User Info Section */}
      <div className="flex flex-col justify-center items-center space-x-6 shadow-xl p-6 rounded-lg">
        <img
          referrerPolicy="no-referrer"
          src={user?.photoURL || "https://via.placeholder.com/100"}
          alt="User Avatar"
          className="w-48 h-48 rounded-full border-4 border-orange"
        />
        <div className='text-center'>
          <h3 className="text-2xl font-semibold text-dark-gray">
            {user?.displayName || "User Name"}
          </h3>
          <p className="text-lg">{user?.email}</p>
        </div>
        {/* Edit Profile Button */}
      <div className="mt-10">
        <button
          onClick={handleOpenModal} // Open modal when clicked
          className="bg-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-dark transition"
        >
          Edit Profile
        </button>
      </div>
      </div>

      {/* Toggle View Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleToggleView}
          className="bg-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-dark transition"
        >
          Switch to {viewMode === "card" ? "Table" : "Card"} View
        </button>
      </div>

      {/* Borrowed Books Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Borrowed Books</h3>

        {/* Conditionally Render Table or Card View */}
        {viewMode === "card" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowedBooks.map((book) => (
              <div
                key={book.id}
                className="shadow-lg p-4 rounded-lg border border-gray-300 animate__animated animate__zoomIn"
              >
                <h4 className="text-xl font-semibold text-orange mb-2">
                  {book.title}
                </h4>
                <p>Author: {book.category}</p>
                <p>Borrowed Date: {new Date(book.borrowedDate).toLocaleDateString()}</p>
                <p>Return Date: {book.returnDate}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg animate__animated animate__zoomIn">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Borrowed Date</th>
                  <th className="px-4 py-2 text-left">Return Date</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book) => (
                  <tr key={book.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{book.title}</td>
                    <td className="px-4 py-2">{book.category}</td>
                    <td className="px-4 py-2">{new Date(book.borrowedDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{book.returnDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 mx-4 rounded-lg w-96">
            <h3 className="text-2xl font-semibold text-dark-gray mb-4">Edit Profile</h3>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter image URL"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalOpen(false)} // Close modal
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileUpdate} // Update profile
                className="px-6 py-2 bg-orange text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
