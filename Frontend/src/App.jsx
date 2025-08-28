import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Root from "./pages/Root.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import GymListingPage, { loadGyms } from "./pages/GymListingPage.jsx";
import GymInfoPage, { loadGymInfo } from "./pages/GymInfoPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import OwnerHomePage, { loadHomePageData } from "./pages/OwnerHomePage.jsx";
import OwnerPastRecord, { getBookings } from "./pages/OwnerPastRecord.jsx";
import OrdersDetail, { getOrderDetails } from "./pages/OrdersDetail.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import PaymentPage from "./pages/paymentPage.jsx";
import GymSignup from "./pages/GymSignup.jsx";
import ProfilePage, { loadBookings } from "./pages/ProfilePage.jsx";
import OwnerRoot from "./pages/OwnerRoot.jsx";
import OwnerLoginPage from "./pages/OwnerLoginPage.jsx";
import ErrorPageOwner from "./pages/ErrorPageOwner.jsx";
import ForgotPasswordUser from "./pages/ForgotPasswordUser.jsx";
import ForgotPasswordUserReset from "./pages/ForgotPasswordUserReset.jsx";
import ForgotPasswordOwner from "./pages/ForgotPasswordOwner.jsx";
import ForgotPasswordOwnerReset from "./pages/ForgotPasswordOwnerReset.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
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
          path: "gymList/:city",
          loader: loadGyms,
          element: <GymListingPage />,
        },
        {
          path: "gymInfo/:gymId",
          loader: loadGymInfo,
          element: <GymInfoPage />,
        },
        {
          path: "pay",
          element: <PaymentPage />,
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
        {
          path: "ordersdetail/:orderId",
          element: <OrdersDetail />,
          loader: getOrderDetails,
        },
      ],
    },
    {
      path: "/owner",
      element: <OwnerRoot />,
      errorElement: <ErrorPageOwner />,
      children: [
        {
          path: "signup",
          element: <GymSignup />,
        },
        {
          path: "login",
          element: <OwnerLoginPage />,
        },
        {
          path: "checkin",
          element: <OwnerHomePage />,
          loader: loadHomePageData,
        },
        {
          path: "pastrecords",
          element: <OwnerPastRecord />,
          loader: getBookings,
        },
        {
          path: "contactus",
          element: <ContactUsPage />,
        },{
          path: "forgotPassword",
          element: <ForgotPasswordOwner/>
        },{
          path: "forgotPassword/:token",
          element: <ForgotPasswordOwnerReset />,
        }
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
