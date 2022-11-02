// import React, {useState} from 'react'

// const Services = () => {
//   const [service, changeService] = useState('')
//   const [type, changeType] = useState('')
//   const submitHandler = (e) =>{
//     e.preventDefault();
//     console.log(service, type);
//   }
//   return (
//     <div>
//       <center>
//         <form onSubmit={submitHandler}>
//           <label>the service you want:</label> 
//           <select onChange={(e) => changeService(e.target.value)}>
//             <option>select</option>
//             <option>HomeMakers</option>
//             <option>Cooks</option>
//             <option>Gardeners</option>
//             <option>Nurses</option>
//           </select><br />
//           <label>choose the type:</label>
//           <select onChange={(e) => changeType(e.target.value)}>
//             <option>select</option>
//             <option>partTime</option>
//             <option>fullTime</option>
//           </select><br />
//           <input type = "submit"></input>
//         </form>
//       </center>
//     </div>
//   )
// }

// export default Services;

import React, { useEffect, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc } from "firebase/firestore";
import { useForm } from 'react-hook-form';
import '../../App.css';
function Book() {
  const [user, loading ] = useAuthState(auth);
  const [ name ] = useState("");
  const [ change ] = useState("");
  const navigate = useNavigate();
  const [service, changeService] = useState();
  const [type, changeType] = useState('');
  const [error, setError] = useState("");
  const [form, setForm] = useState('');
  //const [loc, changeLoc] = useState('')
  //const presentuser = auth.currentUser;
  const addToDB = async () => {
      const q = query(collection(db, "users"), where("email", "==", user?.email));
      const data = await getDocs(q);
      // change(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      // const data = doc.docs[0].data();
      // console.log(matchedUsers);
      // setName(data.name);
      console.log(123);
      console.log(data)
      try{
        data.forEach( async (user) => {
          const getUser = doc(db, 'users', user.id);
          await updateDoc(getUser, {
          service: service,
          type: type
          });
        });
        console.log(1234);
      } catch (e) {
        console.log("error occured");
      }
  };

  // const updateUser = async (id) =>{
  //   const userDoc = doc(db, "users", id);
  //   const newFields = {service: service, type: type};
  //   await updateDoc(userDoc, newFields);
  // }
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/logupmain");
    // fetchUserName();
  }, [user, loading]);

  const { reset } = useForm();

  /*const findFormErrors = () => {
    const { servicename, servicetype, city } = form 
    const newErrors = {} 
    if ( !servicename || servicename === '' ) newErrors.servicename = 'cannot be blank!'
    if ( !servicetype || servicetype === '' ) newErrors.servicetype = 'cannot be blank!' 
    if ( !city || city === '' ) newErrors.comment = 'cannot be blank!' 
  
    return newErrors 
  }*/

  const submitHandler = async (e) =>{
    e.preventDefault();
    addToDB();
    console.log(service, type);
    alert("added successfully");
    reset()
    changeService('');
    changeType('');/*
    const newErrors = findFormErrors()
    if(Object.keys(newErrors).length>0){
      setError(newErrors)
    }else{
      alert("added successfully");
    }*/
    
  } 
  /*const changeService = (field, value) => {
    setForm({
      ...form,
      [field] : value
    })
    if ( !!error[field] ) setError ({
      ...error,
      [field]: null
    })
  }*/

  return (
      <div>
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <div className="containerservice">
         <div style={{width: '30%',paddingLeft: "100vw",}} className="p-4 box">
            <h2 className="mb-3">Select Service</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control 
                    required
                    as="select"
                    custom onChange={(e) => changeService( e.target.value)}>
                    <option key={'empty'} value={''}>Select Service</option>
                    <option value="homemaker">Home Maker</option>
                    <option value="eldercare">Elder Care</option>
                    <option value="babycare">Baby Care</option>
                    <option value="healthcare">Health Care</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control 
                    required
                    as="select"
                    custom onChange={(e) => changeType( e.target.value)}>
                    <option key={'empty'} value={''}>Select Service Type</option>
                    <option value="parttime">Part Time</option>
                    <option value="fulltime">Full Time</option>
                </Form.Control>
                
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Control
                    required
                    type="text"
                    placeholder="City"
                    onChange={(e) => change( e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  Book Service
                </Button>
              </div>
            </Form>
          </div>
          
          </div>
       </div>
       
  );
}
export default Book;

