import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register"
import Reset from "./components/Reset"
import Dashboard from "./components/Dashboard"
import Title from "./components/Title"
import Page from "./components/Page"

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route exact path="/" element={<Login />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element ={<Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
