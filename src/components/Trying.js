import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot, arrayRemove, disableNetwork } from "firebase/firestore";
import { useParams } from 'react-router-dom'
// import { getAuth } from "firebase/auth";
import Cards from './Cards';
import Button from 'react-bootstrap/Button';
import './Profile.css';
import me from './clientig.jpg';

import {Box} from "@mui/material";

import Switch from './Switch';


const Profiles = () => {
const [user, loading, error] = useAuthState(auth);
const [name, setName] = useState("");
const [phone, setPhone] = useState("");;
const [loc, setLoc] = useState("");
const [state, setState] = useState("");
const [age, setAge] = useState("");
const [photo, setPhoto] = useState(null);
const [aadharCard, setAadharCard] = useState(null);
const [panCard, setPanCard] = useState(null);
const [medicertificate, setMediCertificateCard] = useState(null);
const email = user?.email;
const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user ) return navigate("/logupmain");
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, where('email', '==', email));
    console.log(1234);
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
        setName(doc.data().name);
        setPhone(doc.data().phone);
        setLoc(doc.data().location);
        setState(doc.data().state);
        setAge(doc.data().age);
        // setPhoto(doc.data().photo);
        // setAadharCard(doc.data().aadharCard);
        // setPanCard(doc.data().panCard);
        // setMediCertificateCard(doc.data().medicertificate);
        })
    });
    const cR = collection(db, 'workers');
    const qq = query(cR, where('email', '==', email));
    console.log(1234);
    onSnapshot(qq, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setName(doc.data().name);
            setPhone(doc.data().phone);
            setLoc(doc.data().location);
            setState(doc.data().state);
            setAge(doc.data().age);
            // setPhoto(doc.data().photo);
            // setAadharCard(doc.data().aadharCard);
            // setPanCard(doc.data().panCard);
            // setMediCertificateCard(doc.data().medicertificate);
        })
    });
    console.log(name);
  }, [user, loading]);

  const workerActive = async (id, st) =>{
    const matchedDoc = doc(db, 'workers', id)
    await updateDoc(matchedDoc, {active: st})
  }
  const serviceActive = async (id, st) =>{
    const matchedDoc = doc(db, 'services', id)
    await updateDoc(matchedDoc, {active: st})
  }

  const toggle = (state) =>{
    const q = query(collection(db, 'workers'), where('email', '==', email))
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            workerActive(doc.id, state)
        })
    });
    const qq = query(collection(db, 'services'), where('workerEmail', '==', email))
    onSnapshot(qq, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            serviceActive(doc.id, state)
        })
    });
  }
  return (
    <div>
              <Box component={'main'} display={'flex'} flexDirection={{xs: 'column', md: 'row'}} alignItems={'center'}
           justifyContent={'center'} minHeight={'calc(100vh - 125px)'}>
         <Box alt={'image of developer'} component={'img'} src={me} width={'350px'} height={'350px'}
              borderRadius={'50%'} p={'0.75rem'} mb={{xs: '1rem', sm: 0}} mr={{xs: 0, md: '2rem'}}/>
         <Box>
            <h1 class="size">{name}</h1><br/><br/>
            
            <h3 class="details">
            {state == 2001 ? <h2><b>Client</b></h2> : <div>Worker</div>}<br/>
            <b>Email : </b>{email}<br/><br/>
            <b>Phone No. : </b>{phone}<br/><br/>
            <b>Location : </b>{loc}<br/><br/>
            <b>Age : </b>{email}<br/><br/>
            </h3>
            {state == 2002 ? 
            <div>
            <h3><b>Disable :</b></h3>
            
            <React.Fragment>
            <Switch label=" " />
            </React.Fragment>
            </div>
            : <></>
}     
         </Box>
      </Box>
    </div>
  )
}

export default Profiles