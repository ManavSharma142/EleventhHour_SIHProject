import React, { useState, useEffect } from "react";
import { Home, Dumbbell, Apple, Users, Play, Coins, User, Sparkles, Target, Clock, Calendar, Activity, ChevronRight, Zap, Award, TrendingUp, Menu, X } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { nav } from "framer-motion/client";

// Mock PopularSplits component since it's imported but not defined
const PopularSplits = () => (
  <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-4 lg:p-6 border border-white/10 shadow-2xl">
    <div className="flex items-center gap-3 mb-4 lg:mb-6">
      <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-blue-500 to-blue-500 rounded-xl flex items-center justify-center">
        <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
      </div>
      <h3 className="text-base lg:text-lg font-bold text-white">Popular Splits</h3>
    </div>
    <div className="space-y-3">
      {[
        { name: "Push/Pull/Legs", users: "2.1k" },
        { name: "Upper/Lower", users: "1.8k" },
        { name: "Full Body", users: "1.5k" }
      ].map((split, i) => (
        <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium text-sm lg:text-base">{split.name}</span>
            <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{split.users} users</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function FlexoraApp() {
  const [formData, setFormData] = useState({
    time: "",
    days_per_week: "",
    category: "",
    preference: "",
    goal: "",
    other: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSplit, setGeneratedSplit] = useState(null);
  const [activeTab, setActiveTab] = useState("generator");
  const [particles, setParticles] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [flexcoins, setflexcoins] = useState(0);
  const [done, setDone] = useState(false)

  const [username, setusername] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const getUsername = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch("http://localhost:8000/validate", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to validate user");

        const data = await res.json();

        if (data?.status === "error") {
          navigate("/login");
          return;
        }

        if (data?.username) {
          setusername(data.username);
          console.log("Username:", data.username);
          getflexcoins(data.username)
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Error validating user:", err);
        navigate("/login");
      }
    };

    getUsername();
  }, []);

  const handleselectsplit = async () => {
    try {
      const res = await fetch("http://localhost:8000/workouts/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          split_id: generatedSplit.id
        }),
      });

      const data = await res.json();
      console.log(data);
      navigate("/workout");
    } catch (error) {
      console.error("Error selecting split:", error);
    }
  };

  const getflexcoins = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8000/flexcoin?username=${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setflexcoins(data.coins)
      return data;
    } catch (error) {
      console.error("Error fetching flexcoins:", error);
      return null;
    }
  };

  // Create floating particles for background animation
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setDone(false)
    setGeneratedSplit(null);

    try {
      const res = await fetch("http://localhost:8000/ai/workoutsplits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          time: formData.time,
          days_per_week: parseInt(formData.days_per_week),
          category: formData.category,
          preference: formData.preference,
          goal: formData.goal,
          other: formData.other,
        }),
      });

      const data = await res.json();
      setGeneratedSplit(data);
    } catch (err) {
      console.error("Error generating split:", err);
    } finally {
      setIsGenerating(false);
      setDone(true)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white flex relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 lg:-top-40 -right-20 lg:-right-40 w-40 h-40 lg:w-80 lg:h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 lg:-bottom-40 -left-20 lg:-left-40 w-40 h-40 lg:w-80 lg:h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-30 h-30 lg:w-60 lg:h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl shadow-xl"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-20" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-72 bg-gradient-to-b from-[#0F1729] to-[#0A1018] backdrop-blur-xl border-r border-white/10 p-4 lg:p-6 flex flex-col fixed top-0 left-0 h-full z-30 shadow-2xl transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo with animation */}
        <div className="flex items-center gap-4 mb-8 lg:mb-12 group cursor-pointer mt-12 lg:mt-0">
          <div className="relative">
<div className="w-14 h-14 rounded-2xl shadow-2xl group-hover:scale-110 transition-all duration-300">
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

    {/* Background */}
    <rect x="0" y="0" width="58" height="58" rx="14" fill="url(#grad)" />

    {/* Dumbbell icon */}
    <g
      transform="translate(17,17)"
      className="origin-center"
    >
      <path
        d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="m2.5 21.5 1.4-1.4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="m20.1 3.9 1.4-1.4" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="m9.6 14.4 4.8-4.8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
</div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          <div>
            <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-100 bg-clip-text text-transparent tracking-tight">Flexora</span>
            <div className="text-xs text-gray-400 font-medium">Fitness Reimagined</div>
          </div>
        </div>

        {/* Time Display */}
        <div className="mb-4 lg:mb-6 p-3 lg:p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-2xl border border-white/10 backdrop-blur-sm">
          <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xs lg:text-sm text-gray-400">
            {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex-1 space-y-2 lg:space-y-3">
          {[
            { icon: Home, label: "Dashboard", color: "from-blue-500 to-cyan-500", page: "/app" },
            { icon: Dumbbell, label: "Workouts", active: true, color: "from-green-500 to-emerald-500", page: "/workout" },
            { icon: Apple, label: "Nutrition", color: "from-orange-500 to-yellow-500", page: "/nutrition" },
            { icon: Users, label: "Community", color: "from-purple-500 to-pink-500", page: "/community" },
            { icon: Coins, label: "FlexCoins", color: "from-amber-500 to-orange-500", page: "/flexcoins" },
          ].map(({ icon: Icon, label, active, color, page }) => (
            <Link
              to={page}
              key={label}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-3 lg:py-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden
                                  ${active
                  ? "bg-gradient-to-r from-blue-600/20 to-blue-600/20 border border-blue-500/30 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                }`}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/10 rounded-2xl"></div>
              )}
              <div className={`relative p-2 rounded-xl ${active ? `bg-gradient-to-r ${color}` : 'bg-gray-700/50 group-hover:bg-gray-600/50'} transition-all duration-300`}>
                <Icon className="w-4 h-4 lg:w-5 lg:h-5 relative z-10" />
              </div>
              <span className="font-semibold relative z-10 text-sm lg:text-base">{label}</span>
              {active && <div className="absolute right-3 lg:right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>}
            </Link>
          ))}
        </nav>

        {/* Enhanced Profile */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-gradient-to-r from-[#1A1F2E] to-[#1E2331] rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
              <User className="w-5 h-5 lg:w-6 lg:h-6" />
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
      <div className="flex-1 p-4 lg:p-8 lg:ml-72">
        {/* Header */}
        <div className="mb-6 lg:mb-8 mt-16 lg:mt-0">
          <div className="flex items-center gap-2 text-slate-400 mb-4 text-sm">
            <Link to={"/app"}>Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Workout Generator</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
            <h1 className="text-2xl lg:text-4xl font-black bg-white bg-clip-text text-transparent">
              AI Workout Generator
            </h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full w-fit">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">AI Powered</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Main Generator */}
          <div className="flex-1 bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl rounded-3xl p-4 lg:p-8 border border-white/10 shadow-2xl">

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 lg:mb-8 p-1 bg-slate-800/50 rounded-2xl border border-white/5">
              {[
                { id: "generator", label: "Generator", icon: Zap },
                { id: "templates", label: "Templates", icon: Target },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-medium transition-all text-sm lg:text-base ${activeTab === id
                    ? "bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {activeTab === "generator" ? (
              <div className="space-y-6 lg:space-y-8">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
                  {[
                    { icon: Clock, label: "Time", value: formData.time || "Not set" },
                    { icon: Calendar, label: "Days", value: formData.days_per_week ? `${formData.days_per_week}/week` : "Not set" },
                    { icon: Target, label: "Goal", value: formData.goal || "Not set" },
                    { icon: Activity, label: "Type", value: formData.category || "Not set" },
                  ].map(({ icon: Icon, label, value }, i) => (
                    <div key={i} className="p-3 lg:p-4 bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl border border-white/10">
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400 mb-2" />
                      <div className="text-xs text-slate-400 mb-1">{label}</div>
                      <div className="text-xs lg:text-sm font-medium text-white truncate">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-slate-300 mb-3 font-medium text-sm lg:text-base">
                      <Clock className="w-4 h-4" />
                      Time per session
                    </label>
                    <input
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full p-3 lg:p-4 rounded-2xl bg-slate-800/80 border border-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder:text-slate-500 transition-all backdrop-blur-sm text-sm lg:text-base"
                      placeholder="e.g. 60 minutes"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-slate-300 mb-3 font-medium text-sm lg:text-base">
                      <Calendar className="w-4 h-4" />
                      Days per week
                    </label>
                    <select
                      name="days_per_week"
                      value={formData.days_per_week}
                      onChange={handleChange}
                      className="w-full p-3 lg:p-4 rounded-2xl bg-slate-800/80 border border-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white transition-all backdrop-blur-sm text-sm lg:text-base"
                    >
                      <option value="">Select days</option>
                      {[3, 4, 5, 6, 7].map((d) => (
                        <option key={d} value={d} className="bg-slate-800">
                          {d} Days
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-slate-300 mb-3 font-medium text-sm lg:text-base">
                      <Activity className="w-4 h-4" />
                      Workout type
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full p-3 lg:p-4 rounded-2xl bg-slate-800/80 border border-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white transition-all backdrop-blur-sm text-sm lg:text-base"
                    >
                      <option value="">Select type</option>
                      <option value="cardio" className="bg-slate-800">Cardio</option>
                      <option value="strength" className="bg-slate-800">Strength</option>
                      <option value="flexibility" className="bg-slate-800">Flexibility</option>
                      <option value="mix" className="bg-slate-800">Mixed</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-slate-300 mb-3 font-medium text-sm lg:text-base">
                      <Home className="w-4 h-4" />
                      Location
                    </label>
                    <select
                      name="preference"
                      value={formData.preference}
                      onChange={handleChange}
                      className="w-full p-3 lg:p-4 rounded-2xl bg-slate-800/80 border border-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white transition-all backdrop-blur-sm text-sm lg:text-base"
                    >
                      <option value="">Select location</option>
                      <option value="home" className="bg-slate-800">Home</option>
                      <option value="gym" className="bg-slate-800">Gym</option>
                      <option value="hybrid" className="bg-slate-800">Both</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-slate-300 mb-3 font-medium text-sm lg:text-base">
                    <Target className="w-4 h-4" />
                    Primary goal
                  </label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full p-3 lg:p-4 rounded-2xl bg-slate-800/80 border border-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white transition-all backdrop-blur-sm text-sm lg:text-base"
                  >
                    <option value="">Select your goal</option>
                    <option value="muscle_gain" className="bg-slate-800">Build Muscle</option>
                    <option value="fat_loss" className="bg-slate-800">Lose Fat</option>
                    <option value="endurance" className="bg-slate-800">Improve Endurance</option>
                    <option value="general_fitness" className="bg-slate-800">General Fitness</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-slate-300 mb-3 font-medium text-sm lg:text-base">
                    <User className="w-4 h-4" />
                    Additional notes
                  </label>
                  <textarea
                    name="other"
                    value={formData.other}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 lg:p-4 rounded-2xl bg-slate-800/80 border border-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder:text-slate-500 transition-all backdrop-blur-sm resize-none text-sm lg:text-base"
                    placeholder="Any injuries, preferences, or equipment limitations..."
                  />
                </div>

                {/* Generate Button */}
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="group relative px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 text-white font-bold rounded-2xl shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden w-full sm:w-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center gap-3">
                      {isGenerating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span className="text-sm lg:text-base">Generating your split...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span className="text-sm lg:text-base">Generate AI Workout</span>
                        </>
                      )}
                    </div>
                    {!isGenerating && (
                      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 lg:py-16">
                <Target className="w-12 h-12 lg:w-16 lg:h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Workout Templates</h3>
                <p className="text-slate-400 text-sm lg:text-base">Pre-made workout templates coming soon!</p>
              </div>
            )}

            {done && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={handleselectsplit}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-3 hover:scale-105 w-full sm:w-auto justify-center"
                >
                  <Play className="w-5 h-5" />
                  <span className="text-sm lg:text-base">Select This Split</span>
                </button>
              </div>
            )}

            {/* Results */}
            <div className="mt-6 lg:mt-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl p-4 lg:p-6 border border-white/10 min-h-[200px]">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-48">
                  <div className="flex items-center gap-2 mb-4">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-500"
                        style={{
                          animation: `pulse 1.5s ease-in-out infinite ${i * 0.3}s`,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-slate-300 font-medium text-sm lg:text-base text-center">Creating your personalized workout...</p>
                  <p className="text-slate-500 text-xs lg:text-sm mt-1 text-center">This may take a few seconds</p>
                </div>
              ) : generatedSplit ? (
                <div className="space-y-4 lg:space-y-6">
                  <div className="flex items-center gap-3 mb-4 lg:mb-6">
                    <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                    <h3 className="text-lg lg:text-xl font-bold text-white">Your AI-Generated Workout</h3>
                  </div>

                  {generatedSplit.day.map((dayObj, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-2xl p-4 lg:p-6 border border-white/10 hover:border-white/20 transition-all"
                    >
                      <h4 className="text-base lg:text-lg font-bold text-white mb-3 lg:mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                        {dayObj.day}
                      </h4>
                      <div className="grid gap-3 lg:gap-4">
                        {dayObj.workouts.map((w, i) => (
                          <div
                            key={i}
                            className="p-3 lg:p-4 bg-slate-900/60 rounded-xl border border-white/5 hover:border-white/10 transition-all"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                              <h5 className="font-semibold text-white text-sm lg:text-base">{w.title}</h5>
                              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full w-fit">
                                {w.exercisecategory}
                              </span>
                            </div>
                            <p className="text-xs lg:text-sm text-slate-400 mb-3">{w.exercisedesc}</p>
                            <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs">
                              <span className="bg-slate-800 px-2 lg:px-3 py-1 rounded-full text-slate-300">
                                {w.sets} Sets
                              </span>
                              <span className="bg-slate-800 px-2 lg:px-3 py-1 rounded-full text-slate-300">
                                {w.repetitions > 0 ? `${w.repetitions} Reps` : "Hold/AMRAP"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <Dumbbell className="w-10 h-10 lg:w-12 lg:h-12 text-slate-400 mb-4" />
                  <p className="text-slate-400 font-medium text-sm lg:text-base">Ready to create your workout?</p>
                  <p className="text-slate-500 text-xs lg:text-sm mt-1">Fill out the form above and click generate</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Popular Splits */}
          <div className="xl:w-80 order-first xl:order-last">
            <PopularSplits />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}