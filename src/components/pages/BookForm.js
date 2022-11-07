import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import Check from './Check';
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

const BookForm = () => {

const [service, setService] = useState('');
const [type, setType] = useState('');
const [location, setLocation] = useState('');
const [user, loading, error] = useAuthState(auth);
const navigate = useNavigate();
const [BookedServices, changeServices] = useState([]);
const [temp, setTemp] = useState([]);
const booked = [];
// const admin = require("firebase-admin");
console.log(user?.email)
useEffect(() => {
  if (loading) return;
  if (!user ) return navigate("/logupmain");
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef, where('email', '==', user?.email));
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



const deleteHandler = async (e) => {
  const q = query(collection(db, "users"), where("email", "==", user?.email));
  const data = await getDocs(q);
  console.log(data);
  const userCollectionRef = collection(db, "users");
  

  try{
      // console.log(1111);
  
    data.forEach( async (user) => {
      const getUser = doc(db, 'users', user.id);
      // await getWorker.update('{worker.id}/services', FieldValue.arrayUnion({name: 'nikhitha'}), {merge: true});
      await updateDoc(getUser, {
          bookedServices: arrayRemove(e)
      });
      // changeServices(getUser.bookedServices);
      // console.log(bookedServices);
      // console.log(10);
      });
  } catch (e) {
    console.log("error occured");
  }
};



const check = (u) =>{
  // console.logs
  var url = "/check" + "/" + u.service + "/" + u.type + "/" + u.location + "/" + user?.email;
  // console.log(url)
  navigate(url);
  // < Check />
}


const addToDB = async () => {
    const q = query(collection(db, "users"), where("email", "==", user?.email));
    const data = await getDocs(q);
    console.log(data);
    const userCollectionRef = collection(db, "users");
    

    try{
        // console.log(1111);
    
      data.forEach( async (user) => {
        const getUser = doc(db, 'users', user.id);
        // await getWorker.update('{worker.id}/services', FieldValue.arrayUnion({name: 'nikhitha'}), {merge: true});
        await updateDoc(getUser, {
            bookedServices: arrayUnion({service: service, type: type, location: location, assignedTo: "", taken: false})
        });
        // changeServices(getUser.bookedServices);
        // console.log(bookedServices);
        // console.log(10);
        });
    } catch (e) {
      console.log("error occured");
    }
};

  return (
    <div>
      <br/><br/>
        <center>
         <form onSubmit={submitHandler}>
           <label>the service you want:</label> 
           <select onChange={(e) => setService(e.target.value)}>
             <option>select</option>
             <option>HomeMakers</option>
             <option>Cooks</option>
             <option>Gardeners</option>
             <option>Nurses</option>
           </select><br />
           <label>choose the type:</label>
           <select onChange={(e) => setType(e.target.value)}>
             <option>partTime</option>
             <option>fullTime</option>
           </select><br />
           <label>Enter your Location:</label>
           <input type = "text" onChange={(e) => setLocation(e.target.value)}></input><br />
           <input type = "submit"></input>
         </form>
         </center>
         <button onClick={logout}>
           Logout
          </button>
          <ServicesContainer id="services">
          <ServicesWrapper>
              
                  {/* <ServicesIcon src={Icon1}/> */}
                  {/* <ServicesH2>Elder Care</ServicesH2>
                  <ServicesP>There are many different services that can minimize<br/>
                             caregiver burden, extend a senior's independence, improve<br/>
                             their safety and help them successfully age in place.<br/>
                             Our Services include personal hygiene, cleaning, <br/> */}
                             {/* grocery shopping, and managing medications.</ServicesP>
                             
                      */}
                  {temp.map((user) => {
        return(
          <ServicesCard>
            <br/><br/>
            <h4> service: {user.service}</h4>
            <h4> type: {user.type}</h4>
            <br />
            <div>
              <div className='row'>
                <div className='col'>
            <button className='btn btn-success' onClick={() => check(user)}>check </button> &nbsp;&nbsp;&nbsp;&nbsp;
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
            <h1> service: {user.service}</h1>
            <h1> type: {user.type}</h1>
          </div>
        );
      })}
    
    </div>
    
  )
}

export default BookForm;