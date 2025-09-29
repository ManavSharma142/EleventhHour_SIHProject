import { useState, useEffect } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Card } from "../components/ui/Card"
import { Play, User, Home, Dumbbell, Apple, Users, Coins, Clock, Plus, Trash2, Pause, Square, Search, ChevronDown, Star, Trophy, Flame, Target, Activity, Zap, BarChart3, Settings, Bell, Share2, Heart, TrendingUp, Menu, X } from "lucide-react"
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
    const [flexcoins, setflexcoins] = useState(0);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    // Mobile state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

    /**
     * Replaced markExerciseDone with logExercise to implement Unrated/Rated Log feature.
     * @param {number} exerciseId - The ID of the exercise to log.
     * @param {boolean} isRated - True for Rated Log (grants FlexCoins/active day, implies camera), false for Unrated Log.
     */
    const logExercise = async (exerciseId, isRated) => {
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
            // Remove existing log for this exercise if present (to allow overwriting/updating)
            const filteredProgress = currentProgress.filter(loggedEx => typeof loggedEx === 'object' && loggedEx.exercisename !== exercise.name);
            const updatedExercise = [...filteredProgress, exerciseData];

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
                throw new Error('Failed to log exercise');
            }

            // Update local state to mark exercise as logged
            setExercises(prevExercises =>
                prevExercises.map(ex =>
                    ex.id === exerciseId
                        ? { ...ex, isLogged: true, sets: ex.sets.map(set => ({ ...set, completed: true })) }
                        : ex
                )
            );

            const logType = isRated ? 'Rated' : 'Unrated';

            // --- Conditional Logic for FlexCoins/Camera/Active Day ---
            if (isRated) {
                alert(`Successfully logged ${exercise.name} as ${logType}! Opening camera for form verification (simulated). You earned FlexCoins!`);
                getflexcoins(username) // FlexCoins granted
                setactiveday(username) // Mark active day
            } else {
                alert(`Successfully logged ${exercise.name} as ${logType}. No FlexCoins earned (unrated).`);
                // No FlexCoins, No active day mark
            }
            // --- End Conditional Logic ---

            // Refresh progress data
            await fetchWorkoutProgress();
        } catch (err) {
            console.error('Error logging exercise:', err);
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
        "bench press": "sa",
        "squats": "aX-d",
        "deadlift": "op9kVddnS6Q",
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
        setCurrentVideo(exerciseVideos[videoKey] || "dQw4w9dsadadWgXcQ")
    }

    const [cameraOpen,setcamara] = useState(false)
    const [currid,setcurrid] = useState()
    const completedExercises = exercises.filter(exercise => exercise.isLogged).length
    const totalExercises = exercises.length
    const workoutProgress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
            {/* Enhanced Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-500/20 via-pink-500/10 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Advanced Stats Modal */}
            {showStatsModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 sm:p-8 rounded-3xl shadow-2xl border border-slate-700/50 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">Workout Analytics</h2>
                            <Button onClick={() => setShowStatsModal(false)} variant="ghost" className="rounded-2xl">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                            <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-blue-300" />
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-blue-300">Total Volume</h3>
                                        <p className="text-2xl sm:text-3xl font-bold text-white">{totalVolume.toLocaleString()}</p>
                                        <p className="text-xs sm:text-sm text-blue-400">lbs lifted</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Activity className="w-6 sm:w-8 h-6 sm:h-8 text-green-300" />
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-green-300">Intensity</h3>
                                        <p className="text-2xl sm:text-3xl font-bold text-white capitalize">{workoutIntensity}</p>
                                        <p className="text-xs sm:text-sm text-green-400">current level</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/20 to-pink-500/20 rounded-2xl border border-blue-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-blue-300" />
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-blue-300">Duration</h3>
                                        <p className="text-2xl sm:text-3xl font-bold text-white">{formatTime(timer)}</p>
                                        <p className="text-xs sm:text-sm text-blue-400">active time</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30">
                                <div className="flex items-center gap-3 mb-3">
                                    <Flame className="w-6 sm:w-8 h-6 sm:h-8 text-orange-300" />
                                    <div>
                                        <h3 className="text-base sm:text-lg font-bold text-orange-300">Est. Calories</h3>
                                        <p className="text-2xl sm:text-3xl font-bold text-white">{Math.round(timer * 4.2)}</p>
                                        <p className="text-xs sm:text-sm text-orange-400">burned</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Records */}
                        <div className="mb-6">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Trophy className="w-5 sm:w-6 h-5 sm:h-6 text-amber-400" />
                                Personal Records
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-700/20 rounded-xl">
                                    <span className="font-medium text-slate-300">Bench Press</span>
                                    <span className="font-bold text-amber-300">225 lbs</span>
                                </div>
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-700/20 rounded-xl">
                                    <span className="font-medium text-slate-300">Squats</span>
                                    <span className="font-bold text-amber-300">315 lbs</span>
                                </div>
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-700/20 rounded-xl">
                                    <span className="font-medium text-slate-300">Deadlift</span>
                                    <span className="font-bold text-amber-300">405 lbs</span>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => setShowStatsModal(false)}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 rounded-2xl py-3"
                        >
                            Close Analytics
                        </Button>
                    </div>
                </div>
            )}

            {/* Rest Timer Overlay */}
            {isResting && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-700/50 text-center max-w-sm w-full">
                        <Clock className="w-12 sm:w-16 h-12 sm:h-16 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">Rest Time</h3>
                        <div className="text-4xl sm:text-6xl font-mono font-bold text-blue-300 mb-4">{formatTime(restTimer)}</div>
                        <Button onClick={() => setIsResting(false)} className="bg-blue-500 hover:bg-blue-600">
                            Skip Rest
                        </Button>
                    </div>
                </div>
            )}

            {/* Enhanced Sidebar */}
            <aside className={`w-72 bg-gradient-to-b from-[#0F1729] to-[#0A1018] backdrop-blur-xl border-r border-white/10 p-4 sm:p-6 flex flex-col fixed top-0 left-0 h-full z-50 shadow-2xl transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Mobile Close Button */}
                <Button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden absolute top-4 right-4 p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl"
                >
                    <X className="w-5 h-5" />
                </Button>

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
                        { icon: Dumbbell, label: "Workouts", active: true, color: "from-green-500 to-emerald-500", page: "/workout" },
                        { icon: Apple, label: "Nutrition", color: "from-orange-500 to-yellow-500", page: "/nutrition" },
                        { icon: Users, label: "Community", color: "from-purple-500 to-pink-500", page: "/community" },
                        { icon: Coins, label: "FlexCoins", color: "from-amber-500 to-orange-500", page: "/flexcoins" },
                    ].map(({ icon: Icon, label, active, color, page }) => (
                        <Link
                            to={page}
                            key={label}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`group flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden
                                ${active
                                    ? "bg-gradient-to-r from-blue-600/20 to-blue-600/20 border border-blue-500/30 shadow-lg"
                                    : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                                }`}
                        >
                            {active && (
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/10 rounded-2xl"></div>
                            )}
                            <div className={`relative p-2 rounded-xl ${active ? `bg-gradient-to-r ${color}` : 'bg-gray-700/50 group-hover:bg-gray-600/50'} transition-all duration-300`}>
                                <Icon className="w-4 sm:w-5 h-4 sm:h-5 relative z-10" />
                            </div>
                            <span className="font-semibold relative z-10 text-sm sm:text-base">{label}</span>
                            {active && <div className="absolute right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>}
                        </Link>
                    ))}
                </nav>

                {/* Enhanced Profile */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <Link to={"/profile"} className="relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-[#1A1F2E] to-[#1E2331] rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
                            <User className="w-5 sm:w-6 h-5 sm:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-bold text-white truncate text-xs sm:text-sm">
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
            </aside>

            {cameraOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-blue-500/50 max-w-lg w-full text-center">
                        <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center justify-center gap-2">
                            <Zap className="w-6 h-6" /> AI Form Verification
                        </h3>
                        <p className="text-slate-300 mb-6 text-sm sm:text-base">
                            Please position your device to capture your lift for FlexCoin validation. 
                            (Camera simulation active.)
                        </p>
                        {/* Simulated Camera Feed */}
                        <div className="aspect-video bg-slate-900 border-4 border-dashed border-blue-500/50 rounded-2xl flex items-center justify-center mb-6">
                            <Dumbbell className="w-16 h-16 text-blue-500 animate-pulse" />
                            <p className="text-xl text-slate-500 ml-4">Camera Initializing...</p>
                        </div>
                        <Button 
                            onClick={() => setcamara(false)} 
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-2xl py-3"
                        >
                            <X className="w-5 h-5 mr-2" />
                            Close Camera / Skip Verification
                        </Button>
                        <Button 
                            onClick={() => {
                                logExercise(currid, true)
                                setcamara(false)}} 
                            className="w-full bg-gradient-to-r mt-2 from-green-500 to-green-500 hover:from-green-600 hover:to-green-600 rounded-2xl py-3"
                        >
                            <Activity className="w-4 h-4 mr-2" />
                            Log
                        </Button>
                    </div>
                </div>
            )}
            

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative z-10 lg:ml-72">
                {/* Mobile Header with Menu Button */}
                <div className="lg:hidden bg-slate-800/20 backdrop-blur-2xl border-b border-slate-700/30 p-4 flex items-center justify-between shadow-xl">
                    <Button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <span className="text-lg font-mono font-bold text-white">{formatTime(timer)}</span>
                    </div>
                    <div className="flex gap-2">
                        {!isTimerRunning ? (
                            <Button onClick={startTimer} size="sm" className="bg-green-500 hover:bg-green-600 rounded-xl">
                                <Play className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button onClick={pauseTimer} size="sm" className="bg-amber-500 hover:bg-amber-600 rounded-xl">
                                <Pause className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Enhanced Header - Desktop */}
                <header className="hidden lg:block bg-slate-800/20 backdrop-blur-2xl border-b border-slate-700/30 p-6 xl:p-8 shadow-xl">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="text-sm text-slate-400 mb-2 flex items-center gap-2">
                                <Link to="/app">Home</Link>
                                <ChevronDown className="w-3 h-3 rotate-270" />
                                <Link to="/workout">Current Split</Link>
                                <ChevronDown className="w-3 h-3 rotate-270" />
                                <span className="text-white font-medium">Log Workout</span>
                            </div>
                            <h1 className="text-3xl xl:text-5xl font-bold bg-white bg-clip-text text-transparent mb-2">
                                {currentDay} Workout
                            </h1>
                            <p className="text-slate-400 text-base xl:text-lg">
                                {selectedSplit ?
                                    selectedSplit.day.find(day => day.day === currentDay)?.workouts.map(w => w.exercisecategory).join(', ') || 'Loading...'
                                    : 'Loading...'
                                } • {exercises.length} exercises
                            </p>

                            {/* Day Selector */}
                            {selectedSplit && (
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    {selectedSplit.day.map((day) => (
                                        <Button
                                            key={day.day}
                                            onClick={() => changeDay(day.day)}
                                            className={`px-3 xl:px-4 py-2 rounded-xl transition-all duration-300 text-sm ${currentDay === day.day
                                                ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg'
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
                        <div className="flex items-center gap-4 xl:gap-6">
                            <div className="flex items-center gap-3 xl:gap-4 bg-gradient-to-r from-slate-800/60 to-slate-800/40 px-4 xl:px-8 py-3 xl:py-4 rounded-3xl shadow-2xl backdrop-blur-sm border border-slate-600/20">
                                <Clock className="w-5 xl:w-7 h-5 xl:h-7 text-blue-400" />
                                <span className="text-2xl xl:text-4xl font-mono font-bold text-white">{formatTime(timer)}</span>
                            </div>

                            <div className="flex gap-2 xl:gap-3">
                                {!isTimerRunning ? (
                                    <Button onClick={startTimer} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl px-4 xl:px-8 py-3 xl:py-4 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300">
                                        <Play className="w-4 xl:w-5 h-4 xl:h-5 mr-2" />
                                        <span className="hidden xl:inline">Start Workout</span>
                                        <span className="xl:hidden">Start</span>
                                    </Button>
                                ) : (
                                    <Button onClick={pauseTimer} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl px-4 xl:px-8 py-3 xl:py-4 shadow-lg shadow-amber-500/25">
                                        <Pause className="w-4 xl:w-5 h-4 xl:h-5 mr-2" />
                                        <span className="hidden xl:inline">Pause</span>
                                    </Button>
                                )}
                                <Button onClick={stopTimer} variant="outline" className="rounded-2xl px-4 xl:px-8 py-3 xl:py-4 border-2 border-slate-600/50 hover:border-slate-500 backdrop-blur-sm">
                                    <Square className="w-4 xl:w-5 h-4 xl:h-5 mr-2" />
                                    <span className="hidden xl:inline">Stop</span>
                                </Button>
                                <Button className="rounded-2xl px-3 xl:px-6 py-3 xl:py-4 bg-slate-800/40 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-600/30">
                                    <Share2 className="w-4 xl:w-5 h-4 xl:h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Enhanced Content */}
                <div className="flex-1 p-4 sm:p-6 xl:p-8 grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 xl:gap-8">
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
                            {/* Mobile Day Selector */}
                            {selectedSplit && (
                                <div className="lg:hidden mb-4">
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {selectedSplit.day.map((day) => (
                                            <Button
                                                key={day.day}
                                                onClick={() => changeDay(day.day)}
                                                className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm whitespace-nowrap ${currentDay === day.day
                                                    ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg'
                                                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                                                    }`}
                                            >
                                                {day.day}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Card className="bg-slate-800/20 backdrop-blur-2xl border-slate-700/30 shadow-2xl rounded-3xl overflow-hidden">
                                <div className="p-4 sm:p-6 xl:p-8">
                                    <div className="flex items-center justify-between mb-6 xl:mb-8">
                                        <div>
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 lg:hidden">
                                                {currentDay} Workout
                                            </h2>
                                            <h2 className="hidden lg:block text-3xl font-bold text-white">Today's Exercises</h2>
                                            <p className="text-slate-400 text-sm lg:hidden">
                                                {selectedSplit ?
                                                    selectedSplit.day.find(day => day.day === currentDay)?.workouts.map(w => w.exercisecategory).join(', ') || 'Loading...'
                                                    : 'Loading...'
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* Desktop Table Header */}
                                    <div className="hidden lg:grid grid-cols-11 gap-4 mb-8 pb-4 border-b border-slate-700/30">
                                        <div className="col-span-1 text-sm font-semibold text-slate-400 uppercase tracking-wider">#</div>
                                        <div className="col-span-4 text-sm font-semibold text-slate-400 uppercase tracking-wider">Exercise</div>
                                        <div className="col-span-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">Set</div>
                                        <div className="col-span-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">Reps</div>
                                        <div className="col-span-2 text-sm font-semibold text-slate-400 uppercase tracking-wider">Weight</div>
                                    </div>

                                    {/* Enhanced Exercise Rows */}
                                    {exercises.map((exercise, exerciseIndex) => (
                                        <div key={exercise.id} className="space-y-3 mb-8 xl:mb-10 p-4 sm:p-6 xl:p-8 bg-gradient-to-br from-slate-700/20 to-slate-800/20 rounded-3xl border border-slate-600/20 backdrop-blur-sm hover:border-slate-600/40 transition-all duration-300">

                                            {/* Mobile Exercise Header */}
                                            <div className="lg:hidden mb-4">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                                                        {exerciseIndex + 1}
                                                    </div>
                                                    <div className="flex-1 relative">
                                                        <Input
                                                            placeholder="Exercise name"
                                                            value={exercise.name}
                                                            readOnly
                                                            onChange={(e) => updateExerciseName(exercise.id, e.target.value)}
                                                            onClick={() => handleExerciseClick(exercise.name)}
                                                            className={`rounded-2xl font-semibold cursor-pointer transition-all duration-300 text-white placeholder:text-slate-500 text-base py-3 flex-1 ${exercise.isLogged
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
                                            </div>

                                            {/* Sets for Mobile */}
                                            <div className="lg:hidden space-y-3">
                                                {exercise.sets.map((set, setIndex) => (
                                                    <div key={set.id} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-2xl">
                                                        <div className="text-sm font-semibold text-slate-300 bg-slate-600/40 px-3 py-2 rounded-xl min-w-[60px] text-center">
                                                            Set {setIndex + 1}
                                                        </div>
                                                        <div className="flex-1 grid grid-cols-2 gap-3">
                                                            <div>
                                                                <label className="text-xs text-slate-400 mb-1 block">Reps</label>
                                                                <Input
                                                                    placeholder="0"
                                                                    value={set.repetitions}
                                                                    onChange={(e) => updateSet(exercise.id, set.id, "repetitions", e.target.value)}
                                                                    className="bg-slate-800/50 border-slate-600/50 rounded-xl text-center font-semibold text-white placeholder:text-slate-500 py-2"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-xs text-slate-400 mb-1 block">Weight</label>
                                                                <Input
                                                                    placeholder="0"
                                                                    value={set.weight}
                                                                    onChange={(e) => updateSet(exercise.id, set.id, "weight", e.target.value)}
                                                                    className="bg-slate-800/50 border-slate-600/50 rounded-xl text-center font-semibold text-white placeholder:text-slate-500 py-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        {!exercise.isLogged && exercise.sets.length > 1 && (
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() => deleteSet(exercise.id, set.id)}
                                                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl p-2"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Desktop Table View */}
                                            <div className="hidden lg:block">
                                                {exercise.sets.map((set, setIndex) => (
                                                    <div key={set.id} className="grid grid-cols-11 gap-2 items-center group mb-3">
                                                        <div className="col-span-1 text-lg font-bold text-slate-300">
                                                            {setIndex === 0 ? exerciseIndex + 1 : ""}
                                                        </div>
                                                        <div className="col-span-4">
                                                            {setIndex === 0 ? (
                                                                <div className="flex items-center gap-1">
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
                                                            <div className="text-sm text-slate-300 bg-gradient-to-r from-slate-600/40 to-slate-700/40 px-4 py-1 rounded-xl text-center font-semibold border border-slate-600/30">
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
                                            </div>

                                            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 sm:p-5 shadow-xl border border-white/10 space-y-2">
                                                <h1 className="text-lg sm:text-xl font-bold text-white">In this exercise</h1>
                                                <h2 className="text-sm text-gray-300 italic">{exercise.description}</h2>

                                                <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 text-sm text-gray-200">
                                                    <span className="px-2 sm:px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30 text-xs sm:text-sm">
                                                        Category: <strong>{exercise.category}</strong>
                                                    </span>
                                                    <span className="px-2 sm:px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-500/30 text-xs sm:text-sm">
                                                        Sets: <strong>{exercise.sets.length}</strong>
                                                    </span>
                                                    <span className="px-2 sm:px-3 py-1 rounded-lg bg-green-500/20 border border-green-500/30 text-xs sm:text-sm">
                                                        Reps: <strong>{exercise.sets[0]?.repetitions}</strong>
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Enhanced Log/Add Set Buttons */}
                                            <div className="flex justify-between sm:justify-end mt-4 sm:mt-6">
                                                {/* This container holds the two main log buttons. We make it take 2/3 of the space on mobile. */}
                                                <div className="flex gap-2 w-full sm:w-auto">
                                                    {exercise.isLogged ? (
                                                        <Button
                                                            disabled
                                                            // Ensure it always takes full width when it's the only button in this group
                                                            className="rounded-xl px-3 sm:px-4 py-2 shadow-lg transition-all duration-300 flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                                        >
                                                            <Activity className="w-4 h-4 mr-2" />
                                                            Logged
                                                        </Button>
                                                    ) : (
                                                        <>
                                                            {/* Unrated Log Button */}
                                                            <Button
                                                                onClick={() => logExercise(exercise.id, false)}
                                                                // On mobile, they both use flex-1 to split the space equally
                                                                className="rounded-xl px-3 sm:px-4 py-2 shadow-lg transition-all duration-300 flex-1 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-500/50 text-slate-200"
                                                            >
                                                                <Activity className="w-4 h-4 mr-2" />
                                                                Unrated Log
                                                            </Button>
                                                            {/* Rated Log Button */}
                                                            <Button
                                                                onClick={() => {
                                                                    setcurrid(exercise.id)
                                                                    setcamara(true)
                                                                }}
                                                                // On mobile, they both use flex-1 to split the space equally
                                                                className="rounded-xl px-3 sm:px-4 py-2 shadow-lg transition-all duration-300 flex-1 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 shadow-blue-500/25 hover:shadow-blue-500/40 text-white"
                                                            >
                                                                <Zap className="w-4 h-4 mr-2" />
                                                                Rated Log
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                                {/* This container holds the +Set button */}
                                                {!exercise.isLogged && (
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => addSet(exercise.id)}
                                                        // Use flex-none to let the content size it, or use w-1/3 if you want it to be 1/3 of the screen width
                                                        className="border-slate-600/50 ml-2 text-slate-300 hover:bg-slate-700/30 hover:text-white hover:border-slate-500 rounded-2xl px-4 py-2 backdrop-blur-sm transition-all duration-300 flex-none"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        <span className="hidden sm:inline">Add Set</span>
                                                        <span className="sm:hidden">Set</span>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    )}

                    {/* Enhanced Right Column */}
                    {!loading && !error && (
                        <div className="xl:col-span-1 space-y-4 sm:space-y-6">
                            {/* Enhanced Video Player */}
                            <Card className="bg-slate-800/20 backdrop-blur-2xl border-slate-700/30 shadow-2xl rounded-3xl overflow-hidden">
                                <div className="p-4 sm:p-6">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
                                        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-500 rounded-xl flex items-center justify-center">
                                            <Play className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                                        </div>
                                        <span className="text-lg sm:text-2xl">Exercise Tutorial</span>
                                    </h3>

                                    <div className="aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden shadow-2xl border border-slate-700/30">
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
                                            <div className="text-center p-6 sm:p-8">
                                                <div className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto backdrop-blur-sm border border-slate-600/30">
                                                    <Play className="w-8 sm:w-12 h-8 sm:h-12 text-blue-400 ml-1" />
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

                                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white rounded-2xl py-4 shadow-lg font-medium transition-all duration-300 hover:shadow-blue-500/25">
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
                                        <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-pink-500/20 rounded-2xl border border-blue-500/30 hover:scale-105 transition-transform duration-300">
                                            <div className="text-3xl font-bold text-blue-300 mb-1">{completedExercises}</div>
                                            <div className="text-xs text-blue-400/80 font-medium">Logged</div>
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
                                                className="h-3 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-blue-500/25"
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

            </div>
        </div>
    )
}