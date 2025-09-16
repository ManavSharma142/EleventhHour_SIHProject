import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Landing } from './pages/Landing';
import LoginPage from './pages/TempLogin';
import SignUpPage from './pages/TempRegister';
import Home from "./pages/Home"; 
// import Workout from "./pages/Workout";
function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;