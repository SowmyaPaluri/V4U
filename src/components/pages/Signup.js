import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "./UserAuthContext";
import { db } from "../../firebase";
import {collection, addDoc} from 'firebase/firestore';
//import Login from "./Login.js";
import '../../App.css';
//import LoginMain from './LoginMain';

const states = {'client': 2001, 'worker': 2002, 'admin': 2003}
const Signup = () => {
  const [Email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [Password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(Email, Password);
      const userCollectionRef = collection(db, "users");
      await addDoc(userCollectionRef, {email: Email, password: Password, state: states.client, services: {service: 'homemaker'}})
      navigate("/Services");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/loginmain" >Log In</Link>
      </div>
    </>
  );
};

export default Signup;
