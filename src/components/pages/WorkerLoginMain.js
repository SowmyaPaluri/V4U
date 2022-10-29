import { Container } from "react-bootstrap";
//import { Routes, Route } from "react-router-dom";
import "../../App.css";
//import LoginHome from "./LoginHome";
//import Login from "./Login";
import WorkerLogin from "./WorkerLogin";
//import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";

function WorkerLoginMain() {
  return (
    <Container style={{ width: "400px" }}>
          <UserAuthContextProvider>
              <WorkerLogin />
          </UserAuthContextProvider>
    </Container>
  );
}

export default WorkerLoginMain;
