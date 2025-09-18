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
    Bell
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
    const [flexcoins,setflexcoins] = useState(0);


    const [username, setusername] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const getUsername = async () => {
            try {
                const res = await fetch("http://localhost:8000/validate", {
                    credentials: "include", // ⬅ send cookies
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
        credentials: "include", // include cookies if needed
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
    // Mock data for demonstration
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
                        { icon: Home, label: "Dashboard", color: "from-blue-500 to-cyan-500", page: "/app" },
                        { icon: Dumbbell, label: "Workouts", active: true, color: "from-green-500 to-emerald-500", page: "/workout" },
                        { icon: Apple, label: "Nutrition", color: "from-orange-500 to-yellow-500", page: "/nutrition" },
                        { icon: Users, label: "Community", color: "from-purple-500 to-pink-500", page: "/community" },
                        { icon: Coins, label: "FlexCoins", color: "from-amber-500 to-orange-500", page: "/flexcoins" },
                    ].map(({ icon: Icon, label, active, color, page }) => (
                        <Link
                            to={page}
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
                        </Link>
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
            <main className="flex-1 ml-72 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm">
                            <Link to={"/app"}>Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-white">Current Split</span>
                        </div>
                        <h1 className="text-4xl font-bold bg-white bg-clip-text text-transparent">
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
                        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all">
                            <Play className="w-4 h-4" />
                            Quick Start
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-400">Loading your personalized workout...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Split Overview */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="w-5 h-5 text-violet-400" />
                                    <h2 className="text-xl font-bold">Weekly Split</h2>
                                </div>

                                <div className="space-y-3">
                                    {splitData.map((dayItem, index) => (
                                        <div
                                            key={dayItem.day}
                                            onClick={() =>
                                                setOpenDay(openDay === dayItem.day ? null : dayItem.day)
                                            }
                                            className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${openDay === dayItem.day
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
                                                {[...new Set(dayItem.workouts.map(w => w.exercisecategory))].slice(0, 3).map((category, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 text-xs rounded-full bg-slate-600/50 text-slate-300"
                                                    >
                                                        {category}
                                                    </span>
                                                ))}
                                                {[...new Set(dayItem.workouts.map(w => w.exercisecategory))].length > 3 && (
                                                    <span className="px-2 py-1 text-xs rounded-full bg-slate-600/50 text-slate-300">
                                                        +{[...new Set(dayItem.workouts.map(w => w.exercisecategory))].length - 3}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-xs text-slate-400">
                                                    {dayItem.workouts.length} exercises
                                                </span>
                                                <ChevronRight className={`w-4 h-4 transition-transform ${openDay === dayItem.day ? 'rotate-90 text-violet-400' : 'text-slate-400'
                                                    }`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Link
                                    to={"/split-generator"}
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold py-3 rounded-xl shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2">
                                        <RotateCcw className="w-4 h-4" />
                                        Generate New Split
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Workout Details */}
                        <div className="lg:col-span-3">
                            {openDay && (
                                <>
                                    {/* Controls */}
                                    <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    placeholder="Search exercises..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="bg-slate-800/60 border border-slate-600/50 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-violet-500/50 focus:bg-slate-800/80 transition-all min-w-[250px]"
                                                />
                                            </div>

                                            <div className="relative">
                                                <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                                <select
                                                    value={filter}
                                                    onChange={(e) => setFilter(e.target.value)}
                                                    className="bg-slate-800/60 border border-slate-600/50 pl-10 pr-8 py-3 rounded-xl outline-none focus:border-violet-500/50 appearance-none min-w-[150px]"
                                                >
                                                    <option value="">All Categories</option>
                                                    {[...new Set(splitData.flatMap(d => d.workouts.map(w => w.exercisecategory)))].map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 bg-slate-800/40 rounded-xl p-1">
                                            <button
                                                onClick={() => setViewMode("table")}
                                                className={`p-3 rounded-lg transition-all ${viewMode === "table"
                                                    ? "bg-violet-600 text-white shadow-lg"
                                                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                                                    }`}
                                            >
                                                <List className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setViewMode("card")}
                                                className={`p-3 rounded-lg transition-all ${viewMode === "card"
                                                    ? "bg-violet-600 text-white shadow-lg"
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
                                                <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 px-6 py-4 border-b border-slate-700/50">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="text-2xl font-bold">{dayItem.day}</h3>
                                                            <p className="text-slate-400 mt-1">
                                                                {getFilteredExercises(dayItem.workouts).length} exercises • Estimated 45 minutes
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Target className="w-5 h-5 text-violet-400" />
                                                            <span className="text-sm font-medium">
                                                                {Math.round((completedExercises.size / dayItem.workouts.length) * 100)}% Complete
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-6">
                                                    {viewMode === "card" ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {getFilteredExercises(dayItem.workouts).map((exercise, idx) => (
                                                                <div
                                                                    key={exercise.title}
                                                                    className={`group relative bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/30 ${completedExercises.has(exercise.title) ? 'ring-2 ring-emerald-500/50 bg-emerald-500/10' : ''
                                                                        }`}
                                                                >
                                                                    <div className="flex items-start justify-between mb-3">
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-lg font-bold text-violet-400">
                                                                                {idx + 1}
                                                                            </span>
                                                                            <div>
                                                                                <h4 className="font-bold text-lg group-hover:text-violet-400 transition-colors">
                                                                                    {exercise.title}
                                                                                </h4>
                                                                                <p className="text-sm text-slate-400">
                                                                                    {exercise.exercisecategory}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => toggleExerciseComplete(exercise.title)}
                                                                            className={`p-2 rounded-full transition-all ${completedExercises.has(exercise.title)
                                                                                ? 'bg-emerald-500 text-white'
                                                                                : 'bg-slate-600/50 hover:bg-slate-600 text-slate-400'
                                                                                }`}
                                                                        >
                                                                            <Star className={`w-4 h-4 ${completedExercises.has(exercise.title) ? 'fill-current' : ''}`} />
                                                                        </button>
                                                                    </div>

                                                                    <div className="flex items-center gap-4 mb-4">
                                                                        <div className="bg-slate-600/30 px-3 py-1 rounded-lg">
                                                                            <span className="text-sm font-semibold">{exercise.sets} sets</span>
                                                                        </div>
                                                                        <div className="bg-slate-600/30 px-3 py-1 rounded-lg">
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
                                                                                className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors"
                                                                            >
                                                                                <Play className="w-4 h-4" />
                                                                                Watch Demo
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
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full">
                                                                <thead>
                                                                    <tr className="border-b border-slate-700/50">
                                                                        <th className="text-left p-4 font-semibold text-slate-300">#</th>
                                                                        <th className="text-left p-4 font-semibold text-slate-300">Exercise</th>
                                                                        <th className="text-left p-4 font-semibold text-slate-300">Category</th>
                                                                        <th className="text-left p-4 font-semibold text-slate-300">Sets × Reps</th>
                                                                        <th className="text-left p-4 font-semibold text-slate-300">Demo</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {getFilteredExercises(dayItem.workouts).map((exercise, idx) => (
                                                                        <tr
                                                                            key={exercise.title}
                                                                            className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-all ${completedExercises.has(exercise.title) ? 'bg-emerald-500/5' : ''
                                                                                }`}
                                                                        >
                                                                            <td className="p-4 font-bold text-violet-400">{idx + 1}</td>
                                                                            <td className="p-4 font-semibold">{exercise.title}</td>
                                                                            <td className="p-4 text-slate-300">{exercise.exercisecategory}</td>
                                                                            <td className="p-4">
                                                                                <span className="bg-slate-600/30 px-2 py-1 rounded text-sm">
                                                                                    {exercise.sets} × {exercise.repetitions}
                                                                                </span>
                                                                            </td>
                                                                            <td className="p-4">
                                                                                {exercise.link && (
                                                                                    <a
                                                                                        href={exercise.link}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="flex items-center gap-1 text-violet-400 hover:text-violet-300 text-sm"
                                                                                    >
                                                                                        <Play className="w-3 h-3" />
                                                                                        Watch
                                                                                    </a>
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
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
                                    <div className="w-20 h-20 bg-slate-800/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Calendar className="w-10 h-10 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Select a Workout Day</h3>
                                    <p className="text-slate-400">Choose a day from your weekly split to view exercises</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Floating Action Button */}
                {openDay && (
                    <div className="fixed bottom-8 right-8">
                        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center gap-3 hover:scale-105">
                            <Play className="w-5 h-5" />
                            Start Workout
                            <div className="bg-white/20 px-2 py-1 rounded-lg text-xs">
                                {completedExercises.size}/{splitData.find(d => d.day === openDay)?.workouts.length || 0}
                            </div>
                        </button>
                    </div>
                )}

                {/* Progress Banner */}
                {openDay && completedExercises.size > 0 && (
                    <div className="fixed top-4 right-4 bg-gradient-to-r from-emerald-500/90 to-teal-600/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl shadow-lg">
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-semibold">
                                {completedExercises.size} of {splitData.find(d => d.day === openDay)?.workouts.length || 0} completed!
                            </span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}