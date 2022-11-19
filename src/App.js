/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import {
  unstable_HistoryRouter as Router,
  Route,
  Routes,
  Navigate,
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

const JobDetails = React.lazy(() => import("./Pages/JobDetails/JobDetails"));
const ApplyJob = React.lazy(() => import("./Pages/ApplyJob/ApplyJob"));

const App = () => {
  const allusers = useSelector((state) => state.auth);
  const { userInfo } = allusers;

  let user;
  if (userInfo?.token) {
    user = (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job" element={<JobPage />} />
        <Route path="/job/search/:keyword" element={<JobPage />} />
        <Route path="/job/location/:loc" element={<JobPage />} />
        <Route path="/job/category/:cat" element={<JobPage />} />
        <Route path="/job/jobtype/:type" element={<JobPage />} />
        <Route
          path="/job/location/:loc/job/category/:cat"
          element={<JobPage />}
        />
        <Route
          path="/job/location/:loc/job/jobtype/:type"
          element={<JobPage />}
        />

        <Route
          path="/job/location/:loc/job/search/:keyword/job/category/:cat"
          element={<JobPage />}
        />

        <Route
          path="/job/location/:loc/job/category/:cat/job/search/:keyword"
          element={<JobPage />}
        />

        <Route
          path="/job/location/:loc/job/search/:keyword"
          element={<JobPage />}
        />

        <Route
          path="/job/category/:cat/job/jobtype/:type"
          element={<JobPage />}
        />

        <Route
          path="/job/search/:keyword/job/location/:loc"
          element={<JobPage />}
        />

        <Route
          path="/job/location/:loc/job/search/:keyword"
          element={<JobPage />}
        />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post" element={<PostJob />} />
        <Route path="/mypostjob" element={<MyPostJob />} />
        <Route path="/mypostjob/applicants/:id" element={<Application />} />

        <Route path="/myprofile" element={<MainProfile />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/apply/:id" element={<ApplyJob />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    user = (
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/job" element={<JobPage />} />
        <Route path="/job/search/:keyword" element={<JobPage />} />
        <Route path="/job/location/:loc" element={<JobPage />} />
        <Route path="/job/category/:cat" element={<JobPage />} />
        <Route path="/job/jobtype/:type" element={<JobPage />} />
        <Route
          path="/job/location/:loc/job/category/:cat"
          element={<JobPage />}
        />
        <Route
          path="/job/location/:loc/job/jobtype/:type"
          element={<JobPage />}
        />

        <Route
          path="/job/category/:cat/job/jobtype/:type"
          element={<JobPage />}
        />

        <Route
          path="/job/search/:keyword/job/location/:loc"
          element={<JobPage />}
        />

        <Route
          path="/job/location/:loc/job/search/:keyword"
          element={<JobPage />}
        />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/job/:id" element={<JobDetails />} />

        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <Router history={history}>
        <Headers />
        <Suspense fallback={<Spinners />}>{user}</Suspense>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
