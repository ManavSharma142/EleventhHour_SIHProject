// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import HeroPage from "./pages/HeroPage";
// import TempLogin from "./pages/TempLogin"; // Using TempLogin
// import TempRegister from "./pages/TempRegister"; // Using TempRegister
// import TempDashboard from "./pages/TempDashboard";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HeroPage />} />
//         <Route path="/login" element={<TempLogin />} />
//         <Route path="/register" element={<TempRegister />} />
//         <Route path="/app" element={<TempDashboard />} />
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }
import { LandingBackground } from './components/landing-background';
import { LandingHeader } from './components/landing-header';
import { LandingHero } from './components/landing-hero';
import { StatsBar } from './components/stats-bar';
import { FeaturesSection } from './components/features-section';
import { StudentSection } from './components/student-section';
import { CtaSection } from './components/cta-section';
import { LandingFooter } from './components/landing-footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <LandingBackground />
      
      <LandingHeader />
      
      <main>
        <LandingHero />
        <StatsBar />
        <FeaturesSection />
        <StudentSection />
        <CtaSection />
      </main>
      
      <LandingFooter />
    </div>
  );
}