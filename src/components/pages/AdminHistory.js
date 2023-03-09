import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import Navbar from '../NavbarAdmin';
const AdminHistory = () => {
  <Navbar />
  const navigate = useNavigate();
  const toBookingHistory = () =>{
    let path = '/bookingHistory'; 
    navigate(path);
  }
  const toWorkersHistory = () =>{
    let path = '/workersHistory'; 
    navigate(path);
  }
  const toUsersHistory = () =>{
    let path = '/usersHistory'; 
    navigate(path);
  }

  return (
    <div>
      <br></br>
      <button type = "submit" onClick={toBookingHistory}>Booking History</button><br></br><br></br><br></br>
      <button type = "submit" onClick={() => toWorkersHistory()}>Workers History</button><br></br><br></br><br></br>
      <button type = "submit" onClick={() => toUsersHistory()}>Users History</button><br></br>
    </div>
  )
}

export default AdminHistory