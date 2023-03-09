import "./RatingStyles.css";
import { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {collection, addDoc} from 'firebase/firestore';
import { Button } from "react-bootstrap";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import { Form, Alert } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { query, getDocs, where, updateDoc, doc, FieldValue, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";


function Ratings() {
  const [user, loading, er] = useAuthState(auth);
  var {workerEmail} = useParams();
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [error, setError] = useState("");
  const [ratingDoc, setRatingDoc] = useState("");
  const [tot, setTot] = useState(0);
  const [cnt, setCnt] = useState(0);
  
  useEffect(() => {
    if (loading) return;
    if (!user ) return navigate("/logupmain");
    const collectionRef = collection(db, 'rating');
    const q = query(collectionRef, where('workerEmail', '==', workerEmail));
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data().bookedServices);
          setTot(doc.data().ratingSum);
          setCnt(doc.data().ratingCount);
          setRatingDoc(doc.id);
          console.log(doc.id);
        })
        console.log(ratingDoc);
    });
  }, [user, loading]);


  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const matchedDoc = doc(db, 'rating', ratingDoc)
    await updateDoc(matchedDoc, {ratingSum: tot + number, ratingCount: cnt + 1})
      console.log(number);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };



  const handleText = () => {
    switch (number || hoverStar) {
      case 0:
        return "Evaluate";
      case 1:
        return "Dissatifation";
      case 2:
        return "Unsatisfied";
      case 3:
        return "Normal";
      case 4:
        return "Satisfied";
      case 5:
        return "Very Satisfied";
      default:
        return "Evaluate";
    }
  };

  const handlePlaceHolder = () => {
    switch (number || hoverStar) {
      case 0:
        return "Comment here...";
      case 1:
      case 2:
      case 3:
      case 4:
        return "What is your problem?";
      case 5:
        return "Why do you like the worker?";
      default:
        return "Comment here...";
    }
  };
  return (
    <div className="Rating">
      <div className="popup">
      <Form onSubmit={handleSubmit}>
        <div className="content">
          <div className="product">
          </div>
          <div>
            <h1>{handleText()}</h1>
            <AiFillStar
                    style={{ color: "orange" }}
                    onClick={() => setNumber(4)}
                  />
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                )
              )}
          </div>
          <textarea placeholder={handlePlaceHolder()}></textarea>&nbsp;
          <Button className={` ${!number && "disabled"} `} onSubmit={handleSubmit} type="Submit">Submit</Button>
        </div>
          </Form>
          
      </div>
    </div>
  );
}

export default Ratings