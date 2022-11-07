import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot , sizeInc, deleteDoc} from "firebase/firestore";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
}from './BookNowElements.js';

const ServicesAdded = () => {

const [service, changeService] = useState('');
const [type, changeType] = useState('');
const [salary, changeSalary] = useState('');
const [location, changeLocation] = useState('');
const [ change ] = useState("");
const [user, loading, error] = useAuthState(auth);
//const [service, changeService] = useState();
//const [type, changeType] = useState('');
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

function refresh(){
  window.location.reload(false);
}

const submitHandler = (e) =>{
    e.preventDefault();
    addToDB();
    alert()
}
const deleteHandler = async (e) => {
  const servicedoc = doc(db, "services", e.id);
  try{
    await deleteDoc(servicedoc);
  }catch (e){
    console.log(e);
  }
  
}

const check = (u) => {
  var url = "/checkaccepted" + "/" + u.service + "/" + u.type + "/" + u.location + "/" + user?.email;
  // console.log(url)
  navigate(url);
}

const addToDB = async () => {
    const q = query(collection(db, "workers"), where("workerEmail", "==", user?.email));
    const data = await getDocs(q);
    console.log(data);
    const userCollectionRef = collection(db, "workers");

    try{
      
      const userCollectionRef = collection(db, "services");
      await addDoc(userCollectionRef, {workerEmail: user?.email, service: service, type: type, salary: salary, location: location, active: true, acceptedBy: "", taken: false})
      alert("added succesfully");
    } catch (e) {
      console.log("Error Occured");
    }
};

  return (
          
          <ServicesContainer id="services">
          <ServicesWrapper>
                  {services.map((Service) => {
        return(
          <ServicesCard>
            <br/><br/>
            <div style = {{fontSize: '20px'}}>
            Service:    {Service.service}<br/>
            Type:   {Service.type}<br/>
            Expected Salary per month:    {Service.salary}<br/>
            Location:   {Service.location}<br/>
             </div> 
            <br />
            <div>
              <div className='row'>
                <div className='col'>
            <button className='btn btn-success' onClick={() => check(Service)}>Check</button> &nbsp;&nbsp;&nbsp;&nbsp;
            <button className='btn btn-danger' onClick={() => deleteHandler(Service)}>Delete</button>
            </div>
              </div>
            </div>
            </ServicesCard>
        );
      })}
              </ServicesWrapper>
              </ServicesContainer>
    
  )
}

export default ServicesAdded;