import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    time: "",
    category: "",
    goal: "",
    days_per_week: "",
    preference: "",
    other: "",
  });
  const [generatedSplit, setGeneratedSplit] = useState(null);
  const [selectedSplit, setSelectedSplit] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/validate", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "done") {
          setUser(data.username);
          fetchSelectedSplit(data.username);
        } else {
          navigate("/login");
        }
      });
  }, []);

  const fetchSelectedSplit = async (username) => {
    try {
      const res = await fetch(
        `http://localhost:8000/workouts/selected?username=${username}`,
        { credentials: "include" }
      );
      if (res.ok) {
        const data = await res.json();
        setSelectedSplit(data);
        fetchProgress(username, data.id);
      }
    } catch (err) {
      console.error("Error fetching selected split:", err);
    }
  };

  const fetchProgress = async (username, splitId) => {
    try {
      const res = await fetch(
        `http://localhost:8000/workouts/progress?username=${username}&split_id=${splitId}`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (Array.isArray(data)) setProgress(data);
    } catch (err) {
      console.error("Error fetching progress:", err);
    }
  };

  const generateSplit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        days_per_week: Number(form.days_per_week),
      };

      const res = await fetch("http://localhost:8000/ai/workoutsplits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setGeneratedSplit(data);
    } catch (err) {
      console.error("Error generating split:", err);
    }
    setLoading(false);
  };

  const selectSplit = async (splitId) => {
    if (!user) return;
    try {
      await fetch("http://localhost:8000/workouts/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: user, split_id: splitId }),
      });
      fetchSelectedSplit(user);
      setGeneratedSplit(null);
    } catch (err) {
      console.error("Error selecting split:", err);
    }
  };

  const markExerciseDone = async (day, exerciseTitle) => {
    if (!user || !selectedSplit) return;

    const alreadyDone = progress.find(
      (p) => p.day.toLowerCase() === day.toLowerCase()
    )?.exercise || [];

    const updatedExercises = [...new Set([...alreadyDone, exerciseTitle])];

    try {
      await fetch("http://localhost:8000/workouts/markdone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: user,
          day,
          exercise: updatedExercises,
          split_id: selectedSplit.id,
        }),
      });
      fetchProgress(user, selectedSplit.id);
    } catch (err) {
      console.error("Error marking exercise done:", err);
    }
  };

  const isExerciseDone = (day, exerciseTitle) =>
    progress.some(
      (p) =>
        p.day.toLowerCase() === day.toLowerCase() &&
        p.exercise.includes(exerciseTitle)
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center text-blue-400 mb-10"
      >
        FitLife Dashboard
      </motion.h1>

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 shadow rounded-2xl p-4 mb-8"
      >
        {user ? (
          <p className="text-lg">👋 Welcome back, <b className="text-blue-300">{user}</b></p>
        ) : (
          <p className="text-lg text-red-400">Not logged in</p>
        )}
      </motion.div>

      {/* Workout Request Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 shadow rounded-2xl p-6 mb-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-300">
          Generate AI Workout Split
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(form).map(([key, val]) => (
            <div key={key} className="flex flex-col">
              <label className="capitalize text-sm font-medium mb-1 text-slate-300">
                {key.replace(/_/g, " ")}
              </label>
              <input
                type={key === "days_per_week" ? "number" : "text"}
                value={val}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="p-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100"
              />
            </div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateSplit}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg text-lg font-semibold"
        >
          {loading ? "Generating..." : "Generate Split"}
        </motion.button>
      </motion.div>

      {/* Generated Split */}
      {generatedSplit && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 shadow rounded-2xl p-6 mb-10"
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-300">Generated Split Preview</h2>
          <div className="space-y-5">
            {generatedSplit.day.map((d, i) => (
              <motion.div
                whileHover={{ scale: 1.01 }}
                key={i}
                className="border border-slate-800 rounded-xl p-4 bg-slate-800"
              >
                <h3 className="font-bold text-lg text-blue-400 mb-2">{d.day}</h3>
                <ul className="space-y-3">
                  {d.workouts.map((w, idx) => (
                    <li key={idx} className="border border-slate-700 rounded p-3 bg-slate-900">
                      <div className="flex justify-between">
                        <span className="font-semibold">{w.title}</span>
                        <span className="text-sm text-slate-400">{w.sets}x{w.repetitions}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{w.exercisedesc}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => selectSplit(generatedSplit.id)}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Select This Split
          </motion.button>
        </motion.div>
      )}

      {/* Selected Split */}
      {selectedSplit && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 shadow rounded-2xl p-6 mb-10"
        >
          <h2 className="text-2xl font-bold mb-6 text-blue-300">Your Current Split</h2>
          {selectedSplit.day.map((d, i) => {
            const total = d.workouts.length;
            const doneCount = d.workouts.filter((w) =>
              isExerciseDone(d.day, w.title)
            ).length;
            const percent = Math.round((doneCount / total) * 100);

            return (
              <motion.div
                whileHover={{ scale: 1.01 }}
                key={i}
                className="border border-slate-800 rounded-xl p-5 mb-6 bg-slate-800"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-lg text-blue-400">{d.day}</h4>
                  <span className="text-sm text-slate-400">{doneCount}/{total} done</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    className="bg-blue-500 h-2 rounded-full"
                  />
                </div>
                <ul className="space-y-3">
                  {d.workouts.map((w, idx) => (
                    <li key={idx} className="flex flex-col border border-slate-700 rounded p-3 bg-slate-900">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{w.title}</span>
                        <span className="text-sm text-slate-400">{w.sets}x{w.repetitions}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1">{w.exercisedesc}</p>
                      {isExerciseDone(d.day, w.title) ? (
                        <span className="mt-2 self-end text-green-400 font-medium">✅ Done</span>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => markExerciseDone(d.day, w.title)}
                          className="mt-2 self-end bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Mark Done
                        </motion.button>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Progress Summary */}
      {progress.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 shadow rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-blue-300">Progress Tracker</h2>
          <ul className="list-disc ml-5 space-y-1 text-slate-300">
            {progress.map((p, idx) => (
              <li key={idx}>
                <b className="text-blue-400">{p.day}</b> – {p.exercise.join(", ")}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
