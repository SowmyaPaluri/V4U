import "./RatingStyles.css";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {collection, addDoc} from 'firebase/firestore';
import { Button } from "react-bootstrap";
import { auth, db } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";

function Ratings() {
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCollectionRef = collection(db, "rating");
      await addDoc(userCollectionRef, {ratenumber: number})
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
        return "Why do you like the product?";
      default:
        return "Comment here...";
    }
  };
  return (
    <div className="Rating">
      <div className="popup">
        <div className="content">
          <div className="product">
          </div>
          <div>
            <h1>{handleText()}</h1>
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onChange={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onChange={() => setNumber(index + 1)}
                  />
                )
              )}
          </div>
          <textarea placeholder={handlePlaceHolder()}></textarea>&nbsp;
          <Button className={` ${!number && "disabled"} `} onSubmit={handleSubmit} type="Submit">Submit</Button>
        </div>
      </div>
    </div>
  );
}

export default Ratings
