import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from './Navbar'
import Users from './Users'
import UserCreate from "./UserCreate"
import UserUpdate from "./UserUpdate"

export default function App() {
  return (
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/create' element={<UserCreate />} />
          <Route path='/update/:id' element={<UserUpdate />} />
        </Routes>
      </div>
  );
}