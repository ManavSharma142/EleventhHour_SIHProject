import React, { useEffect, useState, useRef } from "react";
import {
  Home,
  Dumbbell,
  Apple,
  Users,
  Coins,
  User,
  Flame,
  Footprints,
  TrendingUp,
  Send,
  Sparkles,
  Target,
  Zap,
  Award,
  Activity,
  Calendar,
  Menu,
  X,
  Brain,
  LogOut,
} from "lucide-react";
import ActivityHeatmap from "../components/ActivityHeatmap";
import useWebSocket from 'react-use-websocket';
import { Link, useNavigate } from "react-router-dom";
import MentalWellness from "./MentalHealth"; 

// The CircularProgress component is a helper for the visual elements
const CircularProgress = ({ percentage, color, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 12px ${color}60)`
          }}
        />
      </svg>
    </div>
  );
};

export default function ModernFitnessDashboard() {
  // Use a variable for the username to make it easier to change
  const [username, setusername] = useState("")
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://localhost:8000/wss/chatbot?username=${username}`);
  const [flexcoins, setflexcoins] = useState(0);
  const [stepsCount, setStepsCount] = useState(0);
  const [targetSteps, setTargetSteps] = useState(0);
  const [calorieCount, setCalorieCount] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [chatInput, setChatInput] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hey! I'm your AI fitness companion. How can I help you today?" }
  ]);
  const messagesEndRef = useRef(null);
  const [workoutSplit, setWorkoutSplit] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);

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
          getflexcoins(data.username);
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

  useEffect(() => {
    if (lastJsonMessage?.text) {
      const cleanedMsg = lastJsonMessage.text
        .replace(/^"|"$/g, "") // remove surrounding quotes
        .replace(/\\n/g, "<br/>") // replace \n with <br/>
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
        .trim();

      setMessages((prev) => [...prev, { type: "bot", text: cleanedMsg }]);
    }
  }, [lastJsonMessage]);

  // === NEW: Fetch and set data from Go backend ===
  useEffect(() => {
    if (username === "") {
      return
    }
    // Fetch steps and calories
    fetch(`http://localhost:8000/googlefit?username=${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTargetSteps(data.steps);
        setTargetCalories(parseInt(data.cal, 10));
      })
      .catch(error => {
        console.error("Failed to fetch Google Fit data:", error);
      });

    // Fetch workout split
    fetch(`http://localhost:8000/workouts/selected?username=${username}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setWorkoutSplit(data);
      })
      .catch(error => {
        console.error("Failed to fetch workout data:", error);
      });
  }, [username]); // The username dependency ensures this runs if the username changes

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
      return data; // This will be the response from your API
    } catch (error) {
      console.error("Error fetching flexcoins:", error);
      return null;
    }
  };

  // === MODIFIED: Animate counters based on fetched data ===
  useEffect(() => {
    const stepsTimer = setTimeout(() => {
      const stepsInterval = setInterval(() => {
        setStepsCount(prev => {
          const increment = Math.ceil((targetSteps - prev) / 8);
          if (prev + increment >= targetSteps) {
            clearInterval(stepsInterval);
            return targetSteps;
          }
          return prev + increment;
        });
      }, 40);
    }, 300);

    const caloriesTimer = setTimeout(() => {
      const caloriesInterval = setInterval(() => {
        setCalorieCount(prev => {
          const increment = Math.ceil((targetCalories - prev) / 8);
          if (prev + increment >= targetCalories) {
            clearInterval(caloriesInterval);
            return targetCalories;
          }
          return prev + increment;
        });
      }, 40);
    }, 300);

    return () => {
      clearTimeout(stepsTimer);
      clearTimeout(caloriesTimer);
    };
  }, [targetSteps, targetCalories]); // Dependencies are now the fetched target values

  // Scroll to the bottom of the messages list on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // Add user message locally
    setMessages(prev => [...prev, { type: "user", text: chatInput }]);

    // Send to backend WebSocket as JSON
    sendJsonMessage({ text: chatInput });

    // Clear the input
    setChatInput("");
  };
  // === NEW: Fetch Leaderboard data ===
  useEffect(() => {
    fetch('http://localhost:8000/leaderboard')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response for leaderboard was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Map the fetched data to include rank and color for styling
        const rankedData = data.map((item, index) => ({
          ...item,
          rank: index + 1,
          color: index === 0 ? "from-yellow-400 to-orange-400" :
            index === 1 ? "from-gray-300 to-gray-400" :
              index === 2 ? "from-amber-600 to-yellow-600" :
                "from-blue-400 to-cyan-400", // Default color for others
        }));
        setLeaderboardData(rankedData);
      })
      .catch(error => {
        console.error("Failed to fetch leaderboard data:", error);
      });
  }, []);
  // Find today's workout to display dynamically
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayWorkout = workoutSplit?.day.find(d => d.day === today);

  // Calculate percentage for circular progress bars
  const stepsPercentage = targetSteps ? Math.min(100, (stepsCount / 10000) * 100) : 0;
  const caloriesPercentage = targetCalories ? Math.min(100, (calorieCount / 2500) * 100) : 0;

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="menu-button fixed top-4 left-4 z-50 lg:hidden w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" />
      )}

      {/* === Enhanced Sidebar === */}
      <aside className={`sidebar w-72 bg-gradient-to-b from-[#0F1729] to-[#0A1018] backdrop-blur-xl border-r border-white/10 p-6 flex flex-col fixed top-0 left-0 h-full z-50 shadow-2xl transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Logo with animation */}
        <div className="flex items-center gap-4 mb-12 group cursor-pointer mt-12 lg:mt-0">
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          <div>
            <span className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-100 bg-clip-text text-transparent tracking-tight">Flexora</span>
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
            { icon: Home, label: "Dashboard", active: true, color: "from-blue-500 to-cyan-500", page: "/app" },
            { icon: Dumbbell, label: "Workouts", color: "from-green-500 to-emerald-500", page: "/workout" },
            { icon: Apple, label: "Nutrition", color: "from-orange-500 to-yellow-500", page: "/nutrition" },
            { icon: Users, label: "Community", color: "from-purple-500 to-pink-500", page: "/community" },
            { icon: Coins, label: "FlexCoins", color: "from-amber-500 to-orange-500", page: "/flexcoins" },
            
          ].map(({ icon: Icon, label, active, color, page }) => (
            <Link
              to={page}
              key={label}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden
                ${active
                  ? "bg-gradient-to-r from-blue-700/20 to-blue-700/20 border border-blue-500/30 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                }`}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/10 rounded-2xl"></div>
              )}
              <div className={`relative p-2 rounded-xl ${active ? `bg-gradient-to-r ${color}` : 'bg-gray-700/50 group-hover:bg-gray-600/50'} transition-all duration-300`}>
                <Icon className="w-5 h-5 relative z-10" />
              </div>
              <span className="font-semibold relative z-10">{label}</span>
              {active && <div className="absolute right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>}
            </Link>
          ))}
        </nav>

        {/* Enhanced Profile */}
        <div className="relative group pb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <Link to={"/profile"} className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-[#1A1F2E] to-[#1E2331] rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white truncate text-sm">
                {username}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Coins className="w-3 h-3 text-amber-400" />
                <span className="text-amber-400 font-semibold">{flexcoins.toFixed(3)}</span>
                <span>FlexCoins</span>
              </div>
            </div>
          </Link>
        </div>
        <button
          onClick={handlelogout}
          className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-[-2px] transition-transform duration-300" />
          <span className="font-semibold">Logout</span>
        </button>
      </aside>

      {/* === Enhanced Main Content === */}
      <main className="flex-1 lg:ml-72 h-screen overflow-hidden">
        {/* Mobile/Desktop Layout Container */}
        <div className="h-full flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 p-4 lg:p-8">
          {/* Left Section - Enhanced */}
          <div className="lg:col-span-8 space-y-4 lg:space-y-8 overflow-y-auto pr-2 lg:pr-4 scrollbar-hide">
            {/* Header with greeting */}
            <div className="space-y-4 pt-16 lg:pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-100 bg-clip-text text-transparent mb-2">
                    Welcome back! 👋
                  </h1>
                  <p className="text-gray-400 text-sm lg:text-lg">Ready to crush your goals today?</p>
                </div>
              </div>
            </div>

            {/* Motivational Quote - Enhanced */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-white/10">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl lg:rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base lg:text-lg font-semibold text-white mb-1">Daily Motivation</div>
                    <div className="text-sm lg:text-base text-gray-300 italic">"The only bad workout is the one that didn't happen."</div>
                    <div className="text-xs lg:text-sm text-gray-500 mt-1">— Fitness Wisdom</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
              {/* Steps Card - Redesigned */}
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard('steps')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl group-hover:blur-2xl lg:group-hover:blur-3xl transition-all duration-500"></div>

                {/* Card content */}
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-8 border border-white/10 group-hover:border-green-500/30 transition-all duration-500 transform group-hover:scale-105">

                  {/* Circular Progress behind */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CircularProgress
                      percentage={stepsPercentage}
                      color="#10B981"
                      size={window.innerWidth < 768 ? 180 : 260}
                      strokeWidth={window.innerWidth < 768 ? 4 : 6}
                    />
                  </div>

                  {/* Foreground Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-4 lg:mb-6 relative">
                      <div className="absolute inset-0 bg-green-500/30 rounded-xl lg:rounded-2xl blur-lg lg:blur-xl group-hover:blur-xl lg:group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl lg:rounded-2xl flex items-center justify-center">
                        <Footprints className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4 tracking-wide">
                      Daily Steps
                    </h3>

                    <div className="text-center">
                      <p className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                        {stepsCount.toLocaleString()}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-400">
                        of 6000 steps
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calories Card - Redesigned */}
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredCard('calories')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Glow behind card */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl group-hover:blur-2xl lg:group-hover:blur-3xl transition-all duration-500"></div>

                {/* Card content */}
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-8 border border-white/10 group-hover:border-orange-500/30 transition-all duration-500 transform group-hover:scale-105">

                  {/* Circular Progress behind */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CircularProgress
                      percentage={caloriesPercentage}
                      color="#F97316"
                      size={window.innerWidth < 768 ? 180 : 260}
                      strokeWidth={window.innerWidth < 768 ? 4 : 6}
                    />
                  </div>

                  {/* Foreground Content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-4 lg:mb-6 relative">
                      <div className="absolute inset-0 bg-orange-500/30 rounded-xl lg:rounded-2xl blur-lg lg:blur-xl group-hover:blur-xl lg:group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl lg:rounded-2xl flex items-center justify-center">
                        <Flame className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4 tracking-wide">
                      Calories Burned
                    </h3>

                    <div className="text-center">
                      <p className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                        {calorieCount.toLocaleString()}
                      </p>
                      <p className="text-xs lg:text-sm text-gray-400">
                        of 2500 cal goal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Workout + Mental Wellness Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
              {/* Today's Workout - Enhanced */}
              <div className="lg:col-span-3 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/10 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-8 border border-white/10">
                  <div className="flex items-start justify-between mb-4 lg:mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 flex items-center gap-2 lg:gap-3">
                        <Target className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
                        Today's Focus
                      </h3>
                      <div className="space-y-2">
                        <div className="px-3 py-1 bg-blue-500/20 rounded-full w-fit">
                          {todayWorkout?.workouts[0]?.title ? (
                            <span className="text-blue-400 text-xs lg:text-sm font-semibold">
                              {todayWorkout?.day} • {todayWorkout?.workouts[0]?.title}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs lg:text-sm font-semibold">
                              No workout scheduled for today
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm lg:text-base">
                          {todayWorkout?.workouts[0]?.exercisedesc || "Enjoy your rest day or generate a new workout!"}
                          💪
                        </p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl lg:text-2xl font-bold text-white">45</div>
                      <div className="text-xs text-gray-400">minutes</div>
                    </div>
                  </div>

                  <div className="space-y-3 lg:space-y-4">
                    <button className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white font-bold text-sm lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-500/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]">
                      <Link
                        to={"/logworkout"}
                        className="relative z-10 flex items-center justify-center gap-2 lg:gap-3">
                        <Zap className="w-5 h-5 lg:w-6 lg:h-6 group-hover:animate-pulse" />
                        Start Workout
                      </Link>
                    </button>

                    <button className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-600 text-black font-bold text-sm lg:text-lg px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]">
                      <Link
                        to={"/split-generator"}
                        className="relative z-10 flex items-center justify-center gap-2 lg:gap-3">
                        <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-180 transition-transform duration-500" />
                        Generate New Split
                      </Link>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mental Wellness - Enhanced */}
              <div className="lg:col-span-2 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl"></div>
                <div className="relative h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-8 border border-white/10">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-blue-500 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-lg lg:text-2xl font-bold text-white mb-2 lg:mb-3 text-center">Mental Wellness</h3>
                  <p className="text-gray-400 text-center mb-4 lg:mb-6 text-xs lg:text-sm leading-relaxed">
                    Take a moment to center yourself and find your inner strength
                  </p>
                  <button className="group bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-800 hover:to-blue-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl font-semibold text-sm lg:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30">
                    <span className="flex items-center gap-2">
                      <a href="/mental-health">Explore Mindfulness</a>
                      <Calendar className="w-3 h-3 lg:w-4 lg:h-4 group-hover:rotate-12 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Activity Heatmap */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-8 border border-white/10">
                <ActivityHeatmap />
              </div>
            </div>

            {/* Enhanced Leaderboard */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-8 border border-white/10">
                <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                  <Award className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" />
                  <h3 className="text-lg lg:text-2xl font-bold text-white">Weekly Leaderboard</h3>
                </div>
                <div className="space-y-3 lg:space-y-4">
                  <div className="p-1">
                    <div className="w-full">
                      {/* Header */}
                      <div className="flex justify-between items-center px-4 lg:px-6 py-3 border-b border-gray-700/30 mb-2">
                        <h2 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wider">Username</h2>
                        <h2 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wider">FlexCoin XP</h2>
                      </div>

                      {/* Leaderboard Items */}
                      {leaderboardData.map((user, index) => (
                        <div key={user.username} className="flex justify-between items-center px-4 lg:px-6 py-4 hover:bg-gray-800/30 transition-colors border-b border-gray-800/50">
                          {/* Left Side - User Info */}
                          <div className="flex items-center gap-3">
                            <div className="text-gray-400 font-bold text-lg lg:text-xl w-8">
                              #{index + 1}
                            </div>
                            <div>
                              <div className="text-white font-semibold text-sm lg:text-lg">
                                {user.username}
                              </div>
                              <div className="text-xs text-gray-500">
                                Fitness Enthusiast
                              </div>
                            </div>
                          </div>

                          {/* Right Side - XP */}
                          <div className="text-right">
                            <div className={`text-xl lg:text-2xl font-bold bg-gradient-to-r ${user.color} bg-clip-text text-transparent`}>
                              {user.flexcoin.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className="fixed bottom-4 right-4 z-[51] lg:hidden w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {chatOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
          </button>
          {chatOpen && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setChatOpen(false)}
            />
          )}
          {/* Enhanced Chatbot Section */}
          <div className={`
              lg:col-span-4 
              lg:block
              lg:relative 
              lg:h-auto 
              lg:p-8 
              lg:z-auto
              lg:overflow-y-hidden
              ${chatOpen ? 'fixed inset-0 z-50 p-4 block' : 'hidden'}
            `}>

            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl"></div>
            {/* Main chat window with flexbox layout */}
            <div className="relative h-full flex flex-col bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/10 overflow-hidden">

              {/* Chat Header */}
              <div className="p-4 lg:p-6 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3 lg:gap-4">
                  {/* Enhanced AI Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-2xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 132 132"
                        fill="none"
                        className="text-white lg:w-7 lg:h-7"
                      >
                        <path
                          d="M103.556 103.556C97.1129 110 86.7416 110 66 110C45.2582 110 34.8873 110 28.4436 103.556C22 97.1129 22 86.7416 22 66C22 45.2582 22 34.8873 28.4436 28.4436C34.8873 22 45.2582 22 66 22C86.7416 22 97.1129 22 103.556 28.4436C110 34.8873 110 45.2582 110 66C110 86.7416 110 97.1129 103.556 103.556Z"
                          stroke="currentColor"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M63.1411 43.2406C64.1228 40.5865 67.8771 40.5865 68.8589 43.2406L73.2611 55.1364C73.8787 56.8056 75.1943 58.1212 76.8636 58.7389L88.7595 63.1411C91.4133 64.1228 91.4133 67.8771 88.7595 68.8589L76.8636 73.2611C75.1943 73.8787 73.8787 75.1943 73.2611 76.8636L68.8589 88.7595C67.8771 91.4133 64.1228 91.4133 63.1411 88.7595L58.7389 76.8636C58.1212 75.1943 56.8056 73.8787 55.1364 73.2611L43.2406 68.8589C40.5865 67.8771 40.5865 64.1228 43.2406 63.1411L55.1364 58.7389C56.8056 58.1212 58.1212 56.8056 58.7389 55.1364L63.1411 43.2406Z"
                          stroke="currentColor"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 rounded-xl lg:rounded-2xl blur-lg lg:blur-xl opacity-40 animate-pulse"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 lg:w-5 lg:h-5 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-100 bg-clip-text text-transparent">
                      Gym Bro
                    </h3>
                    <div className="flex items-center gap-2 text-xs lg:text-sm">
                      <span className="text-gray-400">AI Chat Bot</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg lg:rounded-xl flex items-center justify-center cursor-pointer transition-colors duration-200">
                      <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Area - This is the key change. */}
              {/* The flex-1 makes it grow to fill available space, and overflow-y-auto makes it scroll. */}
              <div className="flex-1 p-3 lg:p-6 space-y-4 lg:space-y-6 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col justify-centre space-y-2">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] ${message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white ml-2 lg:ml-4'
                        : 'bg-gradient-to-r from-gray-700/80 to-gray-600/80 text-white border border-white/10 mr-2 lg:mr-4'
                        } px-3 lg:px-5 py-3 lg:py-4 rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-sm relative group`}>
                        {/* Message glow effect */}
                        {message.type === 'user' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-600 rounded-2xl lg:rounded-3xl blur-lg lg:blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
                        )}

                        <div className="relative z-10">
                          <p className="text-xs lg:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: message.text }}></p>
                          {message.type === 'bot' && (
                            <div className="flex items-center gap-2 mt-2 lg:mt-3 text-xs text-gray-400">
                              <Sparkles className="w-2 h-2 lg:w-3 lg:h-3" />
                              <span>AI Assistant</span>
                              <span>•</span>
                              <span>Just now</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 lg:p-6 border-t border-white/10 bg-gradient-to-r from-gray-800/50 to-gray-700/50 shrink-0">
                <div className="flex gap-2 lg:gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything about fitness, nutrition, or your goals..."
                      className="w-full bg-gray-700/50 border border-white/20 rounded-xl lg:rounded-2xl px-4 lg:px-6 py-3 lg:py-4 text-xs lg:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:bg-gray-600/50 transition-all duration-300 backdrop-blur-sm"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-500/5 rounded-xl lg:rounded-2xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    className="group relative w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-xl lg:rounded-2xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-xl hover:shadow-blue-500/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-600 rounded-xl lg:rounded-2xl blur-lg lg:blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Send className="relative z-10 w-4 h-4 lg:w-5 lg:h-5 mx-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-1 lg:gap-2 mt-3 lg:mt-4 flex-wrap">
                  {[
                    "💪 Today's workout",
                    "🥗 Meal suggestions",
                    "📊 Progress report",
                    "🎯 Set new goals"
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setChatInput(action.split(' ').slice(1).join(' '))}
                      className="text-xs bg-gray-700/30 hover:bg-gray-600/50 text-gray-300 hover:text-white px-2 lg:px-3 py-1 lg:py-2 rounded-lg lg:rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 backdrop-blur-sm"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
