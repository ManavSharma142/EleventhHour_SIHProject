import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  Gem,
  Target,
  Moon,
  Zap,
  Star,
  Shield,
  CheckCircle,
  XCircle,
  ShoppingBag,
  Heart,
  // NEW IMPORTS FOR SIDEBAR
  Home, 
  Users, 
  Apple, 
  Dumbbell, 
  User, 
  X, 
  Menu 
} from "lucide-react";

// Mock Link component to allow the sidebar navigation elements to render in a standalone environment
const Link = ({ to, children, className, onClick }) => (
    <a href={to} onClick={onClick} className={className}>
        {children}
    </a>
);

// --- Placeholder Data & Constants ---
const API_BASE_URL = "http://localhost:8000";

// Placeholder functions since React Router 'navigate' and other app-specific functions are not available here.
const navigate = (path) => console.log(`[NAVIGATION] Attempted to navigate to: ${path}`);
const fetchSelectedSplit = (username) => console.log(`[SPLIT FETCH] Fetching split for: ${username}`);
// Note: We are using localStorage for the token as per your snippet, but in a real app, 
// using Firestore or secure HTTP-only cookies is safer.

const storeItems = [
  {
    id: 1,
    name: "Focus Elixir (30 min)",
    type: "Boost",
    description: "Temporarily boosts concentration and mental clarity for challenging tasks.",
    cost: 500,
    icon: Target,
    color: "from-blue-400 to-cyan-500",
  },
  {
    id: 2,
    name: "Zen Dashboard Theme",
    type: "Cosmetic",
    description: "Unlocks a calming, animated background for your main dashboard.",
    cost: 1200,
    icon: Moon,
    color: "from-indigo-400 to-purple-500",
  },
  {
    id: 3,
    name: "Energy Surge Potion",
    type: "Boost",
    description: "Instantly recharges your rest meter, great for quick study breaks.",
    cost: 850,
    icon: Zap,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    name: "Aura Shield Icon",
    type: "Cosmetic",
    description: "A rare profile badge showing your dedication to self-care.",
    cost: 1800,
    icon: Shield,
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 5,
    name: "Triple XP Pass (1 day)",
    type: "Boost",
    description: "Earn 3x experience points on all completed wellness plans for 24 hours.",
    cost: 2500,
    icon: Star,
    color: "from-rose-500 to-red-600",
  },
  {
    id: 6,
    name: "Heartful Streak Saver",
    type: "Utility",
    description: "Protects your daily streak from one missed session (one-time use).",
    cost: 1000,
    icon: Heart,
    color: "from-pink-500 to-violet-500",
  },
];

const StoreItemCard = ({ item, userCoins, onPurchase }) => {
  const isAffordable = userCoins >= item.cost;
  const IconComponent = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`relative h-full bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 transition-all duration-300 ${
        isAffordable ? "group hover:border-green-500/50 hover:shadow-xl cursor-pointer" : "opacity-60 cursor-not-allowed"
      }`}
      onClick={() => isAffordable && onPurchase(item)}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${item.color}/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-r ${item.color} rounded-xl shadow-lg`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className={`text-xs font-semibold px-3 py-1 rounded-full ${item.type === 'Boost' ? 'bg-orange-500/20 text-orange-300' : 'bg-purple-500/20 text-purple-300'}`}>
            {item.type}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-1 font-bold text-lg">
            <Coins className="w-5 h-5 text-amber-400" />
            {/* UPDATED: Format item cost for readability */}
            <span className="text-amber-300">{item.cost.toLocaleString('en-US')}</span>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); isAffordable && onPurchase(item); }}
            disabled={!isAffordable}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md ${
              isAffordable
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:scale-105"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isAffordable ? "Buy Now" : "Too Expensive"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function FlexcoinStore() {
  // --- New State for Auth and Data Fetching ---
  const [userCoins, setUserCoins] = useState(0); // Initialize at 0, fetched from API
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  
  // --- NEW STATE FOR SIDEBAR ---
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Existing state for feedback
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // --- API Functions (based on user's snippet) ---
  const getFlexcoins = async (currentUsername) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/flexcoin?username=${currentUsername}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (data.coins !== undefined) {
        setUserCoins(data.coins);
      }
      return data;
    } catch (error) {
      console.error("Error fetching flexcoins:", error);
      // We don't set global error here, as main auth useEffect handles initial loading.
    }
  };

  const handlePurchase = async (item) => {
    // Check local balance first for instant feedback
    if (userCoins >= item.cost) {
      // Optimistically calculate new balance for immediate UI update
      const newCoins = userCoins - item.cost;
      setUserCoins(newCoins);

      try {
        // --- Mock Purchase API Call (Replace with your actual purchase API) ---
        // await fetch(`${API_BASE_URL}/purchase`, {
        //   method: 'POST',
        //   headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
        //   body: JSON.stringify({ username, item_id: item.id, cost: item.cost })
        // });
        
        setFeedbackMessage({ 
            type: 'success', 
            // UPDATED: Format new balance
            text: `Success! You purchased "${item.name}". Remaining coins: ${newCoins.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
        });

        // Re-fetch actual balance from the backend to ensure synchronization
        if (username) {
            await getFlexcoins(username);
        }

      } catch (error) {
        console.error("Purchase failed:", error);
        // Rollback optimistic update if the API call fails
        setUserCoins(userCoins); // Rollback to original amount
        setFeedbackMessage({ type: 'error', text: `Purchase failed due to connection error. Please try again.` });
      }

    } else {
      // UPDATED: Format required coins
      setFeedbackMessage({ type: 'error', text: `Error: You need ${(item.cost - userCoins).toFixed(2).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} more FlexCoins to buy "${item.name}".` });
    }
    
    setTimeout(() => setFeedbackMessage(null), 4000);
  };
  const [flexcoins,setflexcoins] = useState(0);
  
  // --- Auth and Initial Data Fetching Effect (based on user's snippet) ---
  useEffect(() => {
    const getUsername = async () => {
      setIsLoading(true);
      setIsError(false);
      
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        setIsLoading(false);
        return;
      }
      
      const maxRetries = 3;
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          const res = await fetch(`${API_BASE_URL}/validate`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) throw new Error("Failed to validate user");

          const data = await res.json();

          if (data?.status === "error" || !data?.username) {
            navigate("/login");
            setIsLoading(false);
            return;
          }

          setUsername(data.username);
          console.log("Username:", data.username);
          fetchSelectedSplit(data.username); // Placeholder call
          await getFlexcoins(data.username);

          setIsLoading(false);
          return; // Exit loop on success

        } catch (err) {
          console.error(`Error validating user (Attempt ${attempt + 1}):`, err);
          if (attempt < maxRetries - 1) {
            const delay = Math.pow(2, attempt) * 1000;
            // Implement exponential backoff delay
            await new Promise(resolve => setTimeout(resolve, delay));
          } else {
            // Final attempt failed
            setIsError(true);
            setIsLoading(false);
            navigate("/login");
          }
        }
      }
    };

    getUsername();
  }, []);

  // --- NEW: Time Update Effect for Sidebar ---
  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentTime(new Date());
      }, 60000); // Update every minute
      return () => clearInterval(timer);
  }, []);


  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white overflow-hidden font-sans">
      
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* NEW: Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* NEW: Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* NEW: Sidebar Component Integration */}
      <aside className={`w-72 bg-gradient-to-b from-[#0F1729] to-[#0A1018] backdrop-blur-xl border-r border-white/10 p-4 sm:p-6 flex flex-col fixed top-0 left-0 h-full z-50 shadow-2xl transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Mobile Close Button (Replaced Button component with standard button) */}
        <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl"
        >
            <X className="w-5 h-5" />
        </button>

        {/* Logo with animation */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12 group cursor-pointer">
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div>
                <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-100 bg-clip-text text-transparent tracking-tight">Flexora</span>
                <div className="text-xs text-gray-400 font-medium">Fitness Reimagined</div>
            </div>
        </div>

        {/* Time Display */}
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="flex-1 space-y-2 sm:space-y-3">
            {[
                { icon: Home, label: "Dashboard", color: "from-blue-500 to-cyan-500", page: "/app" },
                { icon: Dumbbell, label: "Workouts", active: false, color: "from-green-500 to-emerald-500", page: "/workout" },
                { icon: Apple, label: "Nutrition", color: "from-orange-500 to-yellow-500", page: "/nutrition" },
                { icon: Users, label: "Community", color: "from-purple-500 to-pink-500", page: "/community" },
                { icon: Coins, label: "FlexCoins", active: true, color: "from-amber-500 to-orange-500", page: "/flexcoins" }, // Set active: true for this page
            ].map(({ icon: Icon, label, active, color, page }) => (
                <Link
                    to={page}
                    key={label}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden
                        ${active
                            ? "bg-gradient-to-r from-amber-600/20 to-amber-600/20 border border-amber-500/30 shadow-lg" // Adjusted active style to amber/coins theme
                            : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                        }`}
                >
                    {active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 to-amber-600/10 rounded-2xl"></div>
                    )}
                    <div className={`relative p-2 rounded-xl ${active ? `bg-gradient-to-r ${color}` : 'bg-gray-700/50 group-hover:bg-gray-600/50'} transition-all duration-300`}>
                        <Icon className="w-4 sm:w-5 h-4 sm:h-5 relative z-10" />
                    </div>
                    <span className="font-semibold relative z-10 text-sm sm:text-base">{label}</span>
                    {active && <div className="absolute right-4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>}
                </Link>
            ))}
        </nav>

        {/* Enhanced Profile */}
        <div className="relative group mt-auto"> {/* Added mt-auto to push it to the bottom */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <Link to={"/profile"} className="relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-[#1A1F2E] to-[#1E2331] rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <User className="w-5 sm:w-6 h-5 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="font-bold text-white truncate text-xs sm:text-sm">
                        {username || 'Guest'} {/* Use state username */}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Coins className="w-3 h-3 text-amber-400" />
                        <span className="text-amber-400 font-semibold">{userCoins.toFixed(3)}</span> {/* Use state userCoins */}
                        <span>FlexCoins</span>
                    </div>
                </div>
            </Link>
        </div>
      </aside>

      {/* Main Content Area - ADJUSTED MARGIN */}
      <main className="flex-1 lg:ml-72 overflow-y-auto p-4 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-8 pt-16 lg:pt-0">
          
          {isLoading ? (
            // --- Loading State UI ---
            <div className="h-96 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Gem className="w-12 h-12 text-amber-500" />
                </motion.div>
                <p className="text-xl text-gray-400">Loading FlexCoin data and verifying user...</p>
              </div>
            </div>
          ) : isError ? (
            // --- Error State UI ---
            <div className="p-8 text-center bg-red-800/20 rounded-xl border border-red-500/50">
                <XCircle className="w-10 h-10 mx-auto text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-red-300">Authentication Error</h2>
                <p className="text-gray-400 mt-2">
                    Could not connect to the server or validate your session. Please log in again.
                </p>
                {/* Mock button for navigation */}
                <button 
                    onClick={() => navigate("/login")}
                    className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-colors"
                >
                    Go to Login
                </button>
            </div>
          ) : (
            // --- Content Loaded ---
            <>
              {/* Header and Coin Balance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 pb-4 border-b border-white/10"
              >
                <div className="space-y-1">
                  <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 bg-clip-text text-transparent flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-amber-500" />
                    FlexCoins Store
                  </h1>
                  <p className="text-gray-400 text-sm lg:text-lg">
                    Welcome back, {username}. Trade your earned FlexCoins for exclusive items and boosts.
                  </p>
                </div>

                {/* Coin Balance Card */}
                <div className="relative p-3 lg:p-4 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded-xl border border-amber-500/50 shadow-2xl min-w-[200px]">
                  <div className="text-sm text-gray-300 font-semibold mb-1">Your Balance</div>
                  <div className="flex items-center gap-2">
                    <Coins className="w-6 h-6 text-amber-400 animate-bounce-slow" />
                    {/* UPDATED: Format user coins with thousands separator and two decimals */}
                    <span className="text-2xl lg:text-3xl font-black text-white">
                      {userCoins.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Feedback Message */}
              <AnimatePresence>
                {feedbackMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-xl font-semibold flex items-start gap-3 shadow-2xl ${
                      feedbackMessage.type === 'success'
                        ? 'bg-green-600/20 text-green-300 border border-green-500'
                        : 'bg-red-600/20 text-red-300 border border-red-500'
                    }`}
                  >
                    {feedbackMessage.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <span className="text-sm lg:text-base">{feedbackMessage.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Store Items Grid */}
              <div className="space-y-4">
                <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-2">
                  <Gem className="w-6 h-6 text-yellow-400" />
                  Available Items
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {storeItems.map((item) => (
                    <StoreItemCard
                      key={item.id}
                      item={item}
                      userCoins={userCoins}
                      onPurchase={handlePurchase}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
