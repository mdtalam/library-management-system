import { createBrowserRouter } from "react-router-dom";
import CategoryBooks from "../Component/CategoryBooks";
import DetailsBook from "../Component/detailsBook";
import ErrorPage from "../Component/ErrorPage";
import Login from "../Component/Login";
import Register from "../Component/Register";
import UpdateBook from "../Component/UpdateBook";
import MainLayout from "../Layout/MainLayout";
import AddBook from "../Pages/AddBook";
import AllBooks from "../Pages/AllBooks";
import BorrowedBooks from "../Pages/BorrowedBooks";
import Home from "../Pages/Home";
import PrivetRoute from "./PrivetRoute";

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
        element: (
          <PrivetRoute>
            <AllBooks></AllBooks>
          </PrivetRoute>
        ),
      },
      {
        path: "/update-book/:bookId",
        element: (
          <PrivetRoute>
            <UpdateBook></UpdateBook>
          </PrivetRoute>
        ),
      },
      {
        path: "/add-book",
        element: (
          <PrivetRoute>
            <AddBook></AddBook>
          </PrivetRoute>
        ),
      },
      {
        path: "/borrowed-books",
        element: (
          <PrivetRoute>
            <BorrowedBooks></BorrowedBooks>
          </PrivetRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/category/:category",
        element: <CategoryBooks></CategoryBooks>,
      },
      {
        path: "details/:bookId",
        element: (
          <PrivetRoute>
            <DetailsBook></DetailsBook>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
