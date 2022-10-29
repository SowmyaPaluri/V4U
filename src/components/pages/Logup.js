/*import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './Logup.css'
//import client from './Client.jpeg';
//import admin from './Admin.jpeg';
//import worker from './Worker.jpeg';


const LogUp = () => {
  let navigate = useNavigate(); 
  const ClientrouteChange = () =>{ 
    let path = '/clientsignupmain'; 
    navigate(path);
  }
  const AdminrouteChange = () =>{ 
    let path = '/adminloginmain'; 
    navigate(path);
  }
  const WorkerrouteChange = () =>{ 
    let path = '/workersignupmain'; 
    navigate(path);
  }
  return (
    <div className="logpage" style={{borderRadius:'50%'}}><center>
    &nbsp;&nbsp;&nbsp;
    <Button onClick={ClientrouteChange} variant="primary" type="Submit" size='lg'>Client</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button onClick={WorkerrouteChange} variant="primary" type="Submit" size='lg'>Worker</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <Button onClick={AdminrouteChange} variant="primary" type="Submit" size='lg'>Admin</Button>
    </center>
    </div>

      )
}

export default LogUp*/
import React from 'react';
//import Card from "react-bootstrap/Card";
//import {BrowserRouter as Router, Link} from 'react-router-dom';
import client from './clientig.jpg';
import admin from './adminig.png';
import worker from './Worker.jpeg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const LogUp = () => {
  return (
    <Row>
      <Col>
        <a href="./ClientSignupMain"><img src = {client} height = "250" width="250" alt="client"/></a>
      </Col>
      <Col>
        <a href="./AdminLoginMain"><img src = {admin} height = "250" width="250" alt='admin'/></a>
      </Col>
      <Col>
        <a href="./SignupMain"><img src = {worker} height = "250" width="250" alt='worker'/></a>
      </Col>
    </Row>
    /*<div style={{borderRadius:'50%', verticalAlign:'center'}}><center>
        <br/><br/><br/><br/>
        <a href="./ClientSignupMain"><img src = {client} height = "250" width="250" alt="client"/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="./AdminLoginMain"><img src = {admin} height = "250" width="250" alt='admin'/></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a href="./SignupMain"><img src = {worker} height = "250" width="250" alt='worker'/></a>
    </center>
    </div>*/
  
    
  )
}

export default LogUp