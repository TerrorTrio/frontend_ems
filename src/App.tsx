import "./App.css";
import { Container, Nav } from "react-bootstrap";
import { Route, Routes, NavLink } from "react-router-dom";
import { UnsecuredFoo } from "./pages/UnsecuredFoo";
import { SecuredBar } from "./pages/SecuredBar";
import { Home } from "./pages/Home";
import RequireAuth from "./auth/RequireAuth";
import { EmployeeTable } from "./pages/EmployeeTable";
import Header from "./components/header";
import Footer from "./components/footer";
import Menue from "./components/menue";

function App() {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
                <Menue />
                <Container style={{ flex: 1 }}>
                    <Nav className="justify-content-center my-3" variant="pills">
                        <Nav.Link as={NavLink} to="/foo">Foo</Nav.Link>
                        <Nav.Link as={NavLink} to="/bar">Bar</Nav.Link>
                    </Nav>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/foo" element={<UnsecuredFoo />} />
                        <Route
                            path="/bar"
                            element={
                                <RequireAuth>
                                    <SecuredBar />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/employees"
                            element={
                                <RequireAuth>
                                    <EmployeeTable />
                                </RequireAuth>
                            }
                        />
                    </Routes>
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default App;
