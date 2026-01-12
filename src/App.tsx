import './App.css'
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, Route, Routes} from "react-router-dom";
import {EmployeeTablePage} from "./pages/EmployeeTablePage.tsx";

function App() {


    return (
        <Container>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
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
                        <EmployeeTablePage/>
                }/>
            </Routes>
        </Container>
    )
}

export default App
