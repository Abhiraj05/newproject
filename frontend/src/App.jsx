import { useState } from 'react'
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Main from './pages/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
        <Router>
          <Routes>
           <Route path='/signin' element={<SignIn/>} />
           <Route path='/signup' element={<SignUp/>} />
           <Route path='/' element={<Main/>} />
          </Routes>
        </Router>
    </>
  )
}

export default App
