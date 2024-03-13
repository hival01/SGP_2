import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WaiterModule from "./Pages/WaiterModule";
// import WaiterPage from "./Pages/WaiterPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/waiter" element={<WaiterModule/>} />
          {/* <Route path="/waiter" element={<WaiterPage />} /> */}

        </Routes>
      </Router>
    </>
  );
}

export default App;
