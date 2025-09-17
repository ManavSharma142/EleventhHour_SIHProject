import { useEffect, useState } from "react";
import {
    Home,
    Dumbbell,
    Apple,
    Users,
    Coins,
    User,
    ChevronDown,
    Search,
    List,
    Grid,
} from "lucide-react";

export default function Workout() {
    const [splitData, setSplitData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDay, setOpenDay] = useState(null);
    const [viewMode, setViewMode] = useState("table"); // "table" | "card"
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        async function fetchWorkout() {
            try {
                const res = await fetch(
                    "http://localhost:8000/workouts/selected?username=technicaldm1186xun3Bj"
                );
                const data = await res.json();
                setSplitData(data.day || []);
            } catch (err) {
                console.error("Error fetching workout data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchWorkout();
    }, []);

    // 🔎 Filtering exercises
    const getFilteredExercises = (workouts) => {
        return workouts.filter(
            (ex) =>
                ex.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filter ? ex.exercisecategory === filter : true)
        );
    };

    return (
        <div className="min-h-screen flex bg-[#060F1B] bg-[radial-gradient(circle_at_center,_#0D1B2A,_#060F1B)] text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0D1728]/70 backdrop-blur-md border-r border-white/5 p-6 flex flex-col fixed top-0 left-0 h-full shadow-lg">
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
                        <div
                            key={label}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition 
                ${active
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:text-white hover:bg-slate-700"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{label}</span>
                        </div>
                    ))}
                </nav>

                {/* Profile */}
                <div className="flex items-center gap-3 p-4 bg-[#111B2C] rounded-xl mt-6">
                    <div className="w-11 h-11 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="font-semibold">Username</div>
                        <div className="text-xs text-slate-400">FlexCoins: 1259</div>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 ml-60 p-10">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-slate-400 mb-10 text-sm">
                    <span>Home</span>
                    <span>›</span>
                    <span>Workout</span>
                    <span>›</span>
                    <span className="text-white font-medium">Current Split</span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-extrabold mb-8">Workout</h1>

                {loading ? (
                    <div className="text-center text-gray-400 animate-pulse">
                        Loading your split...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#111B2C] rounded-2xl p-6 shadow-lg mb-6">
                                <h2 className="text-xl font-bold mb-4">Current Split</h2>

                                {/* Summary */}
                                <div className="space-y-3 text-sm">
                                    {splitData.map((dayItem) => (
                                        <div
                                            key={dayItem.day}
                                            onClick={() =>
                                                setOpenDay(openDay === dayItem.day ? null : dayItem.day)
                                            }
                                            className={`px-4 py-4 rounded-2xl cursor-pointer transition
    ${openDay === dayItem.day
                                                    ? "bg-slate-800/90 text-white"
                                                    : "bg-[#111B2C] hover:bg-slate-700"
                                                }`}
                                        >
                                            <span className="font-semibold block mb-1">{dayItem.day}</span>
                                            <div className="flex flex-wrap gap-1">
                                                {dayItem.workouts.map((w, idx) => (
                                                    <span
                                                        key={idx}
                                                        className={`px-2 py-0.5 text-xs rounded-full ${openDay === dayItem.day
                                                                ? "bg-blue-500/40"
                                                                : "bg-slate-700 text-gray-300"
                                                            }`}
                                                    >
                                                        {w.exercisecategory}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="w-full bg-[#FFE30B] text-black font-bold px-5 py-3 rounded-xl shadow-md hover:bg-yellow-400 transition">
                                Generate New Split
                            </button>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2">
                            {/* Controls */}
                            {openDay && (
                                <div className="flex flex-wrap gap-4 mb-6 items-center">
                                    {/* Search */}
                                    <div className="flex items-center bg-slate-800/50 px-3 rounded-lg">
                                        <Search className="w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search exercise..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="bg-transparent px-2 py-1 outline-none text-sm"
                                        />
                                    </div>

                                    {/* Filter */}
                                    <select
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                        className="bg-slate-800/50 px-3 py-2 rounded-lg text-sm outline-none"
                                    >
                                        <option value="">All Categories</option>
                                        {[
                                            ...new Set(
                                                splitData.flatMap((d) =>
                                                    d.workouts.map((w) => w.exercisecategory)
                                                )
                                            ),
                                        ].map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Toggle View */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setViewMode("table")}
                                            className={`p-2 rounded-lg ${viewMode === "table"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-slate-800/50"
                                                }`}
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode("card")}
                                            className={`p-2 rounded-lg ${viewMode === "card"
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-slate-800/50"
                                                }`}
                                        >
                                            <Grid className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {splitData.map((dayItem) =>
                                openDay === dayItem.day ? (
                                    <div
                                        key={dayItem.day}
                                        className="bg-[#111B2C] rounded-2xl shadow-lg overflow-hidden mb-6"
                                    >
                                        {/* Day Header */}
                                        <div className="sticky top-0 bg-[#111B2C] px-6 py-4 border-b border-gray-700 text-lg font-bold">
                                            {dayItem.day}
                                        </div>

                                        {/* Exercise Data */}
                                        <div className="p-6">
                                            {viewMode === "table" ? (
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-sm">
                                                        <thead>
                                                            <tr className="border-b border-gray-700 text-left bg-slate-800/40">
                                                                <th className="p-4 font-medium">#</th>
                                                                <th className="p-4 font-medium">Exercise</th>
                                                                <th className="p-4 font-medium">Category</th>
                                                                <th className="p-4 font-medium">Sets</th>
                                                                <th className="p-4 font-medium">Reps</th>
                                                                <th className="p-4 font-medium">Link</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {getFilteredExercises(dayItem.workouts).map(
                                                                (exercise, idx) => (
                                                                    <tr
                                                                        key={exercise.title}
                                                                        className="border-b border-gray-700/40 hover:bg-gray-700/20 transition"
                                                                    >
                                                                        <td className="p-4">{idx + 1}</td>
                                                                        <td className="p-4 font-medium">
                                                                            {exercise.title}
                                                                        </td>
                                                                        <td className="p-4">
                                                                            {exercise.exercisecategory}
                                                                        </td>
                                                                        <td className="p-4">{exercise.sets}</td>
                                                                        <td className="p-4">
                                                                            {exercise.repetitions}
                                                                        </td>
                                                                        <td className="p-4 text-blue-400">
                                                                            {exercise.link ? (
                                                                                <a
                                                                                    href={exercise.link}
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                                    className="hover:underline"
                                                                                >
                                                                                    Watch
                                                                                </a>
                                                                            ) : (
                                                                                "-"
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    {getFilteredExercises(dayItem.workouts).map(
                                                        (exercise, idx) => (
                                                            <div
                                                                key={exercise.title}
                                                                className="bg-slate-800/50 p-4 rounded-xl shadow"
                                                            >
                                                                <h3 className="font-bold mb-1">
                                                                    {idx + 1}. {exercise.title}
                                                                </h3>
                                                                <p className="text-sm text-gray-400">
                                                                    {exercise.exercisecategory}
                                                                </p>
                                                                <p className="mt-1 text-sm">
                                                                    {exercise.sets} sets ×{" "}
                                                                    {exercise.repetitions} reps
                                                                </p>
                                                                {exercise.link && (
                                                                    <a
                                                                        href={exercise.link}
                                                                        target="_blank"
                                                                        className="text-blue-400 text-sm hover:underline block mt-2"
                                                                    >
                                                                        ▶ Watch
                                                                    </a>
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : null
                            )}

                            {openDay && (
                                <p className="text-sm text-gray-400 mt-6 text-center">
                                    *Click <span className="text-blue-400">Watch</span> to see how
                                    to perform an exercise
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Bar */}
            <div className="fixed bottom-0 left-60 right-0 p-4 flex justify-end shadow-inner">
                <button className="flex items-center bg-[#37FF1C] text-black font-bold px-8 py-3 rounded-xl shadow-lg transition">
                    Start Today&apos;s Workout
                </button>
            </div>
        </div>
    );
}
