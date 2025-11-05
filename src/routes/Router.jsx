import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import Skills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Profile from "../components/Profile/Profile";
import Experience from "../components/Experience/Experience";
import Blogs from "../components/Blogs/Blogs";
import About from "../components/Seetings/About/About";
import Contact from "../components/Seetings/Contact/Contact";
import AddColorAndLogo from "../components/Seetings/AddColorAndLogo/AddColorAndLogo";
import Login from "../components/Auth/Login/Login";
import ForgatePassword from "../components/Auth/ForgatePassword/ForgatePassword";
import VerifyPass from "../components/Auth/VerifyPass/VerifyPass";
import NewPass from "../components/Auth/Newpass/NewPass";
import EditProject from "../components/Projects/EditProject";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Login></Login>,
  },
  {
    path: "/forgate-password",
    element: <ForgatePassword></ForgatePassword>,
  },
  {
    path: "/varification",
    element: <VerifyPass></VerifyPass>,
  },
  {
    path: "/new-password",
    element: <NewPass />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/skills",
        element: <Skills />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/projects/:id",
        element: <EditProject />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/experience",
        element: <Experience />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/settings/about-us",
        element: <About></About>,
      },
      {
        path: "/settings/contact-us",
        element: <Contact />,
      },
      {
        path: "/settings/add-logo-and-color",
        element: <AddColorAndLogo />,
      },
    ],
  },
]);
