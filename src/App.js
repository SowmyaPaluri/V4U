import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import SignupMain from './components/pages/SignupMain';
import LoginMain from './components/pages/LoginMain';
//import Login from './components/pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signupmain' element={<SignupMain />} />
          <Route path='/loginmain' element={<LoginMain />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
