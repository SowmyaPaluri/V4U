import React, { useState, useEffect } from 'react';
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import {BookServices} from "./BookedServices";
import Check from './Check';
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP
}from './BookNowElements.js';

import { useParams } from 'react-router-dom'
const BookedService = () => {

//const [service, setService] = useState('');
const [service, changeService] = useState();
const [type, changeType] = useState('');
const [ change ] = useState("");
//const [type, setType] = useState('');
const [location, setLocation] = useState('');
const [user, loading, error] = useAuthState(auth);
const navigate = useNavigate();
const [BookedServices, changeServices] = useState([]);
const [temp, setTemp] = useState([]);
const booked = [];
var {email} = useParams();

useEffect(() => {
  if (loading) return;
  if (!user ) return navigate("/logupmain");
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('email', '==', email));
  console.log(1234);
  onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().bookedServices);
        setTemp(doc.data().bookedServices);
      changeServices(temp);
      })
      // console.log(temp);
  });
}, [user, loading]);

const submitHandler = (e) =>{
    e.preventDefault();
    console.log(temp);
    addToDB();
}

const addToHistory = async (e) =>{
  const historyCollectionRef = collection(db, "userHistory");
  const date = new Date();
  await addDoc(historyCollectionRef, {client: user?.email, type: e.type, location: e.location, service: e.service, status:"deleted", time: date});
  console.log("added to istory");
}

const deleteHandler = async (e) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const data = await getDocs(q);
  console.log(data);
  const userCollectionRef = collection(db, "users");
  

  try{  
    data.forEach( async (user) => {
      const getUser = doc(db, 'users', user.id);
      await updateDoc(getUser, {
          bookedServices: arrayRemove(e)
      });
      });
      addToHistory(e)
  } catch (e) {
    console.log("error occured");
  }
};

const check = (u) =>{
  var url = "/check" + "/" + u.service + "/" + u.type + "/" + u.location + "/" + email;
  navigate(url);
}




const addToDB = async () => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const data = await getDocs(q);
    console.log(data);
    const userCollectionRef = collection(db, "users");
    

    try{
    
      data.forEach( async (user) => {
        const getUser = doc(db, 'users', user.id);
        await updateDoc(getUser, {
            bookedServices: arrayUnion({service: service, type: type, location: location})
        });
        });
    } catch (e) {
      console.log("error occured");
    }
};

  return (
    <div>
      <br></br>
          <ServicesContainer id="services">
          <ServicesWrapper>
                  {temp.map((user) => {
        return(
          <ServicesCard>
            <br/><br/>
            <h4> Service: {user.service}</h4>
            <h4> Type: {user.type}</h4>
            <br />
            <div>
              <div className='row'>
                <div className='col'>
            <button className='btn btn-success' onClick={() => check(user)}>Check </button> &nbsp;&nbsp;&nbsp;&nbsp;
            <button className='btn btn-danger' onClick={() => deleteHandler(user)}>Delete</button>
            </div>
              </div>
            </div>
            </ServicesCard>
        );
      })}
              {/* </ServicesCard> */}
              </ServicesWrapper>
              </ServicesContainer>
        {temp.map((user) => {
        return(
          <div>
            
          </div>
        );
      })}
    </div>
    
  )
}

export default BookedService;