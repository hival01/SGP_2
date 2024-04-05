import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WaiterModule from "./Pages/WaiterModule";
import ManagerDashboard from "./layout/ManagerDashboard";


import KitchenModule from "./Pages/KitchenModule";


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/waiter" element={<WaiterModule/>} />
          <Route path="/manager" element={<ManagerDashboard/>} />
          <Route path="/KitchenModule" element={<KitchenModule/>} />

          
        </Routes>
      </Router>
    </>
  );
}

export default App;
