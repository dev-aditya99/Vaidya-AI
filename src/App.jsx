import "./App.css";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import AnimateBgBoxes from "./components/animation/AnimateBgBoxes.jsx";
import MainPage from "./pages/main_pages/MainPage.jsx";
import { useAuthContext } from "./context/AuthContext.jsx";
import CommonLoader2 from "./components/loaders/CommonLoader2.jsx";

// Lazy-loaded components
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/auth/Login"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const Logout = lazy(() => import("./pages/auth/Logout"));
const ScanDisease = lazy(() => import("./pages/disease/ScanDisease.jsx"));
const ShowDiseaseDetails = lazy(() =>
  import("./pages/disease/ShowDiseaseDetails.jsx")
);
const SymptomsAnalyzer = lazy(() =>
  import("./pages/disease/SymptomsAnalyzer.jsx")
);
const FindFirstAid = lazy(() => import("./pages/disease/FindFirstAid.jsx"));
const ShowFirstAid = lazy(() => import("./pages/disease/ShowFirstAid.jsx"));

const PageNotFound = lazy(() => import("./pages/home/PageNotFound"));

// ProtectedRoute for guarding routes
const ProtectedRoute = ({ authUser, children }) => {
  return true ? children : <Navigate to="/login" />;
};

function App() {
  // context
  const { authUser } = useAuthContext();

  return (
    <>
      {/* Background animation */}
      <AnimateBgBoxes />

      {/* Main container */}
      <div className="main w-full min-h-screen flex items-center justify-between flex-col relative z-1">
        {/* Suspense fallback */}
        <Suspense
          fallback={
            <div className="w-screen h-screen flex flex-col items-center justify-center gap-1 z-[99999]">
              <CommonLoader2 className="w-6 h-6" />
              <span className="text-xl text-gray-400 font-medium">
                Loading...
              </span>
            </div>
          }
        >
          {/* Application routes */}
          <Routes>
            {/* Main page with nested routes */}
            <Route path="/" element={<MainPage />}>
              <Route
                index
                element={
                  <ProtectedRoute authUser={authUser}>
                    <Home />
                  </ProtectedRoute>
                }
              />

              {/* scan disease  */}
              <Route
                path="scan-disease"
                element={authUser ? <ScanDisease /> : <Navigate to="/" />}
              />

              {/* show disease  */}
              <Route
                path="show-disease-details"
                element={
                  authUser ? <ShowDiseaseDetails /> : <Navigate to="/" />
                }
              />

              {/* symptoms analyzer  */}
              <Route
                path="symptoms-analyzer"
                element={authUser ? <SymptomsAnalyzer /> : <Navigate to="/" />}
              />

              {/* first aid  */}
              <Route
                path="find-first-aid"
                element={authUser ? <FindFirstAid /> : <Navigate to="/" />}
              />

              {/* show first aid  */}
              <Route
                path="show-first-aid"
                element={authUser ? <ShowFirstAid /> : <Navigate to="/" />}
              />

              {/* Catch-all for undefined routes */}
              <Route path="*" element={<PageNotFound />} />
            </Route>

            {/* Public routes */}
            <Route
              path="login"
              element={authUser ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="sign-up"
              element={authUser ? <Navigate to="/" /> : <SignUp />}
            />
            <Route path="logout" element={<Logout />} />
          </Routes>
        </Suspense>

        {/* Toaster notifications */}
        <Toaster />
      </div>
    </>
  );
}

export default App;
