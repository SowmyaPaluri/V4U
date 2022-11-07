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
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cards.css';
import NoMatches from './NoMatches';

const Check = () => {
  var {service, type, loc, email} = useParams();
  console.log(service, type, loc);
  
  const [user, loading, error] = useAuthState(auth);
  var ue = user?.email ? user : undefined;
  const navigate = useNavigate();
  const [matchedWorkers, setMatchedWorkers] = useState([]);
  const [selSer, changeSelSer] = useState([]);
  const [array, changeArray] = useState([]);
  const [docID, changeDocID] = useState(0);
  const [ID, changeID] = useState(0);
  const [size, changeSize] = useState(0);
  const collectionRef = collection(db, 'services');
  // const auth = getAuth();
  // const u = auth.currentUser;
  const q = query(collectionRef, where('service', '==', service), where('type', '==', type), where('location', '==', loc), where('taken', '==', false), where('active', '==', true));
  const qsel = query(collectionRef, where('service', '==', service), where('type', '==', type), where('location', '==', loc), where('acceptedBy', '==', email), where('active', '==', false));
  useEffect(() => {
    if(loading) return;
    if (!user) return navigate("/logupmain");
    const getUsers = async () => {
    const data = await getDocs(q);
    setMatchedWorkers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    const d = await getDocs(qsel);
    changeSelSer(d.docs.map((doc) => ({...doc.data(), id: doc.id})))
  };
  // console.log(u.name)s
  changeSize(selSer.length)
  console.log(selSer);
  getUsers(); 

  }, [user, loading]);

  const change = async () => {
    console.log("changed")
    const userDoc = doc(db, 'users', docID)
    await updateDoc(userDoc, {bookedServices: array})
  }
  const changeService = async (em, t) =>{
    console.log("....")
    console.log(ID)
    const serviceDoc = doc(db, 'services', ID);
    
    await updateDoc(serviceDoc, {acceptedBy: em, taken: t});
    // await updateDoc(serviceDoc, {});
    console.log("cccccc");
  }
  const changeActiveT = async (id, st) =>{
    const matchedDoc = doc(db, 'workers', id)
    await updateDoc(matchedDoc, {active: true})
  }

  const changeActiveServicesT = async (id, st) =>{
    const matchedDoc = doc(db, 'services', id)
    await updateDoc(matchedDoc, {active: true})
  }
  const changeActive = async (id, st) =>{
    console.log("jfahsdfjhsadjhfgjasdshgkjadhsgfjkahsdgkjfhakhfakhds")
    const matchedDoc = doc(db, 'workers', id)
    await updateDoc(matchedDoc, {active: st})
    console.log("active")
  }

  const changeActiveServices = async (id, st) =>{
    const matchedDoc = doc(db, 'services', id)
    await updateDoc(matchedDoc, {active: st})
  }

  const disable = async (email, st) => {
    const workersRef = collection(db, 'services')
    const qw = query(workersRef, where('workerEmail', '==', email));
    onSnapshot(qw, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        changeActiveServices(doc.id, st)
      })
  });
  //   const servicesRef = collection(db, 'services')
  //   const qs = query(servicesRef, where('workerEmail', '==', email), where('service', '==', service), where('type', '==', type), where('location', '==', loc));
  //   onSnapshot(qs, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       if(state == true){
  //         changeActiveServicesT(doc.id, state);
  //         }else{
  //           changeActiveServicesF(doc.id, state);
  //         }
        
  //     })
  // });
  console.log("disabled")
  }

  const assign = async (e, em, taken, d, active, wemail) => {
    // var a = []
    console.log(active);
    const usersRef = collection(db, 'users');
    const servicesRef = collection(db, 'services')
    const qu = query(usersRef, where('email', '==', email));
    const que = query(servicesRef, where('service', '==', service), where('type', '==', type), where('location', '==', loc), where('taken', '==', false), where('active', '==', true));
    const decline = query(servicesRef, where('service', '==', service), where('type', '==', type), where('location', '==', loc));
    onSnapshot(qu, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().bookedServices);
        changeArray(doc.data().bookedServices);
        changeDocID(doc.id)
      })
  });
  for(let i = 0; i < array.length; i++){
    if(array[i]["service"] == service && array[i]["location"] == loc && array[i]["type"] == type){
      array[i]["assignedTo"] = e;
  array[i]["taken"] = taken;
  console.log(array)
    }
  }
  // array[0]["assignedTo"] = e;
  // array[0]["taken"] = taken;
  // console.log(array)
  change()
  
if(d){
onSnapshot(decline, (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    changeID(doc.id)
  })
});
}
else{
  onSnapshot(que, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      changeID(doc.id)
    })
});
}
changeService(em, taken, active);
disable(wemail, active);
console.log("0000000000000000000000000000000")
const qw = query(collection(db, 'workers'), where('email', '==', wemail));
    onSnapshot(qw, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
          changeActive(doc.id, active);
      })
  });

}

  return (
    <div>
      <h1>Selected:</h1>
      {selSer.length == 0 && <NoMatches text = {"Not selected"}/>}
      {selSer.map((S) => {
        return(
          <>
          <div className = "Container">
      <center>
        <Card className="card" style={{ width: '70rem', padding: 20,}} hover>
          <Row>
            <Col><Card.Img style={{height:'200px', width:'300px'}} variant="top" src="https://tse3.mm.bing.net/th?id=OIP.KiY0WJzqZ5wd9vdmXidPgwHaGl&pid=Api&P=0"/></Col>
            <Col xs={8}>
              <Row style={{paddingTop: 25, paddingLeft: 25}}>
                <Card.Text>
                  WorkerName: {S.workerEmail.split('@')[0]}<br/>
                  WorkerEmail: {S.workerEmail}<br/>
                  phone: XXXXXXXXXX<br/>
                service: {S.service}<br />
                 type: {S.type}<br />
                location: {S.location}<br />
                Salary: {S.salary}<br />
                </Card.Text>
              </Row>
              <Row>
                <div className="mb-2"style={{paddingTop: 25}}>
                    <Button variant="danger" size="lg" onClick={() => assign("", "", false, true, true, S.workerEmail)}>Decline</Button>{' '}
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
      <hr />
      <h1>Matches</h1>
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
                <Card.Text>
                  WorkerName: {S.workerEmail.split('@')[0]}<br/>
                service: {S.service}<br />
                 type: {S.type}<br />
                location: {S.location}<br />
                Salary: {S.salary}<br />
                </Card.Text>
              </Row>
              <Row>
                <div className="mb-2"style={{paddingTop: 25}}>
                  {/* {
                  size > ? <div></div> : <div>bye</div>
                  } */}
                    <Button variant="success" size="lg" disabled = {size > 0} onClick={() => assign(S.workerEmail, user?.email, true, false, false, S.workerEmail)}>Accept</Button>{' '}
                    {/* <Button variant="danger" size="lg" onClick={() => assign("", "", false, false, true, S.workerEmail)}>Decline</Button>{' '} */}
                </div>
              </Row>

            </Col>
          </Row>
        </Card>
      </center>
    </div>
          {/* <Cards workerEmail = {S.workerEmail} service = {S.service} type = {S.type} location = {S.location} salary = {S.salary}/> */}
            {/* <br/><br/>
            <h4> service: {S.service}</h4>
            <h4> type: {S.type}</h4>
            <h4>location: {S.location}</h4>
            <h4>Salary: {S.salary}</h4>
            <br /> */}
            {/* <div>
              <div className='row'>
                <div className='col'>
            <button className='btn btn-success' onClick={() => check(user)}>check </button> &nbsp;&nbsp;&nbsp;&nbsp;
            <button className='btn btn-danger' onClick={() => deleteHandler(user)}>Delete</button>
            </div>
              </div>
            </div> */}
          </>  
        );
      })}
      {matchedWorkers.length == 0 && <NoMatches text = {"No Matches Found"}/>}
    </div>
  )
}

export default Check;
