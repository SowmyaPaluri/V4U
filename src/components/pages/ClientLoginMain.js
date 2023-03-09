import { Container } from "react-bootstrap";
//import { Routes, Route } from "react-router-dom";
import "../../App.css";
//import LoginHome from "./LoginHome";
//import Login from "./Login";
import ClientLogin from "./ClientLogin";
//import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";
import Navbar from '../NavbarClient';

function ClientLoginMain() {
  return (
    <div>
      <Navbar />
    <Container style={{ width: "400px" }}>
          <UserAuthContextProvider>
              <ClientLogin />
          </UserAuthContextProvider>
    </Container>
    </div>
  );
}

export default ClientLoginMain;
