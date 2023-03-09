import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot, arrayRemove, disableNetwork } from "firebase/firestore";
import { useParams } from 'react-router-dom'
// import { getAuth } from "firebase/auth";
// import Cards from './Cards';
import {Form, Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cards.css';

function AdminQueries() {
    const [queries, setQueries] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [ans, setAns] = useState('');
  var ue = user?.email ? user : undefined;
  const navigate = useNavigate();
  const collectionRef = collection(db, 'queries')
  const q = query(collectionRef, where('answered', '==', false));
  useEffect(() => {
    if(loading) return;
    if (!user) return navigate("/logupmain");
    const getUsers = async () => {
    const data = await getDocs(q);
    setQueries(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
  };
  getUsers(); 
  console.log(queries)
  }, [user, loading]);


  const update = async (d) =>{
    const matchedDoc = doc(db, 'queries', d);
    await updateDoc(matchedDoc, {answered: true, answeredBy: user?.email, answer: ans});
  }
  const handleSubmit = (S) =>{
    console.log(S.id);
    update(S.id);
    
  }



  const handleInputChange = (event) => {
    setAns(event.target.value);
  };
  
  return (
    <div>
      <br/>
      <hr />
      <h1>Queries</h1>
      {queries.map((S) => {
        return(
          <>
          <div className = "Container">
     
        <Card className="card" style={{ width: '70rem', padding: 20,}} hover>
          <Row>
              <Row style={{paddingTop: 25, paddingLeft: 25}}>
                {/* <Card.Text> */}
                  Query: {S.query}<br />
                  <Form>
                    <Form.Group controlId="query">
                      <Form.Control as="textarea" rows={2} placeholder="Answer" value={ans} onChange={(e) => setAns(e.target.value)} />
                    </Form.Group><br></br>
                    <Button variant="primary"  onClick={(e) => handleSubmit(S)}>Submit</Button>
                  </Form>
              </Row>

          </Row>
        </Card>

    </div>
            
          </>  
        );
      })}
      
    </div>
  )

}

export default AdminQueries