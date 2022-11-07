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
import BookServices from "./components/pages/BookedServices";
import AddService from './components/pages/AddService';
import UnauthorisedClient from './components/pages/UnauthorisedClient';
import UnauthorisedWorker from './components/pages/UnauthorisedWorker';
import LogupMain from './components/pages/LogupMain';
import Matches from './components/pages/Matches';
import Check from './components/pages/Check';
import CheckAccepted from './components/pages/CheckAccepted';
import ServicesAdded from './components/pages/ServicesAdded';
import Profiles from './components/pages/Profiles';
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
          <Route path='/servicesIndex' element={<ServicesShown />} />
          <Route path='/book' element={<Book />} />
          <Route path='/bookedservices' element={<BookServices />} />
          <Route path='/servicesadded' element={<ServicesAdded />} />
          <Route path='/addservice' element={<AddService />} />
          <Route path='/unauthorisedclient' element={<UnauthorisedClient />} />
          <Route path='/unauthorisedworker' element={<UnauthorisedWorker />} />
          <Route path='/logupmain' element={<LogupMain />} />
          <Route path='/matches' element={<Matches />} />
          <Route path='/profile' element={<Profiles />} />
          {/* <Route path='/logupmain' element={<LogupMain />} />
          <Route path='/matches' element={<Matches />} /> */}
          <Route path='/check/:service/:type/:loc/:email' element={<Check />} />
          <Route path='/checkaccepted/:service/:type/:loc/:email' element={<CheckAccepted />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;