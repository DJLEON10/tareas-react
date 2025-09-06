import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import HookUseState from "./playground/HookUseState";
import HomeHooks from "./playground/HomeHooks";
import "./App.css";
import HookUseNavigate from "./playground/HookUseNavigate";
import HookUseRef from "./playground/HookUseRef";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeHooks />}></Route>
        <Route path="/useState" element={<HookUseState />}></Route>
        <Route path="/useNavigate" element={<HookUseNavigate />}></Route>
        <Route path="/useDebug" element={<HookUseDebug />}></Route>
        <Route path="/usereduce" element={<HookUseReduce />}></Route>
        <Route path="/useref" element={<HookUseRef />}></Route>
        <Route path="/useimperativehandle" element={<HookUseImperatibeHandle />}></Route>
        <Route path="/usememo" element={<HookUseMemo />}></Route>
        <Route path="/usecallback" element={<HookUseCallback />}></Route>
        <Route path="/usetransmition" element={<HookUseTransmition />}></Route>
        <Route path="/usedeferredvalue" element={<HookUseDeferredValue />}></Route>
        <Route path="/useeffect" element={<HookUseEffect />}></Route>
        <Route path="/uselayouteffect" element={<HookUseLayoutEffect />}></Route>
        <Route path="/useinsertioneffect" element={<HookUseInsertionEffect />}></Route>
        <Route path="/usecontext" element={<HookUseContext />}></Route>
        <Route path="/usesynkexternalstore" element={<HookUseSyncExternalStore />}></Route>
        <Route path="/useid" element={<HookUseId />}></Route>
        <Route path="/use" element={<HookUse />}></Route>
        <Route path="/useoptimistic" element={<HookUseOptimistic />}></Route>
        <Route path="/useformstatus" element={<HookUseFormStatus />}></Route>
        <Route path="/useactionstate" element={<HookUseActionState />}></Route>




      </Routes>
    </Router>
  );
}

export default App;


