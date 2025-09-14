import React from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import ActivityHeatmap from '../components/ActivityHeatmap';
import AIAssistantCard from '../components/AIAssistantCard';
import ProgressRing from '../components/ProgressRing';
import LeaderboardCard from '../components/LeaderboardCard';

// The component name now matches the filename
export default function TempDashboard() {
  const userProfileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Motivational Quote */}
            <div 
              className="relative rounded-xl overflow-hidden h-64 flex flex-col justify-end p-8 text-white bg-cover bg-center" 
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, transparent), url("${userProfileImage}")`,
              }}
            >
              <h2 className="text-3xl font-bold">"The only bad workout is the one that didn't happen."</h2>
              <p className="text-lg text-[var(--text-secondary-color)]">Embrace the journey. Every step forward is a victory.</p>
            </div>
            
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard icon="footprint" title="Steps" value="8,452" />
              <StatCard icon="monitor_heart" title="Heart Rate" value="72" unit="bpm" />
              <StatCard icon="sleep" title="Sleep" value="7" unit="h" value2="30" unit2="m" />
            </div>

            {/* Workout & Routine Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold">Today's Workout</h3>
                  <p className="text-[var(--text-secondary-color)] mt-1">Full Body Strength</p>
                </div>
                <button className="mt-6 w-full bg-[var(--primary-color)] hover:bg-blue-500 transition-colors text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">play_arrow</span>
                  Start Workout
                </button>
              </div>
              <div className="card p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold">Mental Health Routine</h3>
                  <div className="mt-4 space-y-3 text-[var(--text-secondary-color)]">
                    <div className="flex items-center gap-3"><span className="material-symbols-outlined text-[var(--primary-color)]">self_improvement</span><span>10 min Meditation</span></div>
                    <div className="flex items-center gap-3"><span className="material-symbols-outlined text-[var(--primary-color)]">spa</span><span>5 min Breathing</span></div>
                  </div>
                </div>
                <button className="mt-6 w-full bg-[var(--primary-color)] hover:bg-blue-500 transition-colors text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">play_arrow</span>
                  Start
                </button>
              </div>
            </div>

            {/* Activity Heatmap */}
            <ActivityHeatmap />
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col space-y-8">
            <AIAssistantCard />
            <ProgressRing />
            <LeaderboardCard />
          </aside>
        </div>
      </main>
    </div>
  );
}