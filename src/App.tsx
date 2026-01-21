import "./App.css";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import NavBar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {EmployeePage} from "./pages/EmployeePage.tsx";

function App() {
    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <Header/>
            <div style={{display: "flex", flex: 1, minHeight: 0}}>
                <NavBar/>
                <Routes>
                    <Route path="/employees" element={<EmployeePage/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
