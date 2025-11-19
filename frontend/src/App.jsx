import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Transaction from "./Pages/Transaction";
import NotFoundPage from "./Pages/NotFoundPage";

import { PrivateRoute } from "../utils/PrivateRoute";
import { PublicRoute } from "../utils/PublicRoute";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";

import 'react-loading-skeleton/dist/skeleton.css'

function App() {

  const authUser = Cookies.get('sb_token');
  
  return (
    <>
      {authUser && <Navbar />}

      <Routes>
        {/* Private Pages */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/transaction/:id"
          element={
            <PrivateRoute>
              <Transaction />
            </PrivateRoute>
          }
        />

        {/* Public Pages (can't access if logged in) */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
