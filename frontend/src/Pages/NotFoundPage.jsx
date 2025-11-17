import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      
      <h1 className="text-8xl font-bold text-white animate-bounce">
        404
      </h1>

      <p className="text-xl text-white mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFoundPage;
