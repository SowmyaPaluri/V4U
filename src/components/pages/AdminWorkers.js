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
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cards.css';


const AdminWorkers = () => {

    const [acceptedWorkers, setAcceptedWorkers] = useState([]);
    const [pendingWorkers, setPendingWorkers] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const collectionRef = collection(db, 'workers');
    const navigate = useNavigate();
    const {workerEmail} = useParams();

    const routeChange = (S) =>{
      navigate(S.email);
    }
    
    
    const q = query(collectionRef, where("acceptedByAdmin", "==", true));
    const q_p = query(collectionRef, where("acceptedByAdmin", "==", false));
    useEffect(() => {
      if(loading) return;
      if (!user) return navigate("/logupmain");
      const getWorkers = async () => {
      const data = await getDocs(q);
      setAcceptedWorkers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    const getPendingWorkers = async () => {
        const data = await getDocs(q_p);
        setPendingWorkers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      };
    getWorkers(); 
    getPendingWorkers();
    }, [user, loading]);
    // console.log(workers);

    const change = (email) =>{
        navigate('/servicesadded' + '/' + email)
    }
    const accept = async(id, st) =>{
        console.log(id)
        const matchedDoc = doc(db, 'workers', id);
        await updateDoc(matchedDoc, {acceptedByAdmin: st})
    }

    return (
        <div>
          <br/>
          <hr />
          <h1>Pending Workers:</h1>
          {pendingWorkers.map((S) => {
            return(
              <>
              <div className = "Container">
          <center>
            <Card className="card" style={{ width: '70rem', padding: 20,}} hover>
              <Row>
                <Col><Card.Img style={{height:'200px', width:'300px'}} variant="top" src="https://cdn0.iconfinder.com/data/icons/energy-industry-1/62/worker_engineer_icon_miner_helmet_builder_workman_man_job-1024.png"/></Col>
                <Col xs={8}>
                  <Row style={{paddingTop: 25, paddingLeft: 25}}>
                    <Card.Text>
                      Name: {S.name}<br/>
                      email: {S.email}<br />
                      Location: {S.location}<br />
                      Mobile no: {S.phone}<br />
                    </Card.Text>
                  </Row>
                  <br></br>
                  <Row>
                    <div className='col'></div>
                    <div className="col ">
                    <Button variant="success" size="lg" onClick={() => accept(S.id, true)}>Accept</Button>{' '}<br></br>
                    </div>
                    <div className="col ">
                        <Button variant="success" size="lg" onClick={() => routeChange(S)}>Details</Button>{' '}
                        </div>    <div className='col'></div>
                  </Row>
    
                </Col>
              </Row>
            </Card>
          </center>
        </div>
                
              </>  
            );
          })}
          <br></br>
        <h1>Workers:</h1>
          {acceptedWorkers.map((S) => {
            return(
              <>
              <div className = "Container">
          <center>
            <Card className="card" style={{ width: '70rem', padding: 20,}} hover>
              <Row>
                <Col><Card.Img style={{height:'200px', width:'300px'}} variant="top" src="https://cdn0.iconfinder.com/data/icons/energy-industry-1/62/worker_engineer_icon_miner_helmet_builder_workman_man_job-1024.png"/></Col>
                <Col xs={8}>
                  <Row style={{paddingTop: 25, paddingLeft: 25}}>
                    <Card.Text>
                      Name: {S.name}<br/>
                      email: {S.email}<br />
                      Location: {S.location}<br />
                      Mobile no: {S.phone}<br />
                    </Card.Text>
                  </Row>
                  <br></br>
                  <Row>
                    {/* <div className='col'></div> */}
                    <div className="col ">
                    <Button className='btn btn-danger'  variant="success" size="lg" onClick={() => accept(S.id, false)}>Decline</Button>{' '}<br></br>
                    </div>
                    <div className="col ">
                        <Button variant="success" size="lg" >Details</Button>{' '}
                        </div>   
                        <div className='col'>
                        <Button variant="success" size="lg" onClick={()=>change(S.email)}>Check</Button>{' '}
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

export default AdminWorkers