import { Container } from "react-bootstrap";
//import { Routes, Route } from "react-router-dom";
import "../../App.css";
//import LoginHome from "./LoginHome";
//import Login from "./Login";
import Logup from "./Logup";
//import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";
function LogupMain() {
  return (
    <div>
      <Container>
          <UserAuthContextProvider>
              <Logup />
          </UserAuthContextProvider>
      </Container>
    </div>
  );
}

export default LogupMain;
