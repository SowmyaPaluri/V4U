import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot , sizeInc, deleteDoc} from "firebase/firestore";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
}from './ServiceAddedElements.js';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cards.css';



const AdminUsers = () =>{
  
    const [users, setUsers] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const collectionRef = collection(db, 'users');
    const navigate = useNavigate()

    const routeChange = (email) =>{
        let path = '/bookedservices' + '/' + email; 
        navigate(path);
      }

    const q = query(collectionRef);
    useEffect(() => {
      if(loading) return;
      if (!user) return navigate("/logupmain");
      const getUsers = async () => {
      const data = await getDocs(q);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    getUsers(); 
    }, [user, loading]);
    console.log(users);

    return (
        <div>
          <br/>
          <hr />
          <h1>Users:</h1>
          {users.map((S) => {
            return(
              <>
              <div className = "Container">
          <center>
            <Card className="card" style={{ width: '70rem', padding: 20,}} hover>
              <Row>
                <Col><Card.Img style={{height:'200px', width:'300px'}} variant="top" src="https://assets-prod.sumo.prod.webservices.mozgcp.net/static/default-FFA-avatar.2f8c2a0592bda1c5.png"/></Col>
                <Col xs={8}>
                  <Row style={{paddingTop: 25, paddingLeft: 25}}>
                    <Card.Text>
                      Name: {S.name}<br/>
                      email: {S.email}<br />
                      Location: {S.location}<br />
                      Mobile no: {S.phone}<br />
                    </Card.Text>
                  </Row>
                  <Row>
                    <div className="mb-2"style={{paddingTop: 25}}>
                      
                        <Button variant="success" size="lg" onClick={(e) => routeChange(S.email)}>Check Services</Button>{' '}
                        </div>
                  </Row>
    
                </Col>
              </Row>
            </Card>
          </center>
        </div>
                
              </>  
            );
          })}
          
        </div>
      )
    
}

export default AdminUsers