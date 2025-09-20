import { useState, useEffect, useRef, use } from "react"

export default function ActivityHeatmap() {
  const [activityData, setActivityData] = useState([])
  const [stats, setStats] = useState({
    total_active_days: 0,
    current_streak: 0,
    max_streak: 0,
  })
  const [loading, setLoading] = useState(true)
  const tooltipRef = useRef(null)

  const generateYearData = () => {
    const today = new Date()
    const days = []
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      days.push({
        date: date.toISOString().split("T")[0],
        count: 0,
        level: 0,
      })
    }
    return days
  }
  const [username, setusername] = useState("")

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

        if (data?.username) {
          setusername(data.username);
          console.log("Username:", data.username);
        }
      } catch (err) {
        console.error("Error validating user:", err);
      }
    };

    getUsername();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:8000/streak?username=${username}`
        )
        const data = await res.json()

        setStats({
          total_active_days: data.total_active_days,
          current_streak: data.current_streak,
          max_streak: data.max_streak,
        })

        const baseGrid = generateYearData()
        const countsMap = {}
        data.active_days.forEach((d) => {
          const dateStr = new Date(d.date).toISOString().split("T")[0]
          countsMap[dateStr] = d.count
        })

        const merged = baseGrid.map((day) => {
          const count = countsMap[day.date] || 0
          const level =
            count === 0 ? 0 : count >= 10 ? 4 : Math.min(4, Math.floor(count / 3))
          return { ...day, count, level }
        })

        setActivityData(merged)
      } catch (err) {
        console.error("Failed to fetch heatmap:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [username])

  const getActivityColor = (level) => {
    const colors = {
      0: "bg-slate-800",
      1: "bg-green-700/60",
      2: "bg-green-600/80",
      3: "bg-green-400",
      4: "bg-green-300",
    }
    return colors[level] || colors[0]
  }

  const showTooltip = (e, day) => {
    const tooltip = tooltipRef.current
    tooltip.style.display = "block"
    tooltip.style.left = `${e.pageX + 12}px`
    tooltip.style.top = `${e.pageY + 12}px`
    tooltip.innerHTML = `<strong>${day.count}</strong> contributions on ${new Date(
      day.date
    ).toLocaleDateString()}`
  }

  const hideTooltip = () => {
    tooltipRef.current.style.display = "none"
  }

  if (loading) {
    return (
      <div className="text-center text-slate-400 p-6">Loading heatmap...</div>
    )
  }

  const weekDays = ["", "Mon", "", "Wed", "", "Fri", ""]

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-4 text-center">Activity Heatmap</h1>

      {/* Stats */}
      <div className="mb-6 flex justify-center gap-6 text-sm text-slate-300">
        <div>
          <span className="font-semibold text-white">
            {stats.total_active_days}
          </span>{" "}
          total active days
        </div>
        <div>
          Current streak:{" "}
          <span className="font-semibold text-green-400">
            {stats.current_streak} days
          </span>
        </div>
        <div>
          Max streak:{" "}
          <span className="font-semibold text-blue-400">
            {stats.max_streak} days
          </span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700 overflow-x-auto">
        <div className="flex">
          <div className="flex flex-col mr-2 text-xs text-slate-400 justify-between h-24">
            {weekDays.map((day, index) => (
              <div key={index} className="h-3 flex items-center">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {activityData.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-1 hover:ring-white/50 ${getActivityColor(
                  day.level
                )}`}
                onMouseMove={(e) => showTooltip(e, day)}
                onMouseLeave={hideTooltip}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Floating Tooltip */}
      <div
        ref={tooltipRef}
        className="absolute z-50 px-2 py-1 text-xs rounded bg-slate-800 border border-slate-600 text-slate-100 pointer-events-none"
        style={{ display: "none", position: "absolute" }}
      ></div>
    </div>
  )
}
