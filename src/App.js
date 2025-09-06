import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import HookUseState from "./playground/HookUseState";
import HomeHooks from "./playground/HomeHooks";
import "./App.css";
import HookUseNavigate from "./playground/HookUseNavigate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeHooks />}></Route>
        <Route path="/useState" element={<HookUseState />}></Route>
        <Route path="/useNavigate" element={<HookUseNavigate />}></Route>
      </Routes>
    </Router>
  );
}

export default App;


