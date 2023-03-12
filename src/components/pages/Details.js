import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from 'react-router-dom';
import { collection } from "firebase/firestore";
import { useState, useEffect } from "react";
import { query, getDocs, where, updateDoc, doc, FieldValue, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";

function Details() {

    const navigate = useNavigate();
    const [user, loading, er] = useAuthState(auth);
    const [urlpc, setUrlpc] = useState("");
    const [urlac, setUrlac] = useState("");
    const [urlmd, setUrlmd] = useState("");
    const [urlimg, setUrlimg] = useState("");
    const {workerEmail} = useParams();
    const pan = "https://5.imimg.com/data5/XC/LH/BB/ANDROID-13177721/product-jpeg-500x500.jpg";


    useEffect(() => {
        if(loading) return;
        if (!user) return navigate("/logupmain");
        const colRef = collection(db, 'workers');
        const q = query(colRef, where('email', '==', workerEmail));
        const getUsers = async () => {
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                console.log("))))))))))))))))))))))))");
                setUrlpc(doc.data().panUrl);
                setUrlac(doc.data().aadhaarUrl);
                setUrlimg(doc.data().imgUrl);
                setUrlmd(doc.data().medUrl);
                })
            });
      };
      getUsers(); 
      console.log(urlac);
      console.log(urlpc);
      
    
      }, [user, loading]);

  return (
    <CardGroup style={{ padding: "90", marginLeft: "20" }}>
      &emsp;&emsp;
      <div className="Container">
        <div className="Row">
            <div className="Col Col-6">
            <Card style={{height:'430px', width:'500px'}}>
        <Card.Img variant="top" src={urlimg} style={{height:'400px', width:'500px'}} />
        <Card.Body >
          <Card.Title>Image</Card.Title>
        </Card.Body>
      </Card>
            </div>
            <div className="Col Col-6">
            <Card style={{height:'430px', width:'500px'}}>
        <Card.Img variant="top" src={urlpc} style={{height:'400px', width:'500px'}} />
        <Card.Body >
          <Card.Title>pan card</Card.Title>
        </Card.Body>
      </Card>
            </div>
            </div>
            <div className="Row">
            <div className="Col Col-6">
            <Card style={{height:'430px', width:'500px'}}>
        <Card.Img variant="top" src={urlac} style={{height:'400px', width:'500px'}} />
        <Card.Body >
          <Card.Title>aadhaar card</Card.Title>
        </Card.Body>
      </Card>
            </div>
            <div className="Col Col-6">
            <Card style={{height:'430px', width:'500px'}}>
        <Card.Img variant="top" src={urlmd} style={{height:'400px', width:'500px'}} />
        <Card.Body >
          <Card.Title>Medical Certificates</Card.Title>
        </Card.Body>
      </Card>
            </div>
            </div>
      </div>
      &emsp;&emsp;
    </CardGroup>
  );
}

export default Details;