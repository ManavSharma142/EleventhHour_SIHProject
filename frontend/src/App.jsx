import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import LoginPage from './pages/TempLogin';
import SignUpPage from './pages/TempRegister';
import Home from "./pages/Home"; 
import WorkoutPage from './pages/WorkoutSplitGenPage';
import Workout from './pages/Workout';
import Nutrition from './pages/Nutrition';
import Community from './pages/Community';
import UserProfile from './pages/UserProfile';
import LogWorkout from './pages/Logpage';
import OAuthSuccess from './pages/Oauth';


function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/app" element={<Home />} />
          <Route path="/split-generator" element={<WorkoutPage />} />
          <Route path='/workout' element={<Workout />} />
          <Route path='/community' element={<Community />} />
          <Route path='/nutrition' element={<Nutrition />} />
          <Route path='/profile' element={<UserProfile />} />
          <Route path='/logworkout' element={<LogWorkout />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;