import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TempHero from "./components/TempHero";
import TempLogin from "./components/TempLogin";
import TempRegister from "./components/TempRegister";
import TempDashboard from "./pages/TempDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TempHero />} />
        <Route path="/login" element={<TempLogin />} />
        <Route path="/register" element={<TempRegister />} />
        <Route path="/app" element={<TempDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
