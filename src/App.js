import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register-page/Register";
import Login from "./pages/login-page/Login";
import HookUseState from "./playground/HookUseState";
import HomeHooks from "./playground/HomeHooks";
import "./App.css";
import HookUseNavigate from "./playground/HookUseNavigate";
import HookUseRef from "./playground/HookUseRef";
import HookUseCallback from "./playground/HookUseCallback";
import HookUseDeferredValue from "./playground/HookUseDeferredValue";
import HookUseEffect from "./playground/HookUseEffect";
import HookUseTransition from "./playground/HookUseTransition";
import HookUseReducer from "./playground/HookUseReducer";
import HookUseMemo from "./playground/HookUseMemo";
import HookUseLayoutEffect from "./playground/HookUseLayoutEffect";
import HookUseImperativeHandle from "./playground/HookUseImperativeHandle";
import HookUseDebugValue from "./playground/HookUseDebugValue";
import HookUseOnlineStatus from "./playground/HookUseOnlineStatus";
import HookUseInsertionEffect from "./playground/HookUseInsertionEffect";
import HookUseContext from "./playground/HookUseContext";
import HookUseSyncExternalStore from "./playground/HookUseSyncExternalStore";
import HookUseId from "./playground/HookUseId";
import HookUseOptimistic from "./playground/HookUseOptimistic";
import HookUseFormStatus from "./playground/HookUseFormStatus";
import HookUseActionState from "./playground/HookUseActionState";
import ResetPassword from "./pages/resetpassword-pages/ResetPassword";
import MedicamentosCreate from "./pages/medicamentos-page/medicamentos-create";
import MedicamentosIndex from "./pages/medicamentos-page/Medicamentos-index";
import MedicamentosEdit from "./pages/medicamentos-page/medicamentos-edit";
import VeterinariosList from "./pages/veterinario-page/VeterinariosList";
import VeterinarioAdd from "./pages/veterinario-page/VeterinarioAdd";
import Mascota from "./pages/mascota-page/Mascota";
import AgregarMascota from "./pages/mascota-page/agregarmacota";
import EditarMascota from "./pages/mascota-page/editarmascota";
import VerMascota from "./pages/mascota-page/vermascota";
import Sidebar from "./components/sidebar-page/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomeHooks />}></Route>
        <Route path="/useState" element={<HookUseState />}></Route>
        <Route path="/useNavigate" element={<HookUseNavigate />}></Route>
        <Route path="/useref" element={<HookUseRef />}></Route>
        <Route path="/useDebug" element={<HookUseDebugValue />}></Route>
        <Route path="/usereduce" element={<HookUseReducer />}></Route>
        <Route path="/useimperativehandle" element={<HookUseImperativeHandle />}></Route>
        <Route path="/usememo" element={<HookUseMemo />}></Route>
        <Route path="/usecallback" element={<HookUseCallback />}></Route>
        <Route path="/usetransmition" element={<HookUseTransition />}></Route>
        <Route path="/usedeferredvalue" element={<HookUseDeferredValue />}></Route>
        <Route path="/useeffect" element={<HookUseEffect />}></Route>
        <Route path="/uselayouteffect" element={<HookUseLayoutEffect />}></Route>
        <Route path="/useonlinestatus" element={<HookUseOnlineStatus />}></Route>
        <Route path="/useinsertioneffect" element={<HookUseInsertionEffect />}></Route>
        <Route path="/usecontext" element={<HookUseContext />}></Route>
        <Route path="/usesynkexternalstore" element={<HookUseSyncExternalStore />}></Route>
        <Route path="/useid" element={<HookUseId />}></Route>
        <Route path="/useoptimistic" element={<HookUseOptimistic />}></Route>
        <Route path="/useformstatus" element={<HookUseFormStatus />}></Route>
        <Route path="/useactionstate" element={<HookUseActionState />}></Route>

        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>
        <Route path="/medicamentos-create" element={<MedicamentosCreate />}></Route>
        <Route path="/medicamentos-index" element={<MedicamentosIndex />}></Route>
        <Route path="/medicamentos-edit/:id" element={<MedicamentosEdit />} />
        <Route path="/veterinarios" element={<VeterinariosList />}></Route>
        <Route path="/veterinarios/add" element={<VeterinarioAdd />}></Route>
        <Route path="/Mascota" element={<Mascota />}></Route>
        <Route path="/agregarmascota" element={<AgregarMascota />}></Route>
        <Route path="/editarmascota/:id" element={<EditarMascota />}></Route>
        <Route path="/vermascota/:id" element={<VerMascota />}></Route>
        



        <Route path="/Mascota" element={<Mascota />}></Route>

      </Routes>
    </Router>
  );
}

export default App;


