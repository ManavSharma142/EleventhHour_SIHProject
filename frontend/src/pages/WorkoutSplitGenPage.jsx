import React, { useState } from "react";
import { Home, Dumbbell, Apple, Users, Coins, User } from "lucide-react";
import { motion } from "framer-motion";
import PopularSplits from "../components/PopularSplit";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
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
    }
  };

  return (
    <div className="min-h-screen bg-[#060F1B] bg-[radial-gradient(circle_at_center,_#0D1B2A,_#060F1B)] text-white flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-[#0D1728]/70 backdrop-blur-md border-r border-white/5 p-6 flex flex-col fixed top-0 left-0 h-full shadow-lg"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-wide">Flexora</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {[
            { icon: Home, label: "Home" },
            { icon: Dumbbell, label: "Workout", active: true },
            { icon: Apple, label: "Nutrition" },
            { icon: Users, label: "Community" },
            { icon: Coins, label: "FlexCoins" },
          ].map(({ icon: Icon, label, active }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition 
                ${
                  active
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </motion.div>
          ))}
        </nav>

        {/* Profile */}
        <div className="flex items-center gap-3 p-4 bg-[#111B2C] rounded-xl mt-6 shadow-inner">
          <div className="w-11 h-11 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold">Username</div>
            <div className="text-xs text-slate-400">FlexCoins: 1259</div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 p-10 ml-64">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-slate-400 mb-10 text-sm">
          <span>Home</span>
          <span>›</span>
          <span className="text-white font-medium">Workout</span>
        </div>

        <div className="flex gap-8">
          {/* AI Workout Generator */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 backdrop-blur-xl px-6 py-6 rounded-2xl shadow-lg"
          >
            <h1 className="text-4xl font-extrabold mb-8 ">
              AI Workout Splits Generator
            </h1>

            <div className="space-y-6">
              {/* Inputs */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2 text-sm">
                    Time (per day)
                  </label>
                  <input
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#111B2C] border border-[#1a2942] focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder:text-slate-400 text-sm"
                    placeholder="e.g. 60 minutes"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2 text-sm">
                    Days/Week
                  </label>
                  <select
                    name="days_per_week"
                    value={formData.days_per_week}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#111B2C] border border-[#1a2942] focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                  >
                    <option value="">Select</option>
                    {[3, 4, 5, 6, 7].map((d) => (
                      <option key={d} value={d}>
                        {d} Days
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 mb-2 text-sm">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#111B2C] border border-[#1a2942] focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                  >
                    <option value="">Select</option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="mix">Mix</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-2 text-sm">
                    Preference
                  </label>
                  <select
                    name="preference"
                    value={formData.preference}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#111B2C] border border-[#1a2942] focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
                  >
                    <option value="">Select</option>
                    <option value="home">Home</option>
                    <option value="gym">Gym</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Goal</label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full p-4 rounded-xl bg-[#111B2C] border border-[#1a2942] focus:ring-2 focus:ring-blue-500 outline-none text-white"
                >
                  <option value="">Select Goal</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="fat_loss">Fat Loss</option>
                  <option value="endurance">Endurance</option>
                  <option value="general_fitness">General Fitness</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Other Notes</label>
                <textarea
                  name="other"
                  value={formData.other}
                  onChange={handleChange}
                  rows="2"
                  className="w-full p-3 rounded-xl bg-[#111B2C] border border-[#1a2942] focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder:text-slate-400"
                  placeholder="e.g. knee injury, avoid squats, prefer dumbbells"
                />
              </div>

              <div className="flex justify-end">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-8 py-3 rounded-full shadow-lg transition"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin w-4 h-4 border-2 border-black border-t-transparent rounded-full"></span>
                      Generating...
                    </span>
                  ) : (
                    "Generate Split"
                  )}
                </motion.button>
              </div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                className="bg-[#060F1B] border border-slate-800 rounded-2xl p-6"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-3 justify-center h-32">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-3 h-3 rounded-full bg-yellow-400"
                        animate={{
                          scale: [1, 1.6, 1],
                          opacity: [0.5, 1, 0.5],
                          boxShadow: [
                            "0 0 0px rgba(250, 204, 21, 0.3)",
                            "0 0 12px rgba(250, 204, 21, 0.8)",
                            "0 0 0px rgba(250, 204, 21, 0.3)",
                          ],
                        }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.25,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                ) : generatedSplit ? (
                  <div className="space-y-6">
                    {generatedSplit.day.map((dayObj, idx) => (
                      <div
                        key={idx}
                        className="bg-[#0D1728]/70 rounded-xl p-4 border border-slate-700"
                      >
                        <h2 className="text-lg font-bold mb-3">
                          {dayObj.day}
                        </h2>
                        <ul className="space-y-3">
                          {dayObj.workouts.map((w, i) => (
                            <li
                              key={i}
                              className="p-3 bg-[#111B2C] rounded-lg border border-slate-700"
                            >
                              <div className="font-semibold">{w.title}</div>
                              <div className="text-sm text-slate-400">
                                {w.exercisecategory}
                              </div>
                              <p className="text-sm mt-1">{w.exercisedesc}</p>
                              <div className="text-xs mt-2 text-slate-400">
                                Sets: {w.sets} | Reps:{" "}
                                {w.repetitions > 0
                                  ? w.repetitions
                                  : "Hold/As long as possible"}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-500 text-sm text-center block">
                    Your generated split will appear here
                  </span>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Sidebar - Popular Splits */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-80"
          >
            <PopularSplits />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
