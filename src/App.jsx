import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import User from "./pages/User.jsx";
import BookmarkedUser from "./pages/BookmarkedUser.jsx";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route path="/user" element={<User />} />
        <Route path="/bookmarkedUser" element={<BookmarkedUser />} />
      </Routes>
    </>
  );
}

export default App;
