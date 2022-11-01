import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
// import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion } from "firebase/firestore";

const ServiceForm = () => {

const [service, setService] = useState('');
const [type, setType] = useState('');
const [salary, setSalary] = useState('');
const [location, setLocation] = useState('');
const [user, loading, error] = useAuthState(auth);
// const admin = require("firebase-admin");
const submitHandler = (e) =>{
    e.preventDefault();
    addToDB();
}
const addToDB = async () => {
    const q = query(collection(db, "workers"), where("email", "==", user?.email));
    const data = await getDocs(q);
    console.log(data);
    const userCollectionRef = collection(db, "workers");

    try{
      
      const userCollectionRef = collection(db, "services");
      await addDoc(userCollectionRef, {workerEmail: user?.email, service: service, type: type, salary: salary, location: location})
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
    <div>
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
           <label>Expected Salary per month:</label>
           <input type = "text" onChange={(e) => setSalary(e.target.value)}></input><br />
           <label>Location:</label>
           <input type = "text" onChange={(e) => setLocation(e.target.value)}></input><br />
           <input type = "submit"></input>
         </form>
         </center>
    </div>
    
  )
}

export default ServiceForm;