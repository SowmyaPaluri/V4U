import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1 style="color:blue;">WE FOR YOU</h1>
      <p>Welcome to Our Home Care Services!!</p>
      <div class="line">Our Services include ElderCare, BabyCare, Maids Service, Elder and Baby HealthCare Services</div><br></br>
      <div className='hero-btns'>
        <Button
          className='btns'
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
