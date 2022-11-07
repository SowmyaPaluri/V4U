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

// const [users, setUsers] = useState([]);
// const userCollectionRef = collection(db, "users");
// useEffect(() => {
//   if (loading) return;
//   if (!user ) return navigate("/logupmain");
//   const collectionRef = collection(db, 'services');
//   const q = query(collectionRef, where('workerEmail', '==', user?.email));
//   console.log(1234);
//   onSnapshot(q, (querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         // console.log(doc.data().bookedServices);
//         setServices(doc.data());
//         console.log(doc.data().workerEmail);
//       // changeServices(temp);
//       })
//       // console.log(temp);
//   });
//   console.log(services);
// }, [user, loading]);


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
      // data.forEach( async (worker) => {
      //   const getWorker = doc(db, 'workers', worker.id);
      //   // await getWorker.update('{worker.id}/services', FieldValue.arrayUnion({name: 'nikhitha'}), {merge: true});
      //   await updateDoc(getWorker, {
      //       Services: arrayUnion({service: service, type: type, salary: salary})
      //   });
      //   });
        // console.log(getWorker);
        // console.log(9999)
        // await updateDoc(getWorker, {
        // service: service,
        // type: type
        // });
        // getWorker.child('services').ref.push({name: 'nikhitha'});
    // firebase.database().ref('workers/'.concat(worker.id).concat('services')).push({name: 'nikitha'})
    //   });
    } catch (e) {
      console.log("error occured");
    }
};

  return (
          
          <div><br></br>
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
                  {services.map((Service) => {
    // <div>
    //     <center>
    //      <form onSubmit={submitHandler}>
    //        <label>the service you want:</label> 
    //        <select onChange={(e) => setService(e.target.value)}>
    //          <option>select</option>
    //          <option>HomeMakers</option>
    //          <option>Elder Care</option>
    //          <option>Gardeners</option>
    //          <option>Nurses</option>
    //        </select><br />
    //        <label>choose the type:</label>
    //        <select onChange={(e) => setType(e.target.value)}>
    //          <option>partTime</option>
    //          <option>fullTime</option>
    //        </select><br />
    //        <label>Expected Salary per month:</label>
    //        <input type = "text" onChange={(e) => setSalary(e.target.value)}></input><br />
    //        <label>Location:</label>
    //        <input type = "text" onChange={(e) => setLocation(e.target.value)}></input><br />
    //        <input type = "submit"></input>
    //      </form>
    //      </center>
    //      <ServicesContainer id="services">
    //       <ServicesWrapper>
              
    //               {/* <ServicesIcon src={Icon1}/> */}
    //               {/* <ServicesH2>Elder Care</ServicesH2>
    //               <ServicesP>There are many different services that can minimize<br/>
    //                          caregiver burden, extend a senior's independence, improve<br/>
    //                          their safety and help them successfully age in place.<br/>
    //                          Our Services include personal hygiene, cleaning, <br/> */}
    //                          {/* grocery shopping, and managing medications.</ServicesP>
                             
    //                   */}
    //               {services.map((Service) => {
        return(
          <ServicesCard>
            <br/><br/>
            <div style = {{fontSize: '18px'}}>
            service: {Service.service}<br/>
            type: {Service.type}<br/>
            expected salary/m: {Service.salary}<br/>
            location: {Service.location}<br/>
             </div> 
            <br />
            <div>
              <div className='row'>
                <div className='col'>
            <button className='btn btn-success' onClick={() => check(Service)}>check </button> &nbsp;&nbsp;&nbsp;&nbsp;
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

export default ServicesAdded;