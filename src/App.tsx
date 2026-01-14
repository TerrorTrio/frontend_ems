import './App.css'
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, Route, Routes} from "react-router-dom";
import {EmployeePage} from "./pages/EmployeePage.tsx";

function App() {
    return (
        <Container>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/employees">Mitarbeiter</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Routes>
                <Route path="/employees" element={
                        <EmployeePage/>
                }/>
            </Routes>
        </Container>
    )
}

export default App
