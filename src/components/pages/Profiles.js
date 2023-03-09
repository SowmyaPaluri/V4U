import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { query, collection, where, updateDoc, doc, onSnapshot } from "firebase/firestore";
import Button from 'react-bootstrap/Button';
import './Profile.css';
import {Box} from "@mui/material";
import { useParams } from 'react-router-dom'

const Profiles = () => {


  const [user, loading, error] = useAuthState(auth);
  const email = user?.email;
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newState, setNewState] = useState("");
  const [docId, setDocId] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/logupmain");

    if (!user) return navigate("/logupmain");

    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, where('email', '==', email));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
      querySnapshot.forEach((doc) => {
        setName(doc.data().name);
        setPhone(doc.data().phone);
        setState(doc.data().state);
        setDocId(doc.id);
      })
        setDocId(doc.id);
      })
    });


    const cR = collection(db, 'workers');
    const qq = query(cR, where('email', '==', email));
    onSnapshot(qq, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setName(doc.data().name);
        setPhone(doc.data().phone);
        setDocId(doc.id);
        setState(doc.data().state);
      })
      querySnapshot.forEach((doc) => {
        setName(doc.data().name);
        setPhone(doc.data().phone);
        setDocId(doc.id);
        setState(doc.data().state);
      })
    });
  }, [user, loading]);

  const workerActive = async (id, st) => {
    const matchedDoc = doc(db, 'workers', id)
    await updateDoc(matchedDoc, { active: st })
    await updateDoc(matchedDoc, { active: st })
  }

  const serviceActive = async (id, st) => {

  const serviceActive = async (id, st) => {
    const matchedDoc = doc(db, 'services', id)
    await updateDoc(matchedDoc, { active: st })
    await updateDoc(matchedDoc, { active: st })
  }
  // const toggle = (state) => {
  //   const q = query(collection(db, 'workers'), where('email', '==', email))
  //   onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       workerActive(doc.id, state)
  //     })
  //     querySnapshot.forEach((doc) => {
  //       workerActive(doc.id, state)
  //     })
  //   });


    // const qq = query(collection(db, 'services'), where('workerEmail', '==', email))
    // onSnapshot(qq, (querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     serviceActive(doc.id, state)
    //   })
    //   querySnapshot.forEach((doc) => {
    //     serviceActive(doc.id, state)
    //   })
    // });
  }
console.log(docId);
const handleFormSubmit = async (event) => {
  event.preventDefault();
  if (state == 2001){
    const userRef = doc(db,'users',docId);
    await updateDoc(userRef, {
      name: newName,
      phone: newPhone
    }).then(() => {
      console.log("User updated successfully");
      setName(newName);
      setState(newState);
      setPhone(newPhone);
      setIsToggled(false);
      setEditMode(false);
    }).catch((error) => {
      console.error("Error updating user: ", error);
    });
  }
  else{
    const userRef = doc(db, 'workers', docId);
    await updateDoc(userRef, {
      name: newName,
      phone: newPhone
    }).then(() => {
      console.log("User updated successfully");
      setName(newName);
      setState(newState);
      setPhone(newPhone);
      setIsToggled(false);
      setEditMode(false);
    }).catch((error) => {
      console.error("Error updating user: ", error);
    });
  }
}
return (
   
  <div>
    {editMode ? (
      <form onSubmit={handleFormSubmit}>
        <label>
          Name:
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
        </label>
        <button type="submit">Save</button>
        <button onClick={() => {
          setIsToggled(false);
          setEditMode(false);
        }}>Cancel</button>
      </form>
      ) : (
        <div>
          <div>
            <Button variant="outline-primary" size="large" className="position-absolute m-3" onClick={() => {
              setIsToggled(true);
              setEditMode(true);
            }}>Edit</Button>
 </div>
        <br /><br /><br />
        <Box>
          <h3>
            <h1 className="size">{name}</h1>
            <br /><br />
            {state == 2001 ? <h2><b>Client</b></h2> : <div>Worker</div>}
            <br />
            <b>Email : </b>{email}<br /><br />
            <b>Phone No. : </b>{phone}<br /><br />
          </h3>
        </Box>
      </div>
    )}
  </div>
  );
  
  }

export default Profiles;


