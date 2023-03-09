import "firebase/firestore";
import React, { useEffect, useState} from 'react';
import {collection, query, where, onSnapshot} from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import UnauthorisedClient from './UnauthorisedClient';
import ServiceForm from './ServiceForm';
import NeedToAccept from "./NeedToAccept";

const AddService = () =>{
    const [user, loading] = useAuthState(auth);
    const [type, setType] = useState([]);
    const [state, setState] = useState('');
    const [acceptedByAdmin, changeAcceptedByAdmin] = useState(false);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const email = user ? user?.email: 'undefined';
    
    useEffect(() => {
        
        if (loading) return;
        if (!user ) return navigate("/logupmain");
        const cR = collection(db, 'workers');
        const qq = query(cR, where('email', '==', email));
        console.log(1234);
        onSnapshot(qq, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
            changeAcceptedByAdmin(doc.data().acceptedByAdmin);
            })
        });

      }, [user, loading]);

    console.log(state);
    console.log(acceptedByAdmin)
    console.log("-------------------------------");
    if(!acceptedByAdmin){
        return(
            <h1>Your application is still in process, You can't add services until your application gets accepted</h1>
        )
    }
    else{
    return(
        <div>
            <ServiceForm />
        </div>
    )
    }
}

export default AddService;