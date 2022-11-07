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
}from './BookNowElements.js';

const ServiceForm = () => {
  const routeChange = () =>{ 
    let path = '/servicesadded'; 
    navigate(path);
  }

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
      await addDoc(userCollectionRef, {workerEmail: user?.email, service: service, type: type, salary: salary, location: location})
      alert("Service added succesfully");
      await addDoc(userCollectionRef, {workerEmail: user?.email, service: service, type: type, salary: salary, location: location, active: true, acceptedBy: "", taken: false})
      alert("added succesfully");
    } catch (e) {
      console.log("Error Occured");
    }
};

  return (
    <ServicesContainer id="services">
    <div>
      <br/><br/><center>
      <div className="containerservice">
         <div style={{width: '30%',paddingLeft: "100vw",}} className="p-4 box">
            <h2 className="mb-3">Add Service</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control 
                    required
                    as="select"
                    custom onChange={(e) => changeService( e.target.value)}>
                    <option key={'empty'} value={''}>Select Service</option>
                    <option value="homemaker">Home Maker</option>
                    <option value="eldercare">Elder Care</option>
                    <option value="babycare">Baby Care</option>
                    <option value="healthcare">Health Care</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control 
                    required
                    as="select"
                    custom onChange={(e) => changeType( e.target.value)}>
                    <option key={'empty'} value={''}>Select Service Type</option>
                    <option value="parttime">Part Time</option>
                    <option value="fulltime">Full Time</option>
                </Form.Control>
                
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Control
                    required
                    type="text"
                    placeholder="Salary"
                    onChange={(e) => changeSalary( e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Control
                    required
                    type="text"
                    placeholder="City"
                    onChange={(e) => changeLocation( e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  Book Service
                </Button>
              </div>
            </Form>
          </div>
          
          </div><br></br><br></br></center>
          <center>
            <div style={{width: '30%',paddingLeft: "10vw"}} className="p-4 box">
              <Button onClick={routeChange} variant="primary" type="Submit" size="lg" className="btn btn-success">
                Check Your Service
              </Button>
          </div>
        </center>
    </div>
    </ServicesContainer>
  )
}

export default ServiceForm;