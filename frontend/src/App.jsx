import { useState } from "react";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Main from "./pages/Main";
import LawyersList from "./pages/LawyersList";
import ChatBox from "./pages/ChatBox";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/lawyers" element={<LawyersList />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
