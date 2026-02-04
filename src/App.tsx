import Header from "./components/Layout/Header.tsx";
import Footer from "./components/Layout/Footer.tsx";
import NavBar from "./components/Layout/Navbar.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import {EmployeePage} from "./pages/EmployeePage.tsx";
import {QualificationsPage} from "./pages/QualificationPage.tsx";
import {CreateEmployeePage} from "./pages/CreateEmployeePage.tsx";
import AuthCallback from "./auth/AuthCallback.tsx";
import RequireAuth from "./auth/RequireAuth.tsx";
import {EmployeeDetailPage} from "./pages/EmployeeDetailPage.tsx";

function App() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
        }}>
            <Header/>
            <div style={{
                display: "flex",
                flex: 1,
                minHeight: 0,
            }}>
                <NavBar/>
                <main style={{
                    flex: 1,
                    padding: "2vh 9vw 2vh 9vw",
                    overflow: "auto",
                }}>
                    <Routes>
                        <Route element={<RequireAuth/>}>
                            <Route path="/" element={<Navigate to="/employees" replace />} />
                            <Route path="/callback" element={<AuthCallback/>}/>
                            <Route path="/employees/new" element={<CreateEmployeePage/>}/>
                            <Route path="/employees/:id" element={<EmployeeDetailPage/>}/>
                            <Route path="/employees" element={<EmployeePage/>}/>
                            <Route path="/qualifications" element={<QualificationsPage/>}/>
                        </Route>
                    </Routes>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
