import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Landing } from './pages/Landing';
import LoginPage from './pages/TempLogin';
import SignUpPage from './pages/TempRegister';
function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;