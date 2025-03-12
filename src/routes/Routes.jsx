import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home/Home";
import AllReviews from "../pages/AllReviews";
import AddReview from "../pages/AddReview";
import MyReviews from "../pages/MyReviews";
import GameWacthList from "../pages/GameWacthList";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";
import ErrorPage from "../components/ErrorPage";
import ReviewDetails from "../pages/ReviewDetails";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("https://game-vibe-server.vercel.app/reviews"),
      },
      {
        path: "/reviews",
        element: (
          <PrivateRoute>
            <AllReviews></AllReviews>
          </PrivateRoute>
        ),
        loader: () => fetch("https://game-vibe-server.vercel.app/reviews"),
      },
      {
        path: "/addReview",
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "/myReviews/:email",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://game-vibe-server.vercel.app/reviews/email/${params.email}`
          ), // Ensure correct param
      },
      {
        path: "/myWatchList/:email",
        element: (
          <PrivateRoute>
            <GameWacthList></GameWacthList>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://game-vibe-server.vercel.app/watchLists/${params.email}`
          ),
      },
      {
        path: "/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/review/:id",
        element: <ReviewDetails></ReviewDetails>,
        loader: ({ params }) =>
          fetch(`https://game-vibe-server.vercel.app/reviews/id/${params.id}`),
      },
    ],
  },
]);
