import { Container } from "react-bootstrap";
//import { Routes, Route } from "react-router-dom";
import "../../App.css";
//import LoginHome from "./LoginHome";
//import Login from "./Login";
import ClientSignup from "./ClientSignup";
//import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";
import Navbar from '../NavbarClient';
function ClientSignupMain() {
  return (
    <div>
      <Navbar />
    <Container style={{ width: "400px" }}>
          <UserAuthContextProvider>
              <ClientSignup />
          </UserAuthContextProvider>
    </Container>
    </div>
  );
}

export default ClientSignupMain;
