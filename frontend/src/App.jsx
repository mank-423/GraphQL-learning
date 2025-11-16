import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { PrivateRoute } from "../utils/PrivateRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* If route doesn't exist */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
