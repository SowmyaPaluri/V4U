import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "./UserAuthContext";
import firebase from '../../firebase';


const WorkerLogin = () => {
  const routeChange = () =>{ 
    let path = '/home'; 
    navigate(path);
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ phone, setPhone ] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // await signUp(email, password);
      // const userCollectionRef = collection(db, "users");
      // await addDoc(userCollectionRef, {email: email, password: password, state: states.client, services: {service: 'homemaker'}})
      // navigate("/Services");
      await logIn(email, password);
      navigate("/worker2stepverf");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Login</h2>
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
            <Button onClick={routeChange} variant="primary" type="Submit">
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
          
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signupmain">Sign up</Link>
      </div>
    </>
  );
};

export default WorkerLogin;
