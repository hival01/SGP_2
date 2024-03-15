import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WaiterModule from "./Pages/WaiterModule";
import ManagerDashboard from "./layout/ManagerDashboard";
import Order from "./Pages/Order";

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
          <Route path="/manager/orders" element={<Order/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
