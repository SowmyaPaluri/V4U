import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import WorkerSignupMain from './components/pages/WorkerSignupMain';
import WorkerLoginMain from './components/pages/WorkerLoginMain';
import ClientSignupMain from './components/pages/ClientSignupMain';
import ClientLoginMain from './components/pages/ClientLoginMain';
import AdminLoginMain from './components/pages/ClientLoginMain';
import ServicesShown from './components/pages/ServicesIndex';
import Book from './components/pages/Book';
import AddService from './components/pages/AddService';
import LogupMain from './components/pages/LogupMain';
//import Login from './components/pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/clientsignupmain' element={<ClientSignupMain />} />
          <Route path='/clientloginmain' element={<ClientLoginMain />} />
          <Route path='/workersignupmain' element={<WorkerSignupMain />} />
          <Route path='/workerloginmain' element={<WorkerLoginMain />} />
          <Route path='/adminloginmain' element={<AdminLoginMain />} />
          <Route path='/servicesIndex' element={<ServicesShown />} />
          <Route path='/book' element={<Book />} />
          <Route path='/addservice' element={<AddService />} />
          <Route path='/logupmain' element={<LogupMain />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;