import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
// import { uid } from "uid";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot , sizeInc, deleteDoc} from "firebase/firestore";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP
}from './ServiceAddedElements.js';

const Admin = () => {
  const navigate = useNavigate();
  const toUsers = () =>{
    let path = '/adminUsers'; 
    navigate(path);
  }
  const toQueries = () =>{
    let path = '/adminQueries'; 
    navigate(path);
  }

  const toWorkers = () =>{
    let path = '/adminWorkers'; 
    navigate(path);
  }
  const toHistory = () =>{
    let path = '/adminHistory'; 
    navigate(path);
  }


  return (
    <div>
      <br></br>
      <button type = "submit" onClick={toUsers}>Users</button><br></br><br></br><br></br>
      <button type = "submit" onClick={() => toWorkers()}>Workers</button><br></br><br></br><br></br>
      <button type = "submit" onClick={() => toHistory()}>History</button><br></br><br></br><br></br>
      <button type = "submit" onClick={() => toQueries()}>Queries</button><br></br><br></br><br></br>
    </div>
  )
}

export default Admin;
