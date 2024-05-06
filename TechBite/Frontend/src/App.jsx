import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WaiterModule from "./Pages/WaiterModule";
import ManagerDashboard from "./layout/ManagerDashboard";
import ManagerModule from "./Pages/ManagerModule_orders";
import KitchenModule from "./Pages/KitchenModule";
import ManagerPanel from "./Pages/Manager_menu_change";

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
          <Route path="/manager/orders" element={<ManagerModule />} />
          <Route path="/manager/changeMenu" element={<ManagerPanel />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
