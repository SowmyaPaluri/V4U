import { Container } from "react-bootstrap";
//import { Routes, Route } from "react-router-dom";
import "../../App.css";
//import LoginHome from "./LoginHome";
//import Login from "./Login";
import AdminLogin from "./AdminLogin";
//import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";
import Navbar from '../NavbarAdmin';
function AdminLoginMain() {
  return (
    <div>
      <Navbar />
      <Container style={{ width: "400px" }}>
          <UserAuthContextProvider>
              <AdminLogin />
          </UserAuthContextProvider>
    </Container>
    </div>
  );
}

export default AdminLoginMain;
