import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WaiterModule from "./Pages/WaiterModule";
import ManagerDashboard from "./layout/ManagerDashboard";
import ManagerModule from "./Pages/ManagerModule";
import KitchenModule from "./Pages/KitchenModule";
import ManagerPanel from "./Pages/ManagerPanel";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addWaiter" element={<Signup />} />
          <Route path="/waiter" element={<WaiterModule />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/kitchen" element={<KitchenModule />} />
          <Route path="/manager/module" element={<ManagerModule />} />
          <Route path="/manager/managerpanel" element={<ManagerPanel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
