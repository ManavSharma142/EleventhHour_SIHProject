import React, { useState, useEffect } from "react";
import {
  Home, Dumbbell, Apple, Users, Coins, ChevronRight, Settings,
  Calendar, Trophy, Target, TrendingUp, Activity, Heart, Scale,
  Clock, MapPin, Mail, Phone, Edit3, Camera, Star, Award,
  Zap, Flame, Medal, BookOpen, User, Eye, Lock, Bell,
  BarChart3, PieChart, LineChart, Menu, X, Loader2
} from "lucide-react";
import {Link} from "react-router-dom";


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

// Stats Card Component
function StatsCard({ icon: Icon, title, value, subtitle, gradient, textColor }) {
  return (
    <Card className={`p-4 md:p-6 ${gradient} border-opacity-30`} hover={false}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <Icon size={20} className={textColor} />
            <span className="text-slate-300 text-xs md:text-sm font-medium">{title}</span>
          </div>
          <div className={`text-2xl md:text-3xl font-bold ${textColor}`}>{value}</div>
          {subtitle && <div className="text-slate-400 text-xs md:text-sm mt-1">{subtitle}</div>}
        </div>
      </div>
    </Card>
  );
}

// Achievement Badge Component
function AchievementBadge({ icon: Icon, title, description, earned = false }) {
  return (
    <Card className={`p-3 md:p-4 ${earned ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30' : 'bg-white/5'}`} hover={false}>
      <div className="text-center space-y-2 md:space-y-3">
        <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto rounded-2xl flex items-center justify-center ${earned ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : 'bg-slate-700'}`}>
          <Icon size={20} className={earned ? 'text-white' : 'text-slate-400'} />
        </div>
        <div>
          <div className={`font-semibold text-sm md:text-base ${earned ? 'text-yellow-400' : 'text-slate-400'}`}>{title}</div>
          <div className="text-xs text-slate-500 mt-1">{description}</div>
        </div>
      </div>
    </Card>
  );
}

// Activity Timeline Item
function TimelineItem({ icon: Icon, title, description, time, color }) {
  return (
    <div className="flex items-start gap-3 md:gap-4">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${color} border border-white/20 shrink-0`}>
        <Icon size={16} className="text-white md:w-5 md:h-5" />
      </div>
      <div className="flex-1 space-y-1 min-w-0">
        <div className="font-semibold text-white text-sm md:text-base">{title}</div>
        <div className="text-slate-400 text-xs md:text-sm">{description}</div>
        <div className="text-slate-500 text-xs">{time}</div>
      </div>
    </div>
  );
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/profile', {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

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
      color: "from-blue-500 to-blue-500"
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
      color: "from-red-500 to-red-500"
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

  // Get user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-slate-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">Error loading profile</div>
          <p className="text-slate-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <aside className={`
        w-72 bg-gradient-to-b from-[#0F1729] to-[#0A1018] backdrop-blur-xl border-r border-white/10 p-4 md:p-6 flex flex-col fixed top-0 left-0 h-full z-40 shadow-2xl transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo with animation */}
        <div className="flex items-center gap-4 mb-8 md:mb-12 group cursor-pointer">
          <div className="relative">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl shadow-2xl group-hover:scale-110 transition-all duration-300">
              <svg
                viewBox="0 0 58 58"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full rounded-2xl"
              >
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0f172a" />
                    <stop offset="50%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="58" height="58" rx="14" fill="url(#grad)" />
                <g transform="translate(17,17)" className=" origin-center">
                  <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="m2.5 21.5 1.4-1.4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="m20.1 3.9 1.4-1.4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <path d="m9.6 14.4 4.8-4.8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          <div>
            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-100 bg-clip-text text-transparent tracking-tight">Flexora</span>
            <div className="text-xs text-gray-400 font-medium">Fitness Reimagined</div>
          </div>
        </div>

        {/* Time Display */}
        <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xs md:text-sm text-gray-400">
            {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex-1 space-y-2 md:space-y-3">
          {[
            { icon: Home, label: "Dashboard", color: "from-blue-500 to-cyan-500", page: "/app" },
            { icon: Dumbbell, label: "Workouts", color: "from-green-500 to-emerald-500", page: "/workout" },
            { icon: Apple, label: "Nutrition", color: "from-orange-500 to-yellow-500", page: "/nutrition" },
            { icon: Users, label: "Community", color: "from-purple-500 to-pink-500", page: "/community" },
            { icon: Coins, label: "FlexCoins", color: "from-amber-500 to-orange-500", page: "/flexcoins" },
          ].map(({ icon: Icon, label, active, color, page }) => (
            <Link
              to={page}
              key={label}
              className={`group flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden
                ${active
                  ? "bg-gradient-to-r from-blue-600/20 to-blue-600/20 border border-blue-500/30 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/10 rounded-2xl"></div>
              )}
              <div className={`relative p-2 rounded-xl ${active ? `bg-gradient-to-r ${color}` : 'bg-gray-700/50 group-hover:bg-gray-600/50'} transition-all duration-300`}>
                <Icon className="w-4 h-4 md:w-5 md:h-5 relative z-10" />
              </div>
              <span className="font-semibold relative z-10 text-sm md:text-base">{label}</span>
              {active && <div className="absolute right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>}
            </Link>
          ))}
        </nav>

        {/* Enhanced Profile */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gradient-to-r from-[#1A1F2E] to-[#1E2331] rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl shrink-0">
              <span className="text-white font-bold text-sm md:text-base">
                {getUserInitials(userData?.name)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white truncate text-xs md:text-sm">
                {userData?.username || 'Loading...'}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="text-amber-400 font-semibold">{userData?.exp || "Newbie"}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-10 relative z-10 overflow-y-auto lg:ml-72">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-6 md:mb-12 text-slate-300 mt-16 lg:mt-0">
          <span className="hover:text-white transition-colors cursor-pointer text-sm md:text-base">Home</span>
          <ChevronRight size={16} className="md:w-5 md:h-5" />
          <span className="text-white font-medium text-sm md:text-base">Profile</span>
        </div>

        {/* Profile Header */}
        <div className="mb-8 md:mb-12">
          <Card className="p-4 md:p-6 lg:p-8" hover={false}>
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 mb-6 md:mb-8">
              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-8 w-full lg:w-auto">
                {/* Profile Picture */}
                <div className="relative mx-auto sm:mx-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center shadow-2xl">
                    {userData?.profilepic ? (
                      <img
                        src={userData.profilepic}
                        alt="Profile"
                        className="w-full h-full rounded-3xl object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-2xl md:text-4xl">
                        {getUserInitials(userData?.name)}
                      </span>
                    )}
                  </div>
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
                    <Camera size={16} className="text-white md:w-5 md:h-5" />
                  </button>
                </div>

                {/* Basic Info */}
                <div className="space-y-4 md:space-y-6 text-center sm:text-left">
                  <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
                      {userData?.name || 'User Name'}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-6 text-slate-300 text-sm md:text-base">
                      <div className="flex items-center gap-2">
                        <User size={14} className="md:w-4 md:h-4" />
                        <span>Age: {userData?.age || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity size={14} className="md:w-4 md:h-4" />
                        <span>{userData?.gender || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target size={14} className="md:w-4 md:h-4" />
                        <span>{userData?.goal || 'No goal set'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-6 text-xs md:text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail size={12} className="md:w-4 md:h-4" />
                        <span>{userData?.email || 'No email'}</span>
                      </div>
                      {userData?.googlefit && (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <Activity size={12} className="md:w-4 md:h-4" />
                          <span>Google Fit Connected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full lg:w-auto lg:ml-auto">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-500 text-white hover:shadow-lg transition-all text-sm md:text-base"
                >
                  <Edit3 size={16} className="md:w-5 md:h-5" />
                  <span>{isEditing ? 'Save' : 'Edit Profile'}</span>
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all text-sm md:text-base">
                  <Settings size={16} className="md:w-5 md:h-5" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              <div className="text-center p-3 md:p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/30">
                <div className="text-xl md:text-2xl font-bold text-blue-300">{userStats.totalWorkouts}</div>
                <div className="text-xs md:text-sm text-slate-300">Total Workouts</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <div className="text-xl md:text-2xl font-bold text-emerald-300">{userStats.streakDays}</div>
                <div className="text-xs md:text-sm text-slate-300">Day Streak</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30">
                <div className="text-xl md:text-2xl font-bold text-orange-300">{userStats.caloriesBurned.toLocaleString()}</div>
                <div className="text-xs md:text-sm text-slate-300">Calories Burned</div>
              </div>
              <div className="text-center p-3 md:p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/30">
                <div className="text-xl md:text-2xl font-bold text-blue-300">{(userStats.weightLifted / 1000).toFixed(1)}K</div>
                <div className="text-xs md:text-sm text-slate-300">kg Lifted</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 md:mb-8">
          <Card className="p-2" hover={false}>
            <div className="flex gap-1 md:gap-2 overflow-x-auto">
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
                    flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-2xl font-medium transition-all whitespace-nowrap text-sm md:text-base
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <tab.icon size={16} className="md:w-5 md:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6 md:space-y-8">
            {/* Fitness Goals */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Current Goals</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                <Card className="p-4 md:p-6" hover={false}>
                  <div className="flex items-center gap-3 md:gap-4 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Scale size={18} className="text-emerald-400 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm md:text-base">Weight Goal</div>
                      <div className="text-slate-400 text-xs md:text-sm">Target: {userStats.targetWeight}kg</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-slate-300">Progress</span>
                      <span className="text-emerald-400">{userStats.currentWeight}kg / {userStats.targetWeight}kg</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 md:h-3">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 md:h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(userStats.currentWeight / userStats.targetWeight) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 md:p-6" hover={false}>
                  <div className="flex items-center gap-3 md:gap-4 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                      <Target size={18} className="text-blue-400 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm md:text-base">Body Fat</div>
                      <div className="text-slate-400 text-xs md:text-sm">Target: 12%</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-slate-300">Current</span>
                      <span className="text-blue-400">{userStats.bodyFat}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 md:h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-500 h-2 md:h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(userStats.bodyFat / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Recent Activity</h2>
              <Card className="p-4 md:p-6" hover={false}>
                <div className="space-y-4 md:space-y-6">
                  {recentActivities.map((activity, index) => (
                    <TimelineItem key={index} {...activity} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <StatsCard
                icon={Dumbbell}
                title="Total Workouts"
                value={userStats.totalWorkouts}
                subtitle="This month: 24"
                gradient="bg-gradient-to-br from-blue-500/20 to-blue-500/20"
                textColor="text-blue-300"
              />
              <StatsCard
                icon={Flame}
                title="Calories Burned"
                value={`${(userStats.caloriesBurned / 1000).toFixed(1)}K`}
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
                gradient="bg-gradient-to-br from-blue-500/20 to-blue-500/20"
                textColor="text-blue-300"
              />
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Achievements</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {achievements.map((achievement, index) => (
                  <AchievementBadge key={index} {...achievement} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6 md:space-y-8">
            <Card className="p-4 md:p-6" hover={false}>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Activity Timeline</h2>
              <div className="space-y-6 md:space-y-8">
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
                    color: "from-red-500 to-blue-500"
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