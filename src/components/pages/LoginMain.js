import { Container } from "react-bootstrap";
//import { Routes, Route } from "react-router-dom";
import "../../App.css";
//import LoginHome from "./LoginHome";
//import Login from "./Login";
import Login from "./Login";
//import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";

function LoginMain() {
  return (
    <Container style={{ width: "400px" }}>
          <UserAuthContextProvider>
              <Login />
          </UserAuthContextProvider>
    </Container>
  );
}

export default LoginMain;
