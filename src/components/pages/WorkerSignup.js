import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "./UserAuthContext";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import '../../App.css';
const WorkerSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ city, setCity ] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState("");
  const [aadharCard, setAadharCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [aadharCardUploaded, setAadharCardUploaded] = useState(false);
  const [panCardUploaded, setPanCardUploaded] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [mediCertificateCardUploaded, setMediCertificateCardUploaded] = useState(false);
  const [medicertificate, setMediCertificateCard] = useState(null);
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name) {
      setError("Please fill your Name");
      return;
    }
    if (!email) {
      setError("Please fill your Email");
      return;
    }
    if (!password) {
      setError("Please fill your Password");
      return;
    }
    if (!phone) {
      setError("Please fill your Phone Number");
      return;
    }
    if (!age) {
      setError("Please fill your Age");
      return;
    }
    if (!city) {
      setError("Please fill your City");
      return;
    }
    if (!photo) {
      setError("Please upload your Photo in .JPG file");
      return;
    }
    if (!aadharCard) {
      setError("Please upload Aadhar card");
      return;
    }
    if (!panCard) {
      setError("Please upload pan card");
      return;
    }
    try {
      await signUp(email, password);
      const userCollectionRef = collection(db, "workers");
      await addDoc(userCollectionRef, {email: email, state: 2002, active: true, fullTimeCount: 0, partTimeCount: 0, name: name, phone: phone, location: city, age: age, acceptedByAdmin: false})
      navigate("/");
    } catch (err) {
      setError(err.message);
    }

  };
  const inputRef = useRef(null);

  const handleClick = (type) => {
    if (type === "aadhar") {
      inputRef.current.name = "aadhar";
    } else if (type === "pan") {
      inputRef.current.name = "pan";
    }
    else if (type === 'photo') {
      inputRef.current.name = 'photo'
    }
    else if (type === 'medi') {
      inputRef.current.name = 'medi'
    }
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    if (event.target.name === "aadhar") {
      setAadharCard(fileObj);
      setAadharCardUploaded(true);
    } else if (event.target.name === "pan") {
      setPanCard(fileObj);
      setPanCardUploaded(true);
    }
    else if (event.target.name === "medi") {
      setMediCertificateCard(fileObj);
      setMediCertificateCardUploaded(true);
    }
    else if (event.target.name === "photo") {
      setPhoto(fileObj);
      setPhotoUploaded(true);
    }
    
    console.log('fileObj is', fileObj);
    event.target.value = null;
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);

  };

  return (
    <><div>
      
    </div>
      <div className="p-3 box">
        <h2 className="mb-2">Worker Registration</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2" controlId="formBasicName">
            <Form.Control
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Control
          
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicPhone">
            <Form.Control
              type="phone"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicCity">
            <Form.Control
              type="text"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicCity">
            <Form.Control
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicCity">
            <div>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
              {photoUploaded ? (
                <p>Uploaded your Photo in .JPG: <Button variant="success" disabled>
                Uploaded
              </Button></p>
              ) : (
                <p>Upload Your Photo in .JPG:  <Button variant="secondary" onClick={() => handleClick("photo")}>
                Upload
              </Button></p>
              )}
              {!photoUploaded && (
                  <p className="mt-2 text-danger">Please upload your Photo</p>
                )}
            </div>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicCity">
            <div>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
              {aadharCardUploaded ? (
                <p>Uploaded your Aadhar Card: <Button variant="success" disabled>
                Uploaded
              </Button></p>
              ) : (
                <p>Upload You Aadhar Card:  <Button variant="secondary" onClick={() => handleClick("aadhar")}>
                Upload
              </Button></p>
              )}
              {!aadharCardUploaded && (
                  <p className="mt-2 text-danger">Please upload Aadhar card</p>
                )}
            </div>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicCity">
            <div>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
              {panCardUploaded ? (
                <p>Uploaded your Pan Card<Button variant="success" disabled>
                  Uploaded
                </Button></p>
              ) : (
                <p>Upload You Pan Card:  <Button variant="secondary" onClick={() => handleClick("pan")}>
                Upload
              </Button></p>
                
              )}
              {!panCardUploaded && (
                <p className="mt-2 text-danger">Please upload Pan card</p>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-2" controlId="formBasicCity">
            <div>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
              {mediCertificateCardUploaded ? (
                <p>Uploaded your Medical Certificates:  <Button variant="success" disabled>
                  Uploaded
                </Button></p>
              ) : (
                <p>Upload You Medical Certificates:  <Button variant="secondary" onClick={() => handleClick("medi")}>
                Upload
              </Button></p>
                
              )}
            </div>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign up
            </Button>
          </div>
        </Form>
      </div>
      <div className="p-4 box mt-3 text-center">
        Already have an account? <Link to="/workerloginmain">Log In</Link>
      </div>
    </>
  );
};

export default WorkerSignup;
