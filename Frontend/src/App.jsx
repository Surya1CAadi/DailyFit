import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./pages/Root.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import ProfilePage, { loadBookings } from "./pages/ProfilePage.jsx";
import ErrorPageOwner from "./pages/ErrorPageOwner.jsx";
import ForgotPasswordUser from "./pages/ForgotPasswordUser.jsx";
import ForgotPasswordUserReset from "./pages/ForgotPasswordUserReset.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "signup",
          element: <SignupPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "contactuspage",
          element: <ContactUsPage />,
        },
        {
          path: "profilePage",
          element: <ProfilePage />,
          loader: loadBookings,
        },
        {
          path: "forgotPassword",
          element: <ForgotPasswordUser />,
        },
        {
          path: "forgotPassword/:token",
          element: <ForgotPasswordUserReset />,
        },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer
        // theme={"dark"}
        position="top-right"
        autoClose="1000"
        closeOnClick="true"
        transition={Zoom}
        draggable="true"
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
