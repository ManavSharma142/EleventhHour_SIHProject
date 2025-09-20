import { LandingHeader } from '../components/Landing/LandingHeader';
import { LandingHero } from '../components/Landing/LandingHero';
import { StatsBar } from '../components/Landing/StatsBar';
import { StudentSection } from '../components/Landing/StudentSection';
import { LandingFooter } from '../components/Landing/LandingFooter';
import { LandingBackground } from '../components/Landing/LandingBackground';
export function Landing() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Background with animated orbs */}
      <LandingBackground />

      {/* Header */}
      <LandingHeader />

      {/* Hero Section */}
      <LandingHero />

      {/* Stats Bar */}
      <StatsBar />

      {/* Student Section */}
      <StudentSection />

      {/* Footer */}
      <LandingFooter />
    </div>
  )
}