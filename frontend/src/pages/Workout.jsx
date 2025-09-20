
import { useEffect, useState } from "react";
import {
    Home,
    Dumbbell,
    Apple,
    Users,
    Coins,
    User,
    Search,
    List,
    Grid,
    Play,
    Clock,
    Target,
    TrendingUp,
    Calendar,
    Star,
    ChevronRight,
    Filter,
    RotateCcw,
    Settings,
    Bell,
    Menu,
    X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ModernWorkout() {
    const [splitData, setSplitData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDay, setOpenDay] = useState(null);
    const [viewMode, setViewMode] = useState("card");
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    const [completedExercises, setCompletedExercises] = useState(new Set());
    const [currentTime, setCurrentTime] = useState(new Date());
    const [flexcoins, setflexcoins] = useState(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
                    fetchWorkout(data.username);
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

    async function fetchWorkout(user) {
        try {
            const res = await fetch(
                `http://localhost:8000/workouts/selected?username=${user}`
            );
            const data = await res.json();
            setSplitData(data.day || []);
        } catch (err) {
            console.error("Error fetching workout data:", err);
        } finally {
            setLoading(false);
        }
    }

    const getFilteredExercises = (workouts) => {
        return workouts.filter(
            (ex) =>
                ex.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filter ? ex.exercisecategory === filter : true)
        );
    };

    const toggleExerciseComplete = (exerciseTitle) => {
        setCompletedExercises(prev => {
            const newSet = new Set(prev);
            if (newSet.has(exerciseTitle)) {
                newSet.delete(exerciseTitle);
            } else {
                newSet.add(exerciseTitle);
            }
            return newSet;
        });
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 1: return "bg-green-500/20 text-green-400";
            case 2: return "bg-yellow-500/20 text-yellow-400";
            case 3: return "bg-red-500/20 text-red-400";
            default: return "bg-gray-500/20 text-gray-400";
        }
    };

    const getDifficultyText = (difficulty) => {
        switch (difficulty) {
            case 1: return "Easy";
            case 2: return "Medium";
            case 3: return "Hard";
            default: return "Unknown";
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-white/10 shadow-lg"
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Enhanced Sidebar */}
            <aside className={`w-72 bg-gradient-to-b from-[#0F1729] to-[#0A1018] backdrop-blur-xl border-r border-white/10 p-4 lg:p-6 flex flex-col fixed top-0 left-0 h-full z-40 shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                {/* Logo with animation */}
                <div className="flex items-center gap-3 lg:gap-4 mb-8 lg:mb-12 group cursor-pointer">
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
                            className={`group flex items-center gap-3 lg:gap-4 px-3 lg:px-5 py-3 lg:py-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden
                                  ${active
                                    ? "bg-gradient-to-r from-blue-600/20 to-blue-600/20 border border-blue-500/30 shadow-lg"
                                    : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                                }`}
                        >
                            {active && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/10 rounded-2xl"></div>
                            )}
                            <div className={`relative p-1.5 lg:p-2 rounded-xl ${active ? `bg-gradient-to-r ${color}` : 'bg-gray-700/50 group-hover:bg-gray-600/50'} transition-all duration-300`}>
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
                    <Link to={"/profile"} className="relative flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-gradient-to-r from-[#1A1F2E] to-[#1E2331] rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl flex-shrink-0">
                            <User className="w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-white truncate text-sm">
                                {username}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Coins className="w-3 h-3 text-amber-400 flex-shrink-0" />
                                <span className="text-amber-400 font-semibold">{flexcoins}</span>
                                <span>FlexCoins</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-72 p-4 lg:p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 lg:mb-8 mt-16 lg:mt-0">
                    <div className="mb-4 lg:mb-0">
                        <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm">
                            <Link to={"/app"}>Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Current Split</span>
                        </div>
                        <h1 className="text-2xl lg:text-4xl font-bold bg-white bg-clip-text text-transparent">
                            Today's Workout
                        </h1>
                        <p className="text-slate-400 mt-2">Push your limits, track your progress</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-slate-800/60 hover:bg-slate-700/60 rounded-xl transition-all">
                            <Bell className="w-5 h-5" />
                        </button>
                        <Link
                            to={"/logworkout"}
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-4 lg:px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all text-sm lg:text-base">
                            <Play className="w-4 h-4" />
                            <span className="hidden sm:inline">Quick Start</span>
                            <span className="sm:hidden">Start</span>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-400">Loading your personalized workout...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
                        {/* Split Overview */}
                        <div className="xl:col-span-1">
                            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 lg:p-6 border border-slate-700/50 shadow-xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="w-5 h-5 text-blue-400" />
                                    <h2 className="text-lg lg:text-xl font-bold">Weekly Split</h2>
                                </div>

                                <div className="space-y-3">
                                    {splitData.map((dayItem, index) => (
                                        <div
                                            key={dayItem.day}
                                            onClick={() => {
                                                setOpenDay(openDay === dayItem.day ? null : dayItem.day);
                                                setSidebarOpen(false);
                                            }}
                                            className={`group p-3 lg:p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${openDay === dayItem.day
                                                ? "bg-white/10 shadow-lg"
                                                : "bg-slate-700/30 hover:bg-slate-700/50"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-semibold text-sm">
                                                    {dayItem.day}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                    <span className="text-xs text-slate-400">45m</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {[...new Set(dayItem.workouts.map(w => w.exercisecategory))].slice(0, 2).map((category, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 text-xs rounded-full bg-slate-600/50 text-slate-300"
                                                    >
                                                        {category}
                                                    </span>
                                                ))}
                                                {[...new Set(dayItem.workouts.map(w => w.exercisecategory))].length > 2 && (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-slate-600/50 text-slate-300">
                                                        +{[...new Set(dayItem.workouts.map(w => w.exercisecategory))].length - 2}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-xs text-slate-400">
                                                    {dayItem.workouts.length} exercises
                                                </span>
                                                <ChevronRight className={`w-4 h-4 transition-transform ${openDay === dayItem.day ? 'rotate-90 text-blue-400' : 'text-slate-400'
                                                    }`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Link
                                        to={"/split-generator"}
                                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 text-sm lg:text-base">
                                        <RotateCcw className="w-4 h-4" />
                                        <span className="hidden sm:inline">Generate New Split</span>
                                        <span className="sm:hidden">New Split</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Workout Details */}
                        <div className="xl:col-span-3">
                            {openDay && (
                                <>
                                    {/* Controls */}
                                    <div className="flex flex-col lg:flex-row gap-4 mb-6 items-stretch lg:items-center lg:justify-between">
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                            <div className="relative">
                                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    placeholder="Search exercises..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="bg-slate-800/60 border border-slate-600/50 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-blue-500/50 focus:bg-slate-800/80 transition-all w-full sm:min-w-[250px]"
                                                />
                                            </div>

                                            <div className="relative">
                                                <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                <select
                                                    value={filter}
                                                    onChange={(e) => setFilter(e.target.value)}
                                                    className="bg-slate-800/60 border border-slate-600/50 pl-10 pr-8 py-3 rounded-xl outline-none focus:border-blue-500/50 appearance-none w-full sm:min-w-[150px]"
                                                >
                                                    <option value="">All Categories</option>
                                                    {[...new Set(splitData.flatMap(d => d.workouts.map(w => w.exercisecategory)))].map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 bg-slate-800/40 rounded-xl p-1 self-start lg:self-auto">
                                            <button
                                                onClick={() => setViewMode("table")}
                                                className={`p-3 rounded-lg transition-all ${viewMode === "table"
                                                    ? "bg-blue-600 text-white shadow-lg"
                                                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                                                    }`}
                                            >
                                                <List className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setViewMode("card")}
                                                className={`p-3 rounded-lg transition-all ${viewMode === "card"
                                                    ? "bg-blue-600 text-white shadow-lg"
                                                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                                                    }`}
                                            >
                                                <Grid className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Exercise Content */}
                                    {splitData.map((dayItem) =>
                                        openDay === dayItem.day ? (
                                            <div
                                                key={dayItem.day}
                                                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden"
                                            >
                                                <div className="bg-gradient-to-r from-blue-600/20 to-blue-600/20 px-4 lg:px-6 py-4 border-b border-slate-700/50">
                                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                        <div>
                                                            <h3 className="text-xl lg:text-2xl font-bold">{dayItem.day}</h3>
                                                            <p className="text-slate-400 mt-1">
                                                                {getFilteredExercises(dayItem.workouts).length} exercises • Estimated 45 minutes
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Target className="w-5 h-5 text-blue-400" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-4 lg:p-6">
                                                    {viewMode === "card" ? (
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                            {getFilteredExercises(dayItem.workouts).map((exercise, idx) => (
                                                                <div
                                                                    key={exercise.title}
                                                                    className={`group relative bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 rounded-xl p-4 lg:p-5 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30 ${completedExercises.has(exercise.title) ? 'ring-2 ring-emerald-500/50 bg-emerald-500/10' : ''
                                                                        }`}
                                                                >
                                                                    <div className="flex items-start justify-between mb-3">
                                                                        <div className="flex items-center gap-2 min-w-0 flex-1">
                                                                            <span className="text-lg font-bold text-blue-400 flex-shrink-0">
                                                                                {idx + 1}
                                                                            </span>
                                                                            <div className="min-w-0 flex-1">
                                                                                <h4 className="font-bold text-base lg:text-lg group-hover:text-blue-400 transition-colors truncate">
                                                                                    {exercise.title}
                                                                                </h4>
                                                                                <p className="text-sm text-slate-400 truncate">
                                                                                    {exercise.exercisecategory}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-4">
                                                                        <div className="bg-slate-600/30 px-2 lg:px-3 py-1 rounded-lg">
                                                                            <span className="text-sm font-semibold">{exercise.sets} sets</span>
                                                                        </div>
                                                                        <div className="bg-slate-600/30 px-2 lg:px-3 py-1 rounded-lg">
                                                                            <span className="text-sm font-semibold">{exercise.repetitions} reps</span>
                                                                        </div>
                                                                        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                                                                            {getDifficultyText(exercise.difficulty)}
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center justify-between">
                                                                        {exercise.link && (
                                                                            <a
                                                                                href={exercise.link}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                                                                            >
                                                                                <Play className="w-4 h-4" />
                                                                                <span className="hidden sm:inline">Watch Demo</span>
                                                                                <span className="sm:hidden">Demo</span>
                                                                            </a>
                                                                        )}
                                                                        <button className="ml-auto text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-600/50 transition-all">
                                                                            <ChevronRight className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="overflow-x-auto -mx-4 lg:-mx-6">
                                                            <div className="min-w-[600px] px-4 lg:px-6">
                                                                <table className="w-full">
                                                                    <thead>
                                                                        <tr className="border-b border-slate-700/50">
                                                                            <th className="text-left p-2 lg:p-4 font-semibold text-slate-300">Sets × Reps</th>
                                                                            <th className="text-left p-2 lg:p-4 font-semibold text-slate-300">Demo</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {getFilteredExercises(dayItem.workouts).map((exercise, idx) => (
                                                                            <tr
                                                                                key={exercise.title}
                                                                                className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-all ${completedExercises.has(exercise.title) ? 'bg-emerald-500/5' : ''
                                                                                    }`}
                                                                            >
                                                                                <td className="p-2 lg:p-4 font-bold text-blue-400">{idx + 1}</td>
                                                                                <td className="p-2 lg:p-4 font-semibold">
                                                                                    <div className="max-w-[200px] truncate">{exercise.title}</div>
                                                                                </td>
                                                                                <td className="p-2 lg:p-4 text-slate-300">
                                                                                    <div className="max-w-[120px] truncate">{exercise.exercisecategory}</div>
                                                                                </td>
                                                                                <td className="p-2 lg:p-4">
                                                                                    <span className="bg-slate-600/30 px-2 py-1 rounded text-sm">
                                                                                        {exercise.sets} × {exercise.repetitions}
                                                                                    </span>
                                                                                </td>
                                                                                <td className="p-2 lg:p-4">
                                                                                    {exercise.link && (
                                                                                        <a
                                                                                            href={exercise.link}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm"
                                                                                        >
                                                                                            <Play className="w-3 h-3" />
                                                                                            <span className="hidden lg:inline">Watch</span>
                                                                                        </a>
                                                                                    )}
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : null
                                    )}
                                </>
                            )}

                            {!openDay && (
                                <div className="text-center py-16">
                                    <div className="w-16 lg:w-20 h-16 lg:h-20 bg-slate-800/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-8 lg:w-10 h-8 lg:h-10 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg lg:text-xl font-bold mb-2">Select a Workout Day</h3>
                                    <p className="text-slate-400">Choose a day from your weekly split to view exercises</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Floating Action Button */}
                {openDay && (
                    <div className="fixed bottom-4 lg:bottom-8 right-4 lg:right-8 z-30">
                        <Link to="/logworkout" className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-2 lg:gap-3 hover:scale-105">
                            <Play className="w-4 lg:w-5 h-4 lg:h-5" />
                            <span className="hidden sm:inline">Start Workout</span>
                            <span className="sm:hidden">Start</span>
                            <div className="bg-white/20 px-2 py-1 rounded-lg text-xs">
                                {completedExercises.size}/{splitData.find(d => d.day === openDay)?.workouts.length || 0}
                            </div>
                        </Link>
                    </div>
                )}

                {/* Progress Banner */}
                {openDay && completedExercises.size > 0 && (
                    <div className="fixed top-16 lg:top-4 right-4 bg-gradient-to-r from-emerald-500/90 to-teal-600/90 backdrop-blur-sm text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl shadow-lg z-20">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-semibold text-sm lg:text-base">
                                <span className="hidden sm:inline">
                                    {completedExercises.size} of {splitData.find(d => d.day === openDay)?.workouts.length || 0} completed!
                                </span>
                                <span className="sm:hidden">
                                    {completedExercises.size}/{splitData.find(d => d.day === openDay)?.workouts.length || 0}
                                </span>
                            </span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}