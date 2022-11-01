import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import WorkerSignupMain from './components/pages/WorkerSignupMain';
import WorkerLoginMain from './components/pages/WorkerLoginMain';
import ClientSignupMain from './components/pages/ClientSignupMain';
import ClientLoginMain from './components/pages/ClientLoginMain';
import AdminLoginMain from './components/pages/ClientLoginMain';
import Services from './components/pages/Services';
import Book from './components/pages/Book';
import AddService from './components/pages/AddService';
import Unauthorised from './components/pages/Unauthorised';
import LogupMain from './components/pages/LogupMain';
import Matches from './components/pages/Matches';
//import Login from './components/pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/clientsignupmain' element={<ClientSignupMain />} />
          <Route path='/clientloginmain' element={<ClientLoginMain />} />
          <Route path='/workersignupmain' element={<WorkerSignupMain />} />
          <Route path='/workerloginmain' element={<WorkerLoginMain />} />
          <Route path='/adminloginmain' element={<AdminLoginMain />} />
          <Route path='/services' element={<Services />} />
          <Route path='/book' element={<Book />} />
          <Route path='/addservice' element={<AddService />} />
          <Route path='/unauthorised' element={<Unauthorised />} />
          <Route path='/logupmain' element={<LogupMain />} />
          <Route path='/matches' element={<Matches />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;