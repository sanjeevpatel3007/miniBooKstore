


import React from "react";
import Home from "./home/Home";
import About from './about/About';
import Contact from './contact/Contact';

import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./course/Courses";
import Signup from "./signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Login from "./login/Login";
import BookDetails from "./components/BookDetails";
import Success from "./success/Success";
import Cancel from "./cancel/Cancel";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Success/>} />
          <Route path="/cancel" element={<Cancel/>} />
          <Route 
          path="/book/:id"
           element={authUser ?  <BookDetails /> : <Navigate to="/login" />} 
           />

        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
