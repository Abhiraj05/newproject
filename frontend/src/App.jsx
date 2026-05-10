import { useState } from "react";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Main from "./pages/Main";
import LawyersList from "./pages/LawyersList";
import ChatBox from "./pages/ChatBox";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Contact from "./pages/contact";
import ProfileEdit from "./pages/ProfileEdit";
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
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<ProfileEdit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
