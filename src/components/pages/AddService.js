import "firebase/firestore";
import React, { useEffect, useState} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import UnauthorisedClient from './UnauthorisedClient';
import ServiceForm from './ServiceForm';
import NeedToAccept from "./NeedToAccept";
import Navbar from '../NavbarWorker'

const AddService = () =>{
    <Navbar />
    const [user, loading] = useAuthState(auth);
    const [type, setType] = useState([]);
    const [state, setState] = useState('');
    const [acceptedByAdmin, changeAcceptedByAdmin] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const email = user ? user?.email: 'undefined';
    
    useEffect(() => {
        console.log("OOOOOOOOOOOOOOOOOO")
        if (loading) return;
        if (!user ) return navigate("/logupmain");
        const collectionRef = collection(db, 'users');
        const q = query(collectionRef, where('email', '==', email));
        console.log(1234);
        console.log("***********")
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
            setState(doc.data().state);
            })
        });
        console.log(":::::::::::::")
        const cR = collection(db, 'workers');
        const qq = query(cR, where('email', '==', email));
        console.log(1234);
        onSnapshot(qq, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
            setState(doc.data().state);
            })
        });
        onSnapshot(qq, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
            changeAcceptedByAdmin(doc.data().acceptedByAdmin);
            })
        });

      }, [user, loading]);

    console.log(state);
    console.log(acceptedByAdmin)
    console.log("-------------------------------");
    if(state == 2002 && !acceptedByAdmin){
        return(
            <h1>Your application is still in process, You can't add services until your application gets accepted</h1>
        )
    }
    else{
    return(
        <div>
            {state == 2001 && <UnauthorisedClient />}
            {state == 2002 && <ServiceForm />}
        </div>
    )
    }
}

export default AddService;