import { useState, useEffect } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card } from "../components/ui/Card"
import { Play, User, Home, Dumbbell, Apple, Users, Coins, Clock, Plus, Trash2, Pause, Square, Search, ChevronDown, Star, Trophy, Flame, Target, Activity, Zap, BarChart3, Settings, Bell, Share2, Heart, TrendingUp } from "lucide-react"
import { use } from "react"
import { Link, useNavigate } from 'react-router-dom';

export default function LogWorkout() {
    // API-related state
    const [selectedSplit, setSelectedSplit] = useState(null)
    const [currentDay, setCurrentDay] = useState("Monday")
    const [splitId, setSplitId] = useState("")
    const [workoutProgressData, setWorkoutProgressData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    // Exercise state - will be populated from API
    const [exercises, setExercises] = useState([])

    const [timer, setTimer] = useState(0)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [selectedExercise, setSelectedExercise] = useState("Bench Press")
    const [currentVideo, setCurrentVideo] = useState("bench-press")
    const [restTimer, setRestTimer] = useState(0)
    const [isResting, setIsResting] = useState(false)
    const [workoutIntensity, setWorkoutIntensity] = useState("moderate")
    const [showStatsModal, setShowStatsModal] = useState(false)
    const [currentStreak, setCurrentStreak] = useState(7)
    const [totalVolume, setTotalVolume] = useState(0)
    const [username, setusername] = useState("")
    const [currentTime, setCurrentTime] = useState(new Date());
    const [flexcoins,setflexcoins] = useState(0);

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
                    fetchSelectedSplit(data.username)
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
    // API Functions
    const fetchSelectedSplit = async (user) => {
        try {
            setLoading(true);
            console.log('Fetching selected split for:', user);
            const response = await fetch(`http://localhost:8000/workouts/selected?username=${user}`);
            if (!response.ok) {
                throw new Error('Failed to fetch selected split');
            }
            const data = await response.json();
            setSelectedSplit(data);
            setSplitId(data.id);

            // Set exercises for current day
            const currentDayData = data.day.find(day => day.day === currentDay);
            if (currentDayData) {
                const formattedExercises = currentDayData.workouts.map((workout, index) => ({
                    id: index + 1,
                    name: workout.title,
                    category: workout.exercisecategory,
                    description: workout.exercisedesc,
                    link: workout.link,
                    sets: Array.from({ length: workout.sets }, (_, setIndex) => ({
                        id: setIndex + 1,
                        repetitions: workout.repetitions.toString(),
                        weight: "",
                        completed: false,
                    })),
                    isLogged: false, // Initialize as not logged
                }));
                setExercises(formattedExercises);
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching selected split:', err);
        } finally {
            setLoading(false);
        }
    };

    const setactiveday = async (username) => {
        const count = 1;

        try {
            const res = await fetch(
                `http://localhost:8000/activedays?username=${username}&count=${count}`,
                {
                    method: "GET",
                    credentials: "include" // include cookies if needed
                }
            );

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error("Error setting active day:", error);
        }
};

    const fetchWorkoutProgress = async () => {
        try {
            console.log('Fetching progress for:', { username, splitId, currentDay });
            const response = await fetch(`http://localhost:8000/workouts/progress?username=${username}&split_id=${splitId}&day=${currentDay}`);
            if (!response.ok) {
                throw new Error('Failed to fetch workout progress');
            }
            const data = await response.json();
            console.log('Progress data received:', data);
            setWorkoutProgressData(data);

            // Update exercises with detailed progress data
            if (data.length > 0 && data[0].exercise) {
                setExercises(prevExercises =>
                    prevExercises.map(exercise => {
                        // Find if this exercise has been logged with detailed data
                        const loggedExercise = data[0].exercise.find(loggedEx =>
                            typeof loggedEx === 'object' && loggedEx.exercisename === exercise.name
                        );

                        if (loggedExercise && loggedExercise.sets) {
                            // Update exercise with logged data and mark as completed
                            return {
                                ...exercise,
                                sets: exercise.sets.map((set, index) => ({
                                    ...set,
                                    repetitions: loggedExercise.sets[index]?.repetitions?.toString() || set.repetitions,
                                    weight: loggedExercise.sets[index]?.weight?.toString() || set.weight,
                                    completed: true
                                })),
                                isLogged: true // Add a flag to track if exercise is logged
                            };
                        }

                        // Check if exercise was logged as just a string (backward compatibility)
                        const isLoggedAsString = data[0].exercise.includes(exercise.name);
                        if (isLoggedAsString) {
                            return {
                                ...exercise,
                                sets: exercise.sets.map(set => ({
                                    ...set,
                                    completed: true
                                })),
                                isLogged: true
                            };
                        }

                        return {
                            ...exercise,
                            isLogged: false
                        };
                    })
                );
            }
        } catch (err) {
            console.error('Error fetching workout progress:', err);
        }
    };

    const markExerciseDone = async (exerciseId) => {
        try {
            const exercise = exercises.find(ex => ex.id === exerciseId);
            if (!exercise) return;

            // Create detailed exercise data
            const exerciseData = {
                exercisename: exercise.name,
                sets: exercise.sets.map(set => ({
                    repetitions: parseInt(set.repetitions) || 0,
                    weight: parseInt(set.weight) || 0
                }))
            };

            // Get current progress and add new exercise data
            const currentProgress = workoutProgressData.length > 0 ? workoutProgressData[0].exercise : [];
            const updatedExercise = [...currentProgress, exerciseData];

            const response = await fetch('http://localhost:8000/workouts/markdone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    day: currentDay,
                    split_id: splitId,
                    exercise: updatedExercise
                })
            });

            if (!response.ok) {
                throw new Error('Failed to mark exercise as done');
            }

            // Update local state to mark exercise as logged
            setExercises(prevExercises =>
                prevExercises.map(ex =>
                    ex.id === exerciseId
                        ? { ...ex, isLogged: true, sets: ex.sets.map(set => ({ ...set, completed: true })) }
                        : ex
                )
            );

            // Show success message
            alert(`Successfully logged ${exercise.name} with ${exercise.sets.length} sets!`);
            getflexcoins(username)
            setactiveday(username)

            // Refresh progress data
            await fetchWorkoutProgress();
        } catch (err) {
            console.error('Error marking exercise as done:', err);
            alert('Failed to log exercise. Please try again.');
        }
    };


    const changeDay = async (newDay) => {
        setCurrentDay(newDay);
        // Fetch exercises for the new day
        if (selectedSplit) {
            const dayData = selectedSplit.day.find(day => day.day === newDay);
            if (dayData) {
                const formattedExercises = dayData.workouts.map((workout, index) => ({
                    id: index + 1,
                    name: workout.title,
                    category: workout.exercisecategory,
                    description: workout.exercisedesc,
                    link: workout.link,
                    sets: Array.from({ length: workout.sets }, (_, setIndex) => ({
                        id: setIndex + 1,
                        repetitions: workout.repetitions.toString(),
                        weight: "",
                        completed: false,
                    })),
                    isLogged: false, // Initialize as not logged
                }));
                setExercises(formattedExercises);
            }
        }
        // Fetch progress for the new day
        await fetchWorkoutProgress();
    };
    // Sample exercise videos
    const exerciseVideos = {
        "bench press": "dQw4w9WgXcQ",
        "squats": "aX-YuvQkSRE",
        "deadlift": "op9kVnSso6Q",
        "overhead press": "2yjwXTZQDDI",
        "barbell row": "9efgcAjQe7E"
    }

    // Initialize data on component mount
    // Fetch progress when splitId, currentDay, and exercises are available
    useEffect(() => {
        if (splitId && currentDay && exercises.length > 0) {
            fetchWorkoutProgress();
        }
    }, [splitId, currentDay, exercises.length]);

    useEffect(() => {
        let interval
        if (isTimerRunning && timer >= 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev + 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [isTimerRunning])

    useEffect(() => {
        let interval
        if (isResting && restTimer > 0) {
            interval = setInterval(() => {
                setRestTimer((prev) => prev - 1)
            }, 1000)
        } else if (restTimer === 0 && isResting) {
            setIsResting(false)
        }
        return () => clearInterval(interval)
    }, [isResting, restTimer])

    useEffect(() => {
        // Calculate total volume (sets * reps * weight)
        const volume = exercises.reduce((total, exercise) => {
            return total + exercise.sets.reduce((setTotal, set) => {
                const reps = parseInt(set.repetitions) || 0
                const weight = parseInt(set.weight) || 0
                return setTotal + (reps * weight)
            }, 0)
        }, 0)
        setTotalVolume(volume)
    }, [exercises])
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
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const startTimer = () => setIsTimerRunning(true)
    const pauseTimer = () => setIsTimerRunning(false)
    const stopTimer = () => {
        setIsTimerRunning(false)
        setTimer(0)
    }

    const startRest = (duration = 90) => {
        setRestTimer(duration)
        setIsResting(true)
    }

    const addExercise = () => {
        const newExercise = {
            id: exercises.length + 1,
            name: "",
            sets: [
                { id: 1, repetitions: "", weight: "", completed: false },
            ],
        }
        setExercises([...exercises, newExercise])
    }

    const addSet = (exerciseId) => {
        setExercises((prev) =>
            prev.map((exercise) =>
                exercise.id === exerciseId
                    ? {
                        ...exercise,
                        sets: [
                            ...exercise.sets,
                            {
                                id: exercise.sets.length + 1,
                                repetitions: "",
                                weight: "",
                                completed: false,
                            },
                        ],
                    }
                    : exercise,
            ),
        )
    }

    const deleteSet = (exerciseId, setId) => {
        setExercises((prev) =>
            prev.map((exercise) =>
                exercise.id === exerciseId
                    ? {
                        ...exercise,
                        sets: exercise.sets.filter((set) => set.id !== setId),
                    }
                    : exercise,
            ),
        )
    }

    const updateSet = (exerciseId, setId, field, value) => {
        setExercises((prev) =>
            prev.map((exercise) =>
                exercise.id === exerciseId
                    ? {
                        ...exercise,
                        sets: exercise.sets.map((set) => (set.id === setId ? { ...set, [field]: value } : set)),
                    }
                    : exercise,
            ),
        )
    }


    const updateExerciseName = (exerciseId, name) => {
        setExercises((prev) => prev.map((exercise) => (exercise.id === exerciseId ? { ...exercise, name } : exercise)))
    }

    const handleExerciseClick = (exerciseName) => {
        setSelectedExercise(exerciseName)
        const videoKey = exerciseName.toLowerCase()
        setCurrentVideo(exerciseVideos[videoKey] || "dQw4w9WgXcQ")
    }

    const completedExercises = exercises.filter(exercise => exercise.isLogged).length
    const totalExercises = exercises.length
    const workoutProgress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

            </div>

            {/* Advanced Stats Modal */}
            {showStatsModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-700/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Workout Analytics</h2>
                            <Button onClick={() => setShowStatsModal(false)} variant="ghost" className="rounded-2xl">
                                <span className="text-2xl">&times;</span>
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <TrendingUp className="w-8 h-8 text-blue-300" />
                                    <div>
                                        <h3 className="text-lg font-bold text-blue-300">Total Volume</h3>
                                        <p className="text-3xl font-bold text-white">{totalVolume.toLocaleString()}</p>
                                        <p className="text-sm text-blue-400">lbs lifted</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Activity className="w-8 h-8 text-green-300" />
                                    <div>
                                        <h3 className="text-lg font-bold text-green-300">Intensity</h3>
                                        <p className="text-3xl font-bold text-white capitalize">{workoutIntensity}</p>
                                        <p className="text-sm text-green-400">current level</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock className="w-8 h-8 text-purple-300" />
                                    <div>
                                        <h3 className="text-lg font-bold text-purple-300">Duration</h3>
                                        <p className="text-3xl font-bold text-white">{formatTime(timer)}</p>
                                        <p className="text-sm text-purple-400">active time</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Flame className="w-8 h-8 text-orange-300" />
                                    <div>
                                        <h3 className="text-lg font-bold text-orange-300">Est. Calories</h3>
                                        <p className="text-3xl font-bold text-white">{Math.round(timer * 4.2)}</p>
                                        <p className="text-sm text-orange-400">burned</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Records */}
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Trophy className="w-6 h-6 text-amber-400" />
                                Personal Records
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-slate-700/20 rounded-xl">
                                    <span className="font-medium text-slate-300">Bench Press</span>
                                    <span className="font-bold text-amber-300">225 lbs</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-700/20 rounded-xl">
                                    <span className="font-medium text-slate-300">Squats</span>
                                    <span className="font-bold text-amber-300">315 lbs</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-700/20 rounded-xl">
                                    <span className="font-medium text-slate-300">Deadlift</span>
                                    <span className="font-bold text-amber-300">405 lbs</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => setShowStatsModal(false)}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-2xl py-3"
                        >
                            Close Analytics
                        </Button>
                    </div>
                </div>
            )}

            {/* Rest Timer Overlay */}
            {isResting && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-700/50 text-center">
                        <Clock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Rest Time</h3>
                        <div className="text-6xl font-mono font-bold text-blue-300 mb-4">{formatTime(restTimer)}</div>
                        <Button onClick={() => setIsResting(false)} className="bg-blue-500 hover:bg-blue-600">
                            Skip Rest
                        </Button>
                    </div>
                </div>
            )}

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
            <div className="flex-1 flex flex-col relative z-10 ml-72">
                {/* Enhanced Header */}
                <header className="bg-slate-800/20 backdrop-blur-2xl border-b border-slate-700/30 p-8 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                                <Link to="/app">Home</Link>
                                <ChevronDown className="w-3 h-3 rotate-270" />
                                <Link to="/workout">Current Split</Link>
                                <ChevronDown className="w-3 h-3 rotate-270" />
                                <span className="text-white font-medium">Log Workout</span>
                            </div>
                            <h1 className="text-5xl font-bold bg-white bg-clip-text text-transparent mb-2">
                                {currentDay} Workout
                            </h1>
                            <p className="text-slate-400 text-lg">
                                {selectedSplit ?
                                    selectedSplit.day.find(day => day.day === currentDay)?.workouts.map(w => w.exercisecategory).join(', ') || 'Loading...'
                                    : 'Loading...'
                                } • {exercises.length} exercises
                            </p>

                            {/* Day Selector */}
                            {selectedSplit && (
                                <div className="flex gap-2 mt-4">
                                    {selectedSplit.day.map((day) => (
                                        <Button
                                            key={day.day}
                                            onClick={() => changeDay(day.day)}
                                            className={`px-4 py-2 rounded-xl transition-all duration-300 ${currentDay === day.day
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                                : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                                                }`}
                                        >
                                            {day.day}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Enhanced Timer and Controls */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 bg-gradient-to-r from-slate-800/60 to-slate-800/40 px-8 py-4 rounded-3xl shadow-2xl backdrop-blur-sm border border-slate-600/20">
                                <Clock className="w-7 h-7 text-blue-400" />
                                <span className="text-4xl font-mono font-bold text-white">{formatTime(timer)}</span>
                            </div>

                            <div className="flex gap-3">
                                {!isTimerRunning ? (
                                    <Button onClick={startTimer} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl px-8 py-4 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300">
                                        <Play className="w-5 h-5 mr-2" />
                                        Start Workout
                                    </Button>
                                ) : (
                                    <Button onClick={pauseTimer} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl px-8 py-4 shadow-lg shadow-amber-500/25">
                                        <Pause className="w-5 h-5 mr-2" />
                                        Pause
                                    </Button>
                                )}
                                <Button onClick={stopTimer} variant="outline" className="rounded-2xl px-8 py-4 border-2 border-slate-600/50 hover:border-slate-500 backdrop-blur-sm">
                                    <Square className="w-5 h-5 mr-2" />
                                    Stop
                                </Button>
                                <Button className="rounded-2xl px-6 py-4 bg-slate-800/40 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-600/30">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Enhanced Content */}
                <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Loading State */}
                    {loading && (
                        <div className="xl:col-span-3 flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-xl text-slate-300">Loading your workout...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="xl:col-span-3 flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl text-red-400">⚠</span>
                                </div>
                                <p className="text-xl text-red-300 mb-4">Error loading workout</p>
                                <p className="text-slate-400 mb-6">{error}</p>
                                <Button onClick={fetchSelectedSplit} className="bg-blue-500 hover:bg-blue-600">
                                    Try Again
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Enhanced Workout Table */}
                    {!loading && !error && (
                        <div className="xl:col-span-2">
                            <Card className="bg-slate-800/20 backdrop-blur-2xl border-slate-700/30 shadow-2xl rounded-3xl overflow-hidden">
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-bold text-white">Today's Exercises</h2>
                                        <div className="flex gap-3">
                                            <Button onClick={addExercise} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl shadow-lg shadow-blue-500/25 px-6 py-3">
                                                <Plus className="w-5 h-5 mr-2" />
                                                Add Exercise
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Enhanced Table Header */}
                                    <div className="grid grid-cols-11 gap-4 mb-8 pb-4 border-b border-slate-700/30">
                                        <div className="col-span-1 text-sm font-semibold text-slate-400 uppercase tracking-wider">#</div>
                                        <div className="col-span-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Exercise</div>
                                        <div className="col-span-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">Set</div>
                                        <div className="col-span-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">Reps</div>
                                        <div className="col-span-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">Weight</div>
                                    </div>

                                    {/* Enhanced Exercise Rows */}
                                    {exercises.map((exercise, exerciseIndex) => (
                                        <div key={exercise.id} className="space-y-3 mb-10 p-8 bg-gradient-to-br from-slate-700/20 to-slate-800/20 rounded-3xl border border-slate-600/20 backdrop-blur-sm hover:border-slate-600/40 transition-all duration-300">
                                            {exercise.sets.map((set, setIndex) => (
                                                <div key={set.id} className="grid grid-cols-11 gap-4 items-center group">
                                                    <div className="col-span-1 text-lg font-bold text-slate-300">
                                                        {setIndex === 0 ? exerciseIndex + 1 : ""}
                                                    </div>
                                                    <div className="col-span-4">
                                                        {setIndex === 0 ? (
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-1 relative">
                                                                    <Input
                                                                        placeholder="Exercise name"
                                                                        value={exercise.name}
                                                                        readOnly
                                                                        onChange={(e) => updateExerciseName(exercise.id, e.target.value)}
                                                                        onClick={() => handleExerciseClick(exercise.name)}
                                                                        className={`rounded-2xl font-semibold cursor-pointer transition-all duration-300 text-white placeholder:text-slate-500 text-lg py-3 flex-1 ${exercise.isLogged
                                                                            ? 'bg-green-800/30 border-green-500/50 hover:border-green-400'
                                                                            : 'bg-slate-800/50 border-slate-600/50 hover:border-blue-400'
                                                                            }`}
                                                                    />
                                                                    {exercise.isLogged && (
                                                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                                                <span className="text-white text-xs font-bold">✓</span>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className="col-span-2">
                                                        <div className="text-sm text-slate-300 bg-gradient-to-r from-slate-600/40 to-slate-700/40 px-4 py-3 rounded-xl text-center font-semibold border border-slate-600/30">
                                                            Set {setIndex + 1}
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <Input
                                                            placeholder="0"
                                                            value={set.repetitions}
                                                            onChange={(e) => updateSet(exercise.id, set.id, "repetitions", e.target.value)}
                                                            className="bg-slate-800/50 border-slate-600/50 rounded-2xl text-center font-semibold text-white placeholder:text-slate-500 py-3 hover:border-slate-500 transition-colors"
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <Input
                                                            placeholder="0"
                                                            value={set.weight}
                                                            onChange={(e) => updateSet(exercise.id, set.id, "weight", e.target.value)}
                                                            className="bg-slate-800/50 border-slate-600/50 rounded-2xl text-center font-semibold text-white placeholder:text-slate-500 py-3 hover:border-slate-500 transition-colors"
                                                        />
                                                    </div>
                                                    {!exercise.isLogged && (<div className="col-span-1 flex gap-2">
                                                        {exercise.sets.length > 1 && (
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() => deleteSet(exercise.id, set.id)}
                                                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl px-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                    </div>)}
                                                </div>
                                            ))}
                                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 shadow-xl border border-white/10 space-y-2">
                                                <h1 className="text-xl font-bold text-white">In this exercise</h1>
                                                <h2 className="text-sm text-gray-300 italic">{exercise.description}</h2>

                                                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-200">
                                                    <span className="px-3 py-1 rounded-lg bg-purple-500/20 border border-purple-500/30">
                                                        Category: <strong>{exercise.category}</strong>
                                                    </span>
                                                    <span className="px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30">
                                                        Sets: <strong>{exercise.sets.length}</strong>
                                                    </span>
                                                    <span className="px-3 py-1 rounded-lg bg-green-500/20 border border-green-500/30">
                                                        Reps: <strong>{exercise.sets[0]?.repetitions}</strong>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Enhanced Add Set Button */}
                                            <div className="flex justify-end mt-6">
                                                <div className="flex gap-3">
                                                    <Button
                                                        size="sm"
                                                        disabled={exercise.isLogged}
                                                        onClick={() => markExerciseDone(exercise.id)}
                                                        className={`rounded-xl px-4 py-2 shadow-lg transition-all duration-300 ${exercise.isLogged
                                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/25'
                                                            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-purple-500/25 hover:shadow-purple-500/40'
                                                            } text-white`}
                                                    >
                                                        <Activity className="w-4 h-4 mr-2" />
                                                        {exercise.isLogged ? 'Logged' : 'Log'}
                                                    </Button>
                                                    {!exercise.isLogged && (<Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => addSet(exercise.id)}
                                                        className="border-slate-600/50 text-slate-300 hover:bg-slate-700/30 hover:text-white hover:border-slate-500 rounded-2xl px-6 py-2 backdrop-blur-sm transition-all duration-300"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Add Set
                                                    </Button>)}
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Enhanced Right Column */}
                    {!loading && !error && (
                        <div className="xl:col-span-1 space-y-6">
                            {/* Enhanced Video Player */}
                            <Card className="bg-slate-800/20 backdrop-blur-2xl border-slate-700/30 shadow-2xl rounded-3xl overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                            <Play className="w-5 h-5 text-white" />
                                        </div>
                                        Exercise Tutorial
                                    </h3>

                                    <div className="aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden shadow-2xl border border-slate-700/30">
                                        {selectedExercise ? (
                                            (() => {
                                                const exercise = exercises.find(ex => ex.name === selectedExercise);
                                                const videoUrl = exercise?.link || `https://www.youtube.com/embed/${currentVideo}`;
                                                const videoId = videoUrl.includes('youtube.com/watch?v=')
                                                    ? videoUrl.split('v=')[1]?.split('&')[0]
                                                    : videoUrl.includes('youtu.be/')
                                                        ? videoUrl.split('youtu.be/')[1]?.split('?')[0]
                                                        : currentVideo;

                                                return (
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`}
                                                        title={`${selectedExercise} Tutorial`}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                        className="rounded-2xl"
                                                    ></iframe>
                                                );
                                            })()
                                        ) : (
                                            <div className="text-center p-8">
                                                <div className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm border border-slate-600/30">
                                                    <Play className="w-12 h-12 text-blue-400 ml-1" />
                                                </div>
                                                <p className="text-white text-xl font-semibold mb-3">Select an Exercise</p>
                                                <p className="text-slate-400 text-sm leading-relaxed">Click on any exercise to watch tutorial</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="p-6 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-2xl border border-slate-600/20">
                                            <h4 className="font-bold text-white mb-3 text-lg">
                                                {selectedExercise || "Exercise Name"}
                                            </h4>
                                            <p className="text-sm text-slate-400 leading-relaxed">
                                                {(() => {
                                                    const exercise = exercises.find(ex => ex.name === selectedExercise);
                                                    return exercise?.description || "Watch instructional videos to learn proper form and technique. Click on any exercise name in the workout table to load its tutorial.";
                                                })()}
                                            </p>
                                            {(() => {
                                                const exercise = exercises.find(ex => ex.name === selectedExercise);
                                                return exercise?.category && (
                                                    <div className="mt-3">
                                                        <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                                                            {exercise.category}
                                                        </span>
                                                    </div>
                                                );
                                            })()}
                                        </div>

                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl py-4 shadow-lg font-medium transition-all duration-300 hover:shadow-blue-500/25">
                                            <Search className="w-5 h-5 mr-2" />
                                            Browse Exercise Library
                                        </Button>

                                        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                            <Star className="w-4 h-4 text-amber-400 fill-current" />
                                            <span>Premium HD content available</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Enhanced Quick Stats Card */}
                            <Card className="bg-slate-800/20 backdrop-blur-2xl border-slate-700/30 shadow-2xl rounded-3xl overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                            <BarChart3 className="w-4 h-4 text-white" />
                                        </div>
                                        Session Stats
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30 hover:scale-105 transition-transform duration-300">
                                            <div className="text-3xl font-bold text-blue-300 mb-1">{exercises.length}</div>
                                            <div className="text-xs text-blue-400/80 font-medium">Exercises</div>
                                        </div>
                                        <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 hover:scale-105 transition-transform duration-300">
                                            <div className="text-3xl font-bold text-green-300 mb-1">
                                                {totalExercises}
                                            </div>
                                            <div className="text-xs text-green-400/80 font-medium">Total Exercises</div>
                                        </div>
                                        <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 hover:scale-105 transition-transform duration-300">
                                            <div className="text-3xl font-bold text-purple-300 mb-1">{completedExercises}</div>
                                            <div className="text-xs text-purple-400/80 font-medium">Logged</div>
                                        </div>
                                        <div className="text-center p-4 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl border border-amber-500/30 hover:scale-105 transition-transform duration-300">
                                            <div className="text-3xl font-bold text-amber-300 mb-1">{totalVolume.toLocaleString()}</div>
                                            <div className="text-xs text-amber-400/80 font-medium">Volume (lbs)</div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-6 p-4 bg-slate-700/20 rounded-2xl">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm font-medium text-slate-300">Workout Progress</span>
                                            <span className="text-sm font-bold text-blue-300">{completedExercises}/{totalExercises}</span>
                                        </div>
                                        <div className="w-full bg-slate-600/30 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-blue-500/25"
                                                style={{ width: `${workoutProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* New Achievement Card */}
                            <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-2xl border-amber-500/30 shadow-2xl rounded-3xl overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                            <Trophy className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-amber-300">Achievement Unlocked!</h3>
                                            <p className="text-sm text-amber-400/80">7 Day Streak Master</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-amber-200/70 mb-4">Keep up the consistency! You've completed workouts for 7 days straight.</p>
                                    <div className="flex justify-between items-center text-xs text-amber-300">
                                        <span>+50 FlexCoins</span>
                                        <span>+25 XP</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="bg-slate-800/20 backdrop-blur-2xl border-slate-700/30 shadow-2xl rounded-3xl overflow-hidden">
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-400" />
                                        Quick Actions
                                    </h3>
                                    <div className="space-y-3">
                                        <Button
                                            onClick={() => startRest(90)}
                                            className="w-full justify-start bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 border border-slate-600/30 rounded-xl transition-all duration-300"
                                        >
                                            <Target className="w-4 h-4 mr-3" />
                                            Start Rest Timer (90s)
                                        </Button>
                                        <Button
                                            onClick={() => setShowStatsModal(true)}
                                            className="w-full justify-start bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 border border-slate-600/30 rounded-xl transition-all duration-300"
                                        >
                                            <BarChart3 className="w-4 h-4 mr-3" />
                                            View Analytics
                                        </Button>
                                        <Button className="w-full justify-start bg-slate-700/30 hover:bg-slate-700/50 text-slate-200 border border-slate-600/30 rounded-xl transition-all duration-300">
                                            <TrendingUp className="w-4 h-4 mr-3" />
                                            Export Data
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>

                {/* Enhanced Floating Action Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <Button
                        onClick={addExercise}
                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-full shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110"
                    >
                        <Plus className="w-8 h-8 text-white" />
                    </Button>
                </div>
            </div>
        </div>
    )
}