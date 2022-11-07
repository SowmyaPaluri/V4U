import React, { useEffect, useState} from 'react';
import {collection, query, where, onSnapshot, getDocs} from 'firebase/firestore';
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Matches = () => {
    const service = 'HomeMakers';
    const type = 'fullTime';
    const [temp, setTemp] = useState([]);
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const collectionRef = collection(db, 'services');
    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(collectionRef);
        setTemp(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      };
      getUsers(); 
      
      }, []);

      console.log(temp);
  return (
    <div><center><h1>These are the matched worker details for your selected Service</h1></center></div>
  )
}

export default Matches;