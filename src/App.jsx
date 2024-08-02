/* eslint-disable no-unused-vars */
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  unstable_HistoryRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import Footer from "./Components/Footer";
import Headers from "./Components/Headers";
import Spinners from "./Components/Spinners";
import history from "./history";
import AuthPage from "./Pages/AuthPage/AuthPage";
import HomePage from "./Pages/HomePage/HomePage";
import JobPage from "./Pages/JobPage/JobPage";
import PostJob from "./Pages/PostPage/PostJob";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import MainProfile from "./Pages/ProfilePage/MainProfile";
import MyPostJob from "./Pages/ProfilePage/MyPostJob";
import Application from "./Pages/ProfilePage/Application";
import Signup from "./Components/auth/Signup";
import Login from "./Components/auth/Login";
import NotFound from "./Pages/NotFound";
import ProtectRoute from "./Components/ProtectRoute";
import JobDetails from "./Pages/JobDetails/JobDetails";
import ApplyJob from "./Pages/ApplyJob/ApplyJob";

const App = () => {
  return (
    <div className="app">
      <Router history={history}>
        <Headers />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/job/search" element={<JobPage />} />

          <Route path="/" element={<ProtectRoute />}>
            <Route path="/job/apply/:id" element={<ApplyJob />} />
            <Route path="/mypostjob" element={<MyPostJob />} />
            <Route path="/mypostjob/applicants/:id" element={<Application />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/myprofile" element={<MainProfile />} />
            <Route path="/post" element={<PostJob />} />
          </Route>

          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
