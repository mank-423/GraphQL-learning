import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { PrivateRoute } from "../utils/PrivateRoute";
import Transaction from "./Pages/Transaction";
import NotFoundPage from "./Pages/NotFoundPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      }
      />

      <Route path="/transaction/:id" element={
        <PrivateRoute>
          <Transaction />
        </PrivateRoute>
      } />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
