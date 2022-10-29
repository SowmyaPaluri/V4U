//import { Firestore } from 'firebase/firestore';
//import firebase from 'firebase/compat/app';
// import firebase from "firebase/app";
import "firebase/firestore";
import React, { useEffect, useState} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const AddService = () =>{
    const [user, loading] = useAuthState(auth);
    //const [type, setType] = useState([]);
    //const [state, setState] = useState('');
    const navigate = useNavigate();
    //const [users, setUsers] = useState([]);
    const email = user ? user?.email: 'undefined';
    const collectionRef = collection(db, 'users');
    useEffect(() => {
        if (loading) return;
        if (!user ) return navigate("/loginmain");
        const q = query(collectionRef, where('email', '==', email));
        console.log(1234);
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
            console.log(doc.data().state);
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
console.log("out");
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
            <h1>ADD</h1>
        </div>
    )
}

export default AddService;