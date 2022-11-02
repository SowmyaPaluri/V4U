// // import React, {useState} from 'react'

// // const Services = () => {
// //   const [service, changeService] = useState('')
// //   const [type, changeType] = useState('')
// //   const submitHandler = (e) =>{
// //     e.preventDefault();
// //     console.log(service, type);
// //   }
// //   return (
// //     <div>
// //       <center>
// //         <form onSubmit={submitHandler}>
// //           <label>the service you want:</label> 
// //           <select onChange={(e) => changeService(e.target.value)}>
// //             <option>select</option>
// //             <option>HomeMakers</option>
// //             <option>Cooks</option>
// //             <option>Gardeners</option>
// //             <option>Nurses</option>
// //           </select><br />
// //           <label>choose the type:</label>
// //           <select onChange={(e) => changeType(e.target.value)}>
// //             <option>select</option>
// //             <option>partTime</option>
// //             <option>fullTime</option>
// //           </select><br />
// //           <input type = "submit"></input>
// //         </form>
// //       </center>
// //     </div>
// //   )
// // }

// // export default Services;

// import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
// import { auth, db, logout } from "../../firebase";
// import { query, collection, getDocs, where, updateDoc, doc } from "firebase/firestore";
// import { useForm } from 'react-hook-form';
// function Book() {
//   const [user, loading ] = useAuthState(auth);
//   const [ name ] = useState("");
//   const [ change ] = useState("");
//   const navigate = useNavigate();
//   const [service, changeService] = useState('')
//   const [type, changeType] = useState('')
//   //const [loc, changeLoc] = useState('')
//   //const presentuser = auth.currentUser;
//   const addToDB = async () => {
//       const q = query(collection(db, "users"), where("email", "==", user?.email));
//       const data = await getDocs(q);
//       // change(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
//       // const data = doc.docs[0].data();
//       // console.log(matchedUsers);
//       // setName(data.name);
//       // console.log(123);
//       console.log(data);
//       try{
//         data.forEach( async (user) => {
//           const getUser = doc(db, 'users', user.id);
//           await updateDoc(getUser, {
//           service: service,
//           type: type
//           });
//         });
//         console.log(1234);
//       } catch (e) {
//         console.log("error occured");
//       }
//   };

//   // const updateUser = async (id) =>{
//   //   const userDoc = doc(db, "users", id);
//   //   const newFields = {service: service, type: type};
//   //   await updateDoc(userDoc, newFields);
//   // }
//   useEffect(() => {
//     if (loading) return;
//     if (!user) return navigate("/logupmain");
//     // fetchUserName();
//   }, [user, loading]);

//   const { reset } = useForm();
//   const submitHandler = (e) =>{
//     e.preventDefault();
//     addToDB();
//     console.log(service, type);
//     alert("added successfully");
//     reset()
//     changeService('');
//     changeType('');
//   } 

//   return (
//     <div>
//        <div >
//         Logged in as
//          <div>{name}</div>
//          <div>{user?.email}</div>
//          <center>
//          <form onSubmit={submitHandler}>
//            <label>the service you want:</label> 
//            <select onChange={(e) => changeService(e.target.value)}>
//              <option>select</option>
//              <option>HomeMakers</option>
//              <option>Cooks</option>
//              <option>Gardeners</option>
//              <option>Nurses</option>
//            </select><br />
//            <label>choose the type:</label>
//            <select onChange={(e) => changeType(e.target.value)}>
//              <option>select</option>
//              <option>partTime</option>
//              <option>fullTime</option>
//            </select><br />
//            <label> Enter the Location:</label>
//            <input type = "text" onChange={(e) => change(e.target.value)}></input><br />
//            <input type = "submit"></input>
//          </form>
//          </center>
//          <button onClick={logout}>
//           Logout
//          </button>
//        </div>
//      </div>
//   );
// }
// export default Book;

//import { Firestore } from 'firebase/firestore';
//import firebase from 'firebase/compat/app';
// import firebase from "firebase/app";
import "firebase/firestore";
import React, { useEffect, useState} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { auth, db, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Unauthorised from './Unauthorised';
import BookForm from "./BookForm";
import ServiceForm from './ServiceForm';

const Book = () =>{
    
    const [user, loading] = useAuthState(auth);
    const [state, setState] = useState('');
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const email = user ? user?.email: 'undefined';
    const collectionRef = collection(db, 'users');
    // console.log(user.auth);
    
    useEffect(() => {
        if (loading) return;
        if (!user ) return navigate("/logupmain");
        const collectionRef = collection(db, 'users');
        const q = query(collectionRef, where('email', '==', email));
        console.log(1234);
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
            setState(doc.data().state);
            })
        });
        const cR = collection(db, 'workers');
        const qq = query(cR, where('email', '==', email));
        console.log(1234);
        onSnapshot(qq, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
            setState(doc.data().state);
            })
        });
      }, [user, loading]);
    
    
//     useEffect(() => {
        
//         const getUsers = async () => {
//         const data = await getDocs(q);
//         setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
//         // setType(users[0].state)
//       };
//       getUsers(); 
//   }, []);
console.log(state);
// useEffect(() => {
    // const getUsers = async () => {
    // const data = await getDocs(q);
    // setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    // const q = query(collectionRef, where('email', '==', email));
//   };
//   getUsers(); 
  
//   console.log(1234);
//   onSnapshot(q, (querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//     });
//   });

// }, []);
    // setState(users[0].state);
    // console.log(state);
 
    return(
        <div>
            {state == 2002 && <Unauthorised />}
            {state == 2001 && <BookForm />}
            {/* <h1>ADD</h1> */}
        </div>
    )
}

export default Book;