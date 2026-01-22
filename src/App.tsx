import "./App.css";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import NavBar from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {EmployeePage} from "./pages/EmployeePage.tsx";
import {EmployeeDetailPage} from "./pages/EmployeeDetailPage.tsx";

function App() {
    return (
        <div className="app-container">
            <Header/>
            <div className="app-body">
                <NavBar/>
                <main className="app-content">
                <Routes>
                    <Route path="/employees" element={<EmployeePage/>}/>
                    <Route path="/employees/:id" element={<EmployeeDetailPage/>}/>
                </Routes>
                </main>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
