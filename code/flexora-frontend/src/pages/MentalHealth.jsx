import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Heart,
  Sparkles,
  Clock,
  TrendingUp,
  Wind,
  Moon,
  Sun,
  Zap,
  Target,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Home,
  Users,
  Apple,
  Dumbbell,
  User,
  X,
  Menu,
  CheckCircle,
  Coins, // Added for benefits list
} from "lucide-react";
import { Link } from "react-router-dom";


export default function MentalWellness() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const wellnessPlans = [
    {
      id: 1,
      title: "Quick Stress Reset",
      subtitle: "5-Minute Breathing & Mindfulness",
      duration: 5,
      icon: Wind,
      color: "from-cyan-500 to-blue-500",
      glowColor: "from-cyan-500/20 to-blue-500/20",
      difficulty: "Beginner",
      bestFor: "Students & Professionals",
      description:
        "A rapid stress-relief technique combining deep breathing exercises with present-moment awareness. Perfect for between classes, meetings, or study sessions.",
      steps: [
        "Find a quiet space and sit comfortably with your back straight.",
        "Close your eyes gently and take 3 slow, deep breaths to center yourself.",
        "Practice 4-7-8 breathing: Inhale through nose (4s), Hold (7s), Exhale through mouth (8s).",
        "Repeat this breathing cycle for 5 rounds, focusing on your breath.",
        "Practice 5-4-3-2-1 grounding: Notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you can taste.",
        "Slowly open your eyes and return to your day feeling centered and refreshed.",
      ],
      benefits: [
        "Activates the parasympathetic nervous system to reduce stress hormones.",
        "Improves focus and mental clarity for better productivity.",
        "Lowers heart rate and blood pressure naturally.",
        "Helps break the cycle of anxious thoughts.",
      ],
    },
    {
      id: 2,
      title: "Mindful Movement Flow",
      subtitle: "10-Minute Gentle Yoga & Stretching",
      duration: 10,
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      glowColor: "from-pink-500/20 to-rose-500/20",
      difficulty: "Beginner to Intermediate",
      bestFor: "Everyone",
      description:
        "Gentle yoga sequences and dynamic stretches designed to release physical tension and calm the mind. Ideal for morning routines or study breaks.",
      steps: [
        "Begin with gentle neck rolls (5 each direction) and shoulder shrugs.",
        "Move through cat-cow stretches on hands and knees for spinal mobility (8 rounds).",
        "Transition from child's pose to standing forward fold, focusing on breath.",
        "Practice gentle spinal twists, seated or standing (hold each side for 30 seconds).",
        "Finish with legs-up-the-wall pose or savasana for complete relaxation.",
      ],
      benefits: [
        "Releases accumulated muscle tension throughout the body.",
        "Improves flexibility, posture, and body awareness.",
        "Enhances mind-body connection and reduces stress.",
        "Boosts energy levels and mental clarity for the day ahead.",
      ],
    },
    {
      id: 3,
      title: "Digital Detox Reset",
      subtitle: "15-Minute Screen-Free Relaxation",
      duration: 15,
      icon: Moon,
      color: "from-indigo-500 to-purple-500",
      glowColor: "from-indigo-500/20 to-purple-500/20",
      difficulty: "All Levels",
      bestFor: "Heavy Device Users",
      description:
        "A complete screen break to reduce digital fatigue and eye strain. Combines rest with gentle activities that don't involve screens.",
      steps: [
        "Place all devices in another room or drawer (out of sight and reach).",
        "Lie down or sit comfortably in a quiet space with your eyes closed.",
        "Practice progressive muscle relaxation: tense and release each muscle group from toes to head.",
        "Listen to calming instrumental music or nature sounds without visuals.",
        "Journal your thoughts freely or engage in mindful doodling on paper.",
        "Slowly return to your activities, noticing the mental clarity.",
      ],
      benefits: [
        "Reduces digital eye strain, headaches, and visual fatigue.",
        "Decreases mental fatigue from constant information processing.",
        "Improves sleep quality when done before bedtime.",
        "Restores cognitive function and creative thinking.",
      ],
    },
    {
      id: 4,
      title: "Power Nap Protocol",
      subtitle: "20-Minute Restorative Rest",
      duration: 20,
      icon: Zap,
      color: "from-amber-500 to-orange-500",
      glowColor: "from-amber-500/20 to-orange-500/20",
      difficulty: "All Levels",
      bestFor: "Tired Professionals & Students",
      description:
        "Science-backed power napping technique to boost alertness, memory, and productivity without entering deep sleep cycles.",
      steps: [
        "Set a 20-minute alarm (timing is crucial to avoid sleep inertia).",
        "Find a dark, quiet, cool space to lie down comfortably.",
        "Use an eye mask and earplugs if needed to block out light and sound.",
        "Focus on progressive body relaxation from your toes to your head.",
        "Don't worry if you don't fall asleep; quiet rest provides similar benefits.",
        "Wake gently and take 2-3 minutes to become fully alert.",
      ],
      benefits: [
        "Enhances memory consolidation and learning retention.",
        "Boosts alertness, reaction time, and work performance.",
        "Improves mood, creativity, and problem-solving abilities.",
        "Reduces afternoon fatigue and increases sustained attention.",
      ],
    },
    {
      id: 5,
      title: "Evening Wind-Down",
      subtitle: "25-Minute Pre-Sleep Routine",
      duration: 25,
      icon: Sun,
      color: "from-violet-500 to-purple-600",
      glowColor: "from-violet-500/20 to-purple-600/20",
      difficulty: "All Levels",
      bestFor: "Anyone with Sleep Issues",
      description:
        "A comprehensive evening routine to signal your body it's time to rest. Combines multiple relaxation techniques for better sleep quality.",
      steps: [
        "Dim all lights and reduce screen brightness to minimal levels.",
        "Perform gentle stretching or restorative yoga poses.",
        "Practice a guided body scan meditation, bringing awareness to each part.",
        "Write down 3 things you're grateful for and set aside worries for tomorrow.",
        "Practice 4-7-8 breathing or alternate nostril breathing until drowsy.",
        "Get into bed only when sleepy, maintaining a consistent schedule.",
      ],
      benefits: [
        "Significantly improves sleep onset time and reduces tossing and turning.",
        "Enhances overall sleep quality and depth of rest.",
        "Reduces racing thoughts and nighttime anxiety.",
        "Establishes healthy sleep hygiene patterns for the long-term.",
      ],
    },
  ];

  const handleStartPlan = (plan) => {
    setSelectedPlan(plan);
    setTimeRemaining(plan.duration * 60);
    setTimerActive(false);
  };

  const toggleTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimerActive(false);
    if (selectedPlan) {
      setTimeRemaining(selectedPlan.duration * 60);
    }
  };

  useEffect(() => {
    let interval;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-72 bg-gradient-to-b from-[#0F1729] to-[#0A1018] backdrop-blur-xl border-r border-white/10 p-6 flex flex-col fixed top-0 left-0 h-full z-50 shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
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
                <rect x="0" y="0" width="58" height="58" rx="14" fill="url(#grad)" />
                <g transform="translate(17,17)">
                  <path
                    d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="m2.5 21.5 1.4-1.4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="m20.1 3.9 1.4-1.4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="m9.6 14.4 4.8-4.8"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
          <div>
            <span className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-100 bg-clip-text text-transparent tracking-tight">
              Flexora
            </span>
            <div className="text-xs text-gray-400 font-medium">
              Mental Wellness
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          {[
            { icon: Home, label: "Dashboard", page: "/app" },
            { icon: Dumbbell, label: "Workouts", page: "/workout" },
            { icon: Apple, label: "Nutrition", page: "/nutrition" },
            { icon: Users, label: "Community", page: "/community" },
            { icon: Coins, label: "FlexCoins", page: "/flexcoins" },
            {
              icon: Brain,
              label: "Mental Wellness",
              active: true,
              color: "from-purple-500 to-pink-500",
              page: "/mental-wellness"
            },
          ].map(({ icon: Icon, label, active, color, page }) => (
            <Link
              to={page}
              key={label}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden
                ${
                  active
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
                }`}
            >
              {active && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl"></div>
              )}
              <div
                className={`relative p-2 rounded-xl ${
                  active
                    ? `bg-gradient-to-r ${color}`
                    : "bg-gray-700/50 group-hover:bg-gray-600/50"
                } transition-all duration-300`}
              >
                <Icon className="w-5 h-5 relative z-10" />
              </div>
              <span className="font-semibold relative z-10">{label}</span>
              {active && (
                <div className="absolute right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
        </nav>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <Link to="/profile" className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-[#1A1F2E] to-[#1E2331] rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white truncate text-sm">
                Your Profile
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Heart className="w-3 h-3 text-pink-400" />
               
              </div>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8 pt-16 lg:pt-0">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <Brain className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                  Mental Wellness Hub
                </h1>
                <p className="text-gray-400 text-sm lg:text-lg">
                  Science-backed stress management and relaxation techniques
                </p>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              {[
                { label: "Active Plans", value: "5", icon: Target },
                { label: "Avg Duration", value: "15 min", icon: Clock },
                { label: "Success Rate", value: "94%", icon: TrendingUp },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="relative group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl lg:text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                    <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400 opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Wellness Plans Grid */}
          <div className="space-y-4 lg:space-y-6">
            <h2 className="text-xl lg:text-2xl font-bold text-white flex items-center gap-3">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />
              Choose Your Wellness Plan
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {wellnessPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredCard(plan.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group cursor-pointer"
                  onClick={() => handleStartPlan(plan)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${plan.glowColor} rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl group-hover:blur-2xl lg:group-hover:blur-3xl transition-all duration-500`}
                  ></div>

                  <div className="relative h-full bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-white/10 group-hover:border-purple-500/30 transition-all duration-500 transform group-hover:scale-105">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-2 lg:p-3 bg-gradient-to-r ${plan.color} rounded-xl lg:rounded-2xl shadow-xl`}
                      >
                        <plan.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="px-2 lg:px-3 py-1 bg-white/10 rounded-full text-xs font-semibold">
                          {plan.difficulty}
                        </div>
                        <div className="flex items-center gap-1 text-purple-400 text-xs lg:text-sm font-semibold">
                          <Clock className="w-3 h-3 lg:w-4 lg:h-4" />
                          {plan.duration} min
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg lg:text-xl font-bold text-white mb-1">
                      {plan.title}
                    </h3>
                    <p
                      className={`text-xs lg:text-sm bg-gradient-to-r ${plan.color} bg-clip-text text-transparent font-semibold mb-3`}
                    >
                      {plan.subtitle}
                    </p>

                    <p className="text-gray-400 text-xs lg:text-sm mb-4 line-clamp-3">
                      {plan.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="text-xs text-gray-400">
                        Best for: {plan.bestFor}
                      </div>
                      <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="relative group mt-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl lg:rounded-3xl blur-xl"></div>
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/10">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Why Mental Wellness Matters
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300 text-sm lg:text-base">
                <div className="space-y-2">
                  <p className="leading-relaxed">
                    Regular mental wellness practices reduce stress hormones
                    by up to 23% and improve cognitive function. Just 5-10
                    minutes daily can make a significant difference in your
                    overall wellbeing.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="leading-relaxed">
                    These evidence-based techniques are designed specifically for
                    busy students and professionals. Start with shorter sessions
                    and gradually build your practice for lasting benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Selected Plan Detail Modal */}
      {selectedPlan && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedPlan(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-4xl w-full bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-2xl rounded-2xl lg:rounded-3xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-gray-800/95 to-gray-900/95 backdrop-blur-xl border-b border-white/10 p-4 lg:p-6 z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 lg:gap-4 flex-1">
                  <div
                    className={`p-3 lg:p-4 bg-gradient-to-r ${selectedPlan.color} rounded-xl lg:rounded-2xl shadow-xl flex-shrink-0`}
                  >
                    <selectedPlan.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {selectedPlan.title}
                    </h2>
                    <p
                      className={`text-base lg:text-lg bg-gradient-to-r ${selectedPlan.color} bg-clip-text text-transparent font-semibold`}
                    >
                      {selectedPlan.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-2"
                >
                  <X className="w-6 h-6 lg:w-8 lg:h-8" />
                </button>
              </div>

              {/* Timer Display */}
              <div className="p-4 lg:p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl lg:rounded-2xl border border-purple-500/30">
                <div className="text-center">
                  <div className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
                    {formatTime(timeRemaining)}
                  </div>
                  <div className="flex items-center justify-center gap-3 lg:gap-4 flex-wrap">
                    <button
                      onClick={toggleTimer}
                      className={`px-6 lg:px-8 py-2 lg:py-3 bg-gradient-to-r ${selectedPlan.color} rounded-xl font-semibold text-white flex items-center gap-2 hover:scale-105 transition-transform duration-300 shadow-xl text-sm lg:text-base`}
                    >
                      {timerActive ? (
                        <>
                          <Pause className="w-4 h-4 lg:w-5 lg:h-5" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 lg:w-5 lg:h-5" /> Start
                        </>
                      )}
                    </button>
                    <button
                      onClick={resetTimer}
                      className="px-4 lg:px-6 py-2 lg:py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl font-semibold text-white flex items-center gap-2 transition-all duration-300 text-sm lg:text-base"
                    >
                      <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" /> Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 lg:p-6 space-y-6 lg:space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  About This Plan
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                  {selectedPlan.description}
                </p>
              </div>

              {/* Steps */}
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  How to Practice
                </h3>
                <ol className="space-y-4">
                  {selectedPlan.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gradient-to-r from-gray-700/80 to-gray-600/80 border border-white/10 rounded-full font-bold text-purple-400">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 leading-relaxed text-sm lg:text-base pt-1">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {selectedPlan.benefits.map((benefit, index) => (
                     <li key={index} className="flex items-start gap-3">
                       <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                       <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                         {benefit}
                       </p>
                     </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}