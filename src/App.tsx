import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import NavBar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {EmployeePage} from "./pages/EmployeePage.tsx";
import {QualificationsPage} from "./pages/QualificationPage.tsx";

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
                    padding: "2vw 9vw 2vw 9vw",
                    overflow: "auto",
                }}>
                    <Routes>
                        <Route path="/callback" element={<EmployeePage/>}/>
                        <Route path="/employees" element={<EmployeePage/>}/>
                        <Route path="/qualifications" element={<QualificationsPage/>}/>
                    </Routes>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default App;