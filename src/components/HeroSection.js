import React from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import { Button } from 'react-bootstrap';
import './HeroSection.css';

function HeroSection() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/signupmain'; 
    navigate(path);
  }
  return (
    <div className='hero-container'>
      <h1 className='greentext'>WE FOR YOU</h1>
      <p className="line1">Welcome to Our Home Care Services!!</p>
      <div className="line2">Our Services include ElderCare, BabyCare, Maids Service, Elder and Baby HealthCare Services</div><br></br>
      <div className='hero-btns'>
        <Button onClick={routeChange}
          className='btns'
          variant="outline-light"
          size="lg"
        >
          <b>GET STARTED</b>
        </Button>
        
      </div>
    </div>
  );
}

export default HeroSection;
