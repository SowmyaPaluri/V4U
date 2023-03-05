import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { auth, db, logout } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link,useNavigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
import './Navbar.css';

function Navbar() {
  const [user, loading] = useAuthState(auth);
  const authh = !(!user);
  

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  console.log(authh);
  console.log(1111);
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/logupmain'; 
    navigate(path);
  }
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            V4U &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
              <Link to='/admin' className='nav-links' onClick={closeMobileMenu}>
                admin
              </Link>
            </li>
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li> */}
            <li className='nav-item'>
              <Link
                to='/ServicesIndex'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/book'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Book Service
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/addservice'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Add Service
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/profile'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            </li>
            

            { 
              authh ? <li><Link
                          to='/logupmain'
                          className='nav-links-mobile'
                          onClick={logout}
                        >
                        
                        </Link>
                        
                      </li>
                      :
                        <li>
                          <Link
                          to='/logupmain'
                          className='nav-links-mobile'
                          onClick={closeMobileMenu}
                          >
                          
                          </Link>
                          
                        </li>
              }
           
          </ul>
          <ul>
            {
              authh ? <li>{button && <Button onClick={logout} variant="light" size='md'>LOG OUT</Button>}</li>
                    : <li>{button && <Button onClick={routeChange} variant="light" size='md'>SIGN UP</Button>}</li>
            }
          </ul>
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;