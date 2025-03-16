import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home"; // ✅ Home page (Dashboard)
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Protected route

function App() {
  return (
    <Router>
      <Routes>
        {/* Login aur Signup Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />

        {/* Protected Home Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
