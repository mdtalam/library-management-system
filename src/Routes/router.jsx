import {
  createBrowserRouter
} from "react-router-dom";
import Login from "../Component/Login";
import Register from "../Component/Register";
import MainLayout from "../Layout/MainLayout";
import AddBook from "../Pages/AddBook";
import AllBooks from "../Pages/AllBooks";
import BorrowedBooks from "../Pages/BorrowedBooks";
import Home from "../Pages/Home";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/all-books",
          element: <AllBooks></AllBooks>,
        },
        {
          path: "/add-book",
          element: <AddBook></AddBook>,
        },
        {
          path: "/borrowed-books",
          element: <BorrowedBooks></BorrowedBooks>,
        },
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/register",
          element: <Register></Register>
        }
      ]
    },
  ]);

  export default router;