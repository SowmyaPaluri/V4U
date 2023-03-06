import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot , sizeInc, deleteDoc} from "firebase/firestore";

const WorkersHistory = () => {

    const [history, setHistory] = useState([])
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const collectionRef = collection(db, 'workerHistory');
    const q = query(collectionRef);
    useEffect(() => {
      if(loading) return;
      if (!user) return navigate("/logupmain");
      const getUsers = async () => {
      const data = await getDocs(q);
      setHistory(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getUsers(); 
    }, [user, loading]);
    console.log(history);
    return (
        <div>
          <br/>
          <hr />
          <h1>Worker History:</h1>
          <br></br>
          <table class="table">
            <thead class="thead-dark">
                <tr>
                <th scope="col">Worker</th>
                <th scope="col">Service</th>
                <th scope="col">Type</th>
                <th scope="col">Salary</th>
                <th scope="col">Location</th>
                <th scope="col">Time</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
          {history.map((S) => {
            return(
              <>
              <tr>
      <td>{S.worker}</td>
      <td>{S.service}</td>
      <td>{S.type}</td>
      <td>{S.salary}</td>
      <td>{S.location}</td>
      <td>{S.time.toDate().toString()}</td>
      <td>{S.status}</td>
    </tr>
                
              </>  
            );
          })}
          </tbody>
          </table>
        </div>
      )
    
}

export default WorkersHistory