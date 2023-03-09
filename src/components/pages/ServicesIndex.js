import React from 'react'
import Icon1 from '../pages/images/i4.jpeg';
import Icon2 from '../pages/images/i2.jpg';
import Icon3 from '../pages/images/i1.webp';
import Icon4 from '../pages/images/i3.jpeg';
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP
}from './ServicesElements.js'
import Navbar from '../NavbarHome';

const ServicesIndex = () => {

  return (
      <>
      <Navbar />
      <ServicesContainer id="services">
          <ServicesH1>Our Services</ServicesH1>
          <ServicesWrapper>
              <ServicesCard>
                  <ServicesIcon src={Icon1}/>
                  <ServicesH2>Elder Care</ServicesH2>
                  <ServicesP>There are many different services that can minimize<br/>
                             caregiver burden, extend a senior's independence, improve<br/>
                             their safety and help them successfully age in place.<br/>
                             Our Services include personal hygiene, cleaning, <br/>
                             grocery shopping, and managing medications.</ServicesP>
              </ServicesCard>
              <ServicesCard>
                  <ServicesIcon src={Icon2}/>
                  <ServicesH2>Baby Care</ServicesH2>
                  <ServicesP> Baby care services  for new-borns & kids entails hiring<br/>
                              the best possible nanny or a babysitter who can dedicate<br/>
                              herself towards the care of your little ones. Our services<br/>
                              personal hygiene, cleaning, feeding and managing medications.
                              </ServicesP>
              </ServicesCard>
              <ServicesCard>
                  <ServicesIcon src={Icon3}/>
                  <ServicesH2>Health Care</ServicesH2>
                  <ServicesP>Health care Services include adult nursing, specialist<br/>
                             long-term condition nursing, therapy services, preventive<br/>
                             services and child health services including health <br/>
                             visiting and school nursing.</ServicesP>
              </ServicesCard>
              <ServicesCard>
                  <ServicesIcon src={Icon4}/>
                  <ServicesH2>Home Maid</ServicesH2>
                  <ServicesP>Home Maid Services include housecleaning, that is,<br/>
                             disposing of rubbish, cleaning dirty surfaces, dusting,<br/>
                             and vacuuming. It may also involve some outdoor chores,<br/>
                             such as removing leaves from rain gutters, washing windows,<br/>
                             and sweeping doormats.</ServicesP>
              </ServicesCard>      
          </ServicesWrapper>
      </ServicesContainer>
       </>
  )
}

export default ServicesIndex
