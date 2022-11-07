import { Container } from "react-bootstrap";
//import { Routes, Route } from "react-router-dom";
import "../../App.css";
//import LoginHome from "./LoginHome";
//import Login from "./Login";
import Signup from "./Signup";
//import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";

function SignupMain() {
  return (
    <Container style={{ width: "400px" }}>
          <UserAuthContextProvider>
              <Signup />
          </UserAuthContextProvider>
    </Container>
  );
}

export default SignupMain;
