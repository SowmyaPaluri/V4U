import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import SignupMain from './components/pages/SignupMain';
import LoginMain from './components/pages/LoginMain';
import Services from './components/pages/Services';
import Book from './components/pages/Book';
import AddService from './components/pages/AddService';
import Unauthorised from './components/pages/Unauthorised';
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
          <Route path='/services' element={<Services />} />
          <Route path='/book' element={<Book />} />
          <Route path='/addservice' element={<AddService />} />
          <Route path='/unauthorised' element={<Unauthorised />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
