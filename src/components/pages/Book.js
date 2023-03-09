import "firebase/firestore";
import React, { useEffect, useState} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { auth, db, logout } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import UnauthorisedWorker from './UnauthorisedWorker';
import BookForm from "./BookForm";
import ServiceForm from './ServiceForm';
import Navbar from '../NavbarClient';

const Book = () =>{
    <Navbar />
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
              console.log("hellooooo");
              console.log(doc.data().state);
            setState(doc.data().state);
            })
        });
      }, [user, loading]);
console.log(state);
 
    return(
        <div>
            {state == 2002 && <UnauthorisedWorker />}
            {state == 2001 && <BookForm />}
            {/* <h1>ADD</h1> */}
        </div>
    )
}

export default Book;