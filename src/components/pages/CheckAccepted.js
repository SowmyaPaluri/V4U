import React, { useState, useEffect } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
// import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where, updateDoc, doc, addDoc, FieldValue, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";
import { useParams } from 'react-router-dom'
import Cards from './Cards';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cards.css';
import NotAccepted from './NotAccepted';

const CheckAccepted = () => {
  var {service, type, loc, email} = useParams();
  console.log(service, type, loc);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [matchedWorkers, setMatchedWorkers] = useState([])
  const [array, changeArray] = useState([])
  const [docID, changeDocID] = useState(0)
  const [ID, changeID] = useState(0)

  const collectionRef = collection(db, 'services');
  const q = query(collectionRef, where('workerEmail', '==', email), where('service', '==', service), where('type', '==', type), where('location', '==', loc), where('taken', '==', true));
  useEffect(() => {
    if(loading) return;
    if (!user) return navigate("/logupmain"); 
    const getUsers = async () => {
    const data = await getDocs(q);
    setMatchedWorkers(data.docs.map((doc) => (
        {...doc.data(), id: doc.id}))
        )
  };
  getUsers(); 
  console.log(matchedWorkers);
  }, [user, loading]);
console.log(matchedWorkers.length)
  return (
    <div>
        
      {matchedWorkers.map((S) => {
        return(
          <>
          <div className = "Container">
      <center>
        <Card className="card" style={{ width: '70rem', padding: 20,}} hover>
          <Row>
            <Col><Card.Img style={{height:'200px', width:'300px'}} variant="top" src="https://tse3.mm.bing.net/th?id=OIP.KiY0WJzqZ5wd9vdmXidPgwHaGl&pid=Api&P=0"/></Col>
            <Col xs={8}>
              <Row style={{paddingTop: 25, paddingLeft: 25}}>
                <Card.Text style={{textAlign:'center',fontSize:20}}>
                Your Service is accepted by {S.acceptedBy.split('@')[0]}<br />
                ClientEmail: {S.acceptedBy}<br />
                Mobile Number: XXXXXXXXXX<br />
                service: {S.service}<br />
                 type: {S.type}<br />
                location: {S.location}<br />
                Salary: {S.salary}<br />
                
                </Card.Text>
              </Row>
              {/* <Row>
                <div className="mb-2"style={{paddingTop: 25}}>
                    <Button variant="success" size="lg" onClick={() => assign(S.workerEmail, user?.email)}>Accept</Button>{' '}
                    <Button variant="danger" size="lg" onClick={() => assign("", "")}>Decline</Button>{' '}
                </div>
              </Row> */}

            </Col>
          </Row>
        </Card>
      </center>
    </div>
          </>  
        );
      })}
      {matchedWorkers.length == 0 && <NotAccepted  />}
    </div>
  )
}

export default CheckAccepted;
