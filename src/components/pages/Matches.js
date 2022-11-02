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
    // useEffect(() => {
    //     if (loading) return;
    //     if (!user ) return navigate("/logupmain");
    //     const collectionRef = collection(db, 'services');
    //     const q = query(collectionRef, where('service', '==', service), where('type', '==', type));
    //     console.log(1234);
    //     onSnapshot(q, (querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //         console.log(doc.data.salary);
    //         })
    //     });

    //   }, [user, loading]);
    useEffect(() => {
        const getUsers = async () => {
        const data = await getDocs(collectionRef);
        setTemp(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      };
      getUsers(); 
      
      }, []);

      console.log(temp);
  return (
    <div>matches</div>
  )
}

export default Matches;