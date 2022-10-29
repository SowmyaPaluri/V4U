import { Container } from "react-bootstrap";
//import { Routes, Route } from "react-router-dom";
import "../../App.css";
//import LoginHome from "./LoginHome";
//import Login from "./Login";
import WorkerSignup from "./WorkerSignup";
//import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";

function WorkerSignupMain() {
  return (
    <Container style={{ width: "400px" }}>
          <UserAuthContextProvider>
              <WorkerSignup />
          </UserAuthContextProvider>
    </Container>
  );
}

export default WorkerSignupMain;
