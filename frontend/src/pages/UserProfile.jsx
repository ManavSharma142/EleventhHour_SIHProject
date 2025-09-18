import React, { useState } from "react";
import { 
  Home, Dumbbell, Apple, Users, Coins, ChevronRight, Settings, 
  Calendar, Trophy, Target, TrendingUp, Activity, Heart, Scale,
  Clock, MapPin, Mail, Phone, Edit3, Camera, Star, Award,
  Zap, Flame, Medal, BookOpen, User, Eye, Lock, Bell,
  BarChart3, PieChart, LineChart
} from "lucide-react";

// Enhanced Card component with glassmorphism effect
function Card({ children, className, onClick, hover = true }) {
  return (
    <div 
      className={`
        backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl
        ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Animated gradient background component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ icon: Icon, title, value, subtitle, gradient, textColor }) {
  return (
    <Card className={`p-6 ${gradient} border-opacity-30`} hover={false}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Icon size={24} className={textColor} />
            <span className="text-slate-300 text-sm font-medium">{title}</span>
          </div>
          <div className={`text-3xl font-bold ${textColor}`}>{value}</div>
          {subtitle && <div className="text-slate-400 text-sm mt-1">{subtitle}</div>}
        </div>
      </div>
    </Card>
  );
}

// Achievement Badge Component
function AchievementBadge({ icon: Icon, title, description, earned = false }) {
  return (
    <Card className={`p-4 ${earned ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30' : 'bg-white/5'}`} hover={false}>
      <div className="text-center space-y-3">
        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${earned ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : 'bg-slate-700'}`}>
          <Icon size={24} className={earned ? 'text-white' : 'text-slate-400'} />
        </div>
        <div>
          <div className={`font-semibold ${earned ? 'text-yellow-400' : 'text-slate-400'}`}>{title}</div>
          <div className="text-xs text-slate-500 mt-1">{description}</div>
        </div>
      </div>
    </Card>
  );
}

// Activity Timeline Item
function TimelineItem({ icon: Icon, title, description, time, color }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color} border border-white/20`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="font-semibold text-white">{title}</div>
        <div className="text-slate-400 text-sm">{description}</div>
        <div className="text-slate-500 text-xs">{time}</div>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const username = "dhananjaymishra269FBL11kl";
  const [currentTime, setCurrentTime] = useState(new Date());
  const [flexcoins] = useState(1259);

  const userStats = {
    totalWorkouts: 142,
    streakDays: 28,
    caloriesBurned: 12450,
    weightLifted: 25600,
    currentWeight: 75.5,
    targetWeight: 80,
    bodyFat: 15.2,
    muscleMass: 34.8
  };

  const recentActivities = [
    {
      icon: Dumbbell,
      title: "Completed Push Workout",
      description: "Bench Press, Shoulder Press, Tricep Dips - 75 min",
      time: "2 hours ago",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Apple,
      title: "Meal Logged",
      description: "Protein Smoothie - 285 calories, 30g protein",
      time: "4 hours ago",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Trophy,
      title: "Achievement Unlocked",
      description: "Completed 4-week consistency challenge",
      time: "1 day ago",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Target,
      title: "Goal Reached",
      description: "Hit daily protein target (150g)",
      time: "2 days ago",
      color: "from-pink-500 to-red-500"
    }
  ];

  const achievements = [
    { icon: Flame, title: "Streak Master", description: "30-day workout streak", earned: true },
    { icon: Dumbbell, title: "Iron Lifter", description: "Lift 1000kg total", earned: true },
    { icon: Target, title: "Goal Crusher", description: "Complete 5 goals", earned: true },
    { icon: Medal, title: "Consistency King", description: "90% workout completion", earned: false },
    { icon: Zap, title: "Power User", description: "Use app 100 days", earned: false },
    { icon: Award, title: "Community Star", description: "Help 10 members", earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white flex relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Enhanced Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-[#0F1729] to-[#0A1018] backdrop-blur-xl border-r border-white/10 p-6 flex flex-col fixed top-0 left-0 h-full z-10 shadow-2xl">
              {/* Logo with animation */}
              <div className="flex items-center gap-4 mb-12 group cursor-pointer">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Dumbbell className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent tracking-tight">Flexora</span>
                  <div className="text-xs text-gray-400 font-medium">Fitness Reimagined</div>
                </div>
              </div>
      
              {/* Time Display */}
              <div className="mb-6 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-sm text-gray-400">
                  {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
              </div>
      
              {/* Enhanced Navigation */}
              <nav className="flex-1 space-y-3">
                {[
                  { icon: Home, label: "Dashboard", color: "from-blue-500 to-cyan-500" },
                  { icon: Dumbbell, label: "Workouts", color: "from-green-500 to-emerald-500" },
                  { icon: Apple, label: "Nutrition", color: "from-orange-500 to-yellow-500" },
                  { icon: Users, label: "Community", color: "from-purple-500 to-pink-500" },
                  { icon: Coins, label: "FlexCoins", color: "from-amber-500 to-orange-500" },
                ].map(({ icon: Icon, label, active, color }) => (
                  <div
                    key={label}
                    className={`group flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden
                      ${active
                        ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                      }`}
                  >
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl"></div>
                    )}
                    <div className={`relative p-2 rounded-xl ${active ? `bg-gradient-to-r ${color}` : 'bg-gray-700/50 group-hover:bg-gray-600/50'} transition-all duration-300`}>
                      <Icon className="w-5 h-5 relative z-10" />
                    </div>
                    <span className="font-semibold relative z-10">{label}</span>
                    {active && <div className="absolute right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>}
                  </div>
                ))}
              </nav>
      
              {/* Enhanced Profile */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-[#1A1F2E] to-[#1E2331] rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white truncate text-sm">
                      {username}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Coins className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-400 font-semibold">{flexcoins}</span>
                      <span>FlexCoins</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

      {/* Main Content */}
      <div className="flex-1 p-10 relative z-10 overflow-y-auto ml-72">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-12 text-slate-300">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <ChevronRight size={18} />
          <span className="text-white font-medium">Profile</span>
        </div>

        {/* Profile Header */}
        <div className="mb-12">
          <Card className="p-8" hover={false}>
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-8">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    <span className="text-white font-bold text-4xl">AJ</span>
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
                    <Camera size={18} className="text-white" />
                  </button>
                </div>

                {/* Basic Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Alex Johnson</h1>
                    <div className="flex items-center gap-6 text-slate-300">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>New York, USA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>Member since Jan 2024</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity size={16} />
                        <span>Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail size={14} />
                        <span>alex.johnson@email.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone size={14} />
                        <span>+1 (555) 123-4567</span>
                      </div>
                    </div>
                    <p className="text-slate-400 max-w-2xl leading-relaxed">
                      Passionate fitness enthusiast on a journey to build strength and maintain a healthy lifestyle. 
                      Love sharing progress and motivating others in the community!
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all"
                >
                  <Edit3 size={18} />
                  <span>{isEditing ? 'Save' : 'Edit Profile'}</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-300">{userStats.totalWorkouts}</div>
                <div className="text-sm text-slate-300">Total Workouts</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <div className="text-2xl font-bold text-emerald-300">{userStats.streakDays}</div>
                <div className="text-sm text-slate-300">Day Streak</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                <div className="text-2xl font-bold text-orange-300">{userStats.caloriesBurned.toLocaleString()}</div>
                <div className="text-sm text-slate-300">Calories Burned</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-300">{(userStats.weightLifted/1000).toFixed(1)}K</div>
                <div className="text-sm text-slate-300">kg Lifted</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <Card className="p-2" hover={false}>
            <div className="flex gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'stats', label: 'Statistics', icon: TrendingUp },
                { id: 'achievements', label: 'Achievements', icon: Trophy },
                { id: 'activity', label: 'Activity', icon: Activity }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all
                    ${activeTab === tab.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Fitness Goals */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Current Goals</h2>
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6" hover={false}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Scale size={20} className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Weight Goal</div>
                      <div className="text-slate-400 text-sm">Target: {userStats.targetWeight}kg</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Progress</span>
                      <span className="text-emerald-400">{userStats.currentWeight}kg / {userStats.targetWeight}kg</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(userStats.currentWeight / userStats.targetWeight) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6" hover={false}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center">
                      <Target size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Body Fat</div>
                      <div className="text-slate-400 text-sm">Target: 12%</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Current</span>
                      <span className="text-blue-400">{userStats.bodyFat}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(userStats.bodyFat / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              <Card className="p-6" hover={false}>
                <div className="space-y-6">
                  {recentActivities.map((activity, index) => (
                    <TimelineItem key={index} {...activity} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <StatsCard
                icon={Dumbbell}
                title="Total Workouts"
                value={userStats.totalWorkouts}
                subtitle="This month: 24"
                gradient="bg-gradient-to-br from-blue-500/20 to-purple-500/20"
                textColor="text-blue-300"
              />
              <StatsCard
                icon={Flame}
                title="Calories Burned"
                value={`${(userStats.caloriesBurned/1000).toFixed(1)}K`}
                subtitle="This week: 1,250"
                gradient="bg-gradient-to-br from-orange-500/20 to-red-500/20"
                textColor="text-orange-300"
              />
              <StatsCard
                icon={Clock}
                title="Workout Time"
                value="85h"
                subtitle="Average: 45min"
                gradient="bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
                textColor="text-emerald-300"
              />
              <StatsCard
                icon={TrendingUp}
                title="Strength Gain"
                value="+25%"
                subtitle="Since last month"
                gradient="bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                textColor="text-purple-300"
              />
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <AchievementBadge key={index} {...achievement} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-8">
            <Card className="p-6" hover={false}>
              <h2 className="text-2xl font-bold text-white mb-6">Activity Timeline</h2>
              <div className="space-y-8">
                {recentActivities.concat([
                  {
                    icon: BookOpen,
                    title: "Read Article",
                    description: "Time Under Tension - Training Science",
                    time: "3 days ago",
                    color: "from-indigo-500 to-blue-500"
                  },
                  {
                    icon: Heart,
                    title: "Health Check",
                    description: "Updated body measurements and vitals",
                    time: "1 week ago",
                    color: "from-red-500 to-pink-500"
                  }
                ]).map((activity, index) => (
                  <TimelineItem key={index} {...activity} />
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}