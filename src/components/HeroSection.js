import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1 className='greentext'>WE FOR YOU</h1>
      <p className="line1">Welcome to Our Home Care Services!!</p>
      <div className="line2">Our Services include ElderCare, BabyCare, Maids Service, Elder and Baby HealthCare Services</div><br></br>
      <div className='hero-btns'>
        <Button
          className='btns'
          variant="outline-success"
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        
      </div>
    </div>
  );
}

export default HeroSection;
