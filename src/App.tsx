import "./App.css";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import NavBar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {EmployeePage} from "./pages/EmployeePage.tsx";

function App() {
    return (
        <div className="app-container">
            <Header/>
            <div className="app-body">
                <NavBar/>
                <main className="app-content">
                <Routes>
                    <Route path="/employees" element={<EmployeePage/>}/>
                </Routes>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
