import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
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
}from './BookNowElements.js';

const ServiceForm = () => {

const [service, setService] = useState('');
const [type, setType] = useState('');
const [salary, setSalary] = useState('');
const [location, setLocation] = useState('');
const [user, loading, error] = useAuthState(auth);
const navigate = useNavigate();
const [services, setServices] = useState([]);
const collectionRef = collection(db, 'services');

  const q = query(collectionRef, where('workerEmail', '==', user?.email));
  useEffect(() => {
    if(loading) return;
    if (!user) return navigate("/logupmain");
    const getUsers = async () => {
    const data = await getDocs(q);
    setServices(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  };
  getUsers(); 
  }, [user, loading]);
  console.log(services);

const [users, setUsers] = useState([]);
const userCollectionRef = collection(db, "users");
useEffect(() => {
  if (loading) return;
  if (!user ) return navigate("/logupmain");
  const collectionRef = collection(db, 'services');
  const q = query(collectionRef, where('workerEmail', '==', user?.email));
  console.log(1234);
  onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().bookedServices);
        setServices(doc.data());
        console.log(doc.data().workerEmail);
      // changeServices(temp);
      })
      // console.log(temp);
  });
  console.log(services);
}, [user, loading]);


function refresh(){
  window.location.reload(false);
}


const submitHandler = (e) =>{
    e.preventDefault();
    addToDB();
}
const deleteHandler = async (e) => {
  const servicedoc = doc(db, "services", e.id);
  try{
    await deleteDoc(servicedoc);
  }catch (e){
    console.log(e);
  }
  
}

const addToDB = async () => {
    const q = query(collection(db, "workers"), where("workerEmail", "==", user?.email));
    const data = await getDocs(q);
    console.log(data);
    const userCollectionRef = collection(db, "workers");

    try{
      
      const userCollectionRef = collection(db, "services");
      await addDoc(userCollectionRef, {workerEmail: user?.email, service: service, type: type, salary: salary, location: location})
      alert("Service added succesfully");
    } catch (e) {
      console.log("error occured");
    }
};

  return (
    <div>
        <center>
         <form onSubmit={submitHandler}>
           <label>The service you want to work for:</label> 
           <select onChange={(e) => setService(e.target.value)}>
             <option>select</option>
             <option>Elder Care</option>
             <option>Baby Care</option>
             <option>Health Care</option>
             <option>Home Maid</option>
           </select><br />
           <label>choose the type:</label>
           <select onChange={(e) => setType(e.target.value)}>
             <option>Part Time</option>
             <option>Full Time</option>
           </select><br />
           <label>Expected Salary per month:</label>
           <input type = "text" onChange={(e) => setSalary(e.target.value)}></input><br />
           <label>Location:</label>
           <input type = "text" onChange={(e) => setLocation(e.target.value)}></input><br />
           <input type = "submit"></input>
         </form>
         </center>
         <ServicesContainer id="services">
          <ServicesWrapper>
                  {services.map((Service) => {
        return(
          <ServicesCard>
            <br/><br/>
            <div style = {{fontSize: '18px'}}>
            service: {Service.service}<br/>
            type: {Service.type}<br/>
            expected salary/m: {Service.salary}<br/>
            location: {Service.salary}<br/>
             </div> 
            <br />
            <div>
              <div className='row'>
                <div className='col'>
            <button className='btn btn-success'>check </button> &nbsp;&nbsp;&nbsp;&nbsp;
            <button className='btn btn-danger' onClick={() => deleteHandler(Service)}>Delete</button>
            </div>
              </div>
            </div>
            </ServicesCard>
        );
      })}
              </ServicesWrapper>
              </ServicesContainer>
    </div>
    
  )
}

export default ServiceForm;