import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./page/login";
import SignUp from "./page/signup";
import Home from "./page/home";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route
        path="/home"
        element={<Home/>}
      />
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />
    </Routes>
  );
}
