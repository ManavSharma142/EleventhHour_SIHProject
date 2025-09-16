// // import React, { useEffect, useState } from "react";
// // import CalendarHeatmap from "react-calendar-heatmap";
// // import "react-calendar-heatmap/dist/styles.css";

// // function Home() {
// //   const username = "dhananjaymishra8338wzr77RB";

// //   const [steps, setSteps] = useState(0);
// //   const [calories, setCalories] = useState(0);
// //   const [streak, setStreak] = useState({
// //     total_active_days: 0,
// //     current_streak: 0,
// //     max_streak: 0,
// //     active_days: []
// //   });

// //   useEffect(() => {
// //     // Fetch steps + calories
// //     fetch(`http://localhost:8000/googlefit?username=${username}`)
// //       .then(res => res.json())
// //       .then(data => {
// //         setSteps(data.steps);
// //         setCalories(data.cal);
// //       })
// //       .catch(err => console.error("GoogleFit Error:", err));

// //     // Fetch streaks
// //     fetch(`http://localhost:8000/streak?username=${username}`)
// //       .then(res => res.json())
// //       .then(data => setStreak(data))
// //       .catch(err => console.error("Streak Error:", err));
// //   }, [username]);

// //   return (
// //     <div className="home-container" style={{ padding: "20px", color: "white", background: "#0f172a", minHeight: "100vh" }}>
      
// //       {/* Motivational Quote */}
// //       <div style={{ textAlign: "center", marginBottom: "20px" }}>
// //         <h2>"Never Give Up!"</h2>
// //       </div>

// //       {/* Steps + Calories */}
// //       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
// //         <div style={{ flex: 1, background: "#1e293b", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
// //           <h3>Steps Count</h3>
// //           <p style={{ fontSize: "28px", color: "lime" }}>{steps}</p>
// //         </div>
// //         <div style={{ flex: 1, background: "#1e293b", padding: "20px", borderRadius: "12px", textAlign: "center" }}>
// //           <h3>Calorie Burn</h3>
// //           <p style={{ fontSize: "28px", color: "orange" }}>{calories}</p>
// //         </div>
// //       </div>

// //       {/* Mental Wellness */}
// //       <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
// //         <h3>Mental Wellness</h3>
// //         <p>Give your mind space to breathe</p>
// //         <button style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "8px", background: "#2563eb", color: "white" }}>
// //           Explore
// //         </button>
// //       </div>

// //       {/* Heatmap */}
// //       <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", marginBottom: "20px" }}>
// //         <h3>Progress</h3>
// //         <p>Total Active Days: {streak.total_active_days}</p>
// //         <p>Current Streak: {streak.current_streak}</p>
// //         <p>Max Streak: {streak.max_streak}</p>

// //         <CalendarHeatmap
// //           startDate={new Date(new Date().getFullYear(), 0, 1)}
// //           endDate={new Date()}
// //           values={streak.active_days.map(day => ({
// //             date: day.date,
// //             count: day.count
// //           }))}
// //           classForValue={value => {
// //             if (!value) return "color-empty";
// //             return `color-scale-${value.count}`;
// //           }}
// //         />
// //       </div>

// //       {/* Leaderboard */}
// //       <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px" }}>
// //         <h3>Leaderboard</h3>
// //         <ul>
// //           <li>Manav Sharma - 696969 XP</li>
// //           <li>Khali - 10000 XP</li>
// //           <li>John Cena - 6000 XP</li>
// //           <li>Dhananjay Mishra - -1000 XP</li>
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Home;
// // src/pages/Home.jsx
// // src/pages/Home.jsx
// import React, { useEffect, useState } from "react";
// import "./Home.css"; // Import the CSS file

// // --- Helper function to get the color class based on count ---
// // This makes the heatmap data-driven.
// const getClassForCount = (count) => {
//   if (count === 0) {
//     return "color-empty";
//   }
//   if (count >= 1 && count < 3) {
//     return "color-scale-1";
//   }
//   if (count >= 3 && count < 6) {
//     return "color-scale-2";
//   }
//   if (count >= 6 && count < 9) {
//     return "color-scale-3";
//   }
//   return "color-scale-4";
// };

// // --- Helper function to render the heatmap grid ---
// // It now takes your active_days data and intelligently renders the grid.
// const renderHeatmapGrid = (activeDays) => {
//   const TOTAL_SQUARES = 112; // 7 rows * 16 cols
  
//   // Get the last 112 days from your data
//   const daysData = activeDays.slice(-TOTAL_SQUARES);

//   // Create an array of 112 squares, filling with empty data if needed
//   const gridSquares = Array.from({ length: TOTAL_SQUARES }, (_, index) => {
//     const dataIndex = index - (TOTAL_SQUARES - daysData.length);
//     const dayData = daysData[dataIndex];
    
//     if (dayData) {
//       // We have data for this square
//       return { count: dayData.count || 0 };
//     } else {
//       // This square is empty (no data yet)
//       return { count: 0 };
//     }
//   });

//   return (
//     <div className="heatmap-grid">
//       {gridSquares.map((square, index) => (
//         <div
//           key={index}
//           className={`heatmap-day ${getClassForCount(square.count)}`}
//           title={`Count: ${square.count}`} // Tooltip on hover
//         ></div>
//       ))}
//     </div>
//   );
// };

// // --- Dummy data for Leaderboard ---
// const dummyLeaderboard = [
//   { name: 'Manav Sharma', xp: '696969xp' },
//   { name: 'Khali', xp: '10000xp' },
//   { name: 'John Cena', xp: '6000xp' },
//   { name: 'Dhananjay Mishra', xp: '~1000xp' },
// ];

// function Home() {
//   const username = "dhananjaymishra8338wzr77RB";

//   const [steps, setSteps] = useState(0);
//   const [calories, setCalories] = useState(0);
//   const [streak, setStreak] = useState({
//     total_active_days: 0,
//     current_streak: 0,
//     max_streak: 0,
//     active_days: []
//   });
  
//   // Your data fetching logic (no changes needed)
//   useEffect(() => {
//     fetch(`http://localhost:8000/googlefit?username=${username}`)
//       .then(res => res.json())
//       .then(data => {
//         setSteps(data.steps);
//         setCalories(data.cal);
//       })
//       .catch(err => console.error("GoogleFit Error:", err));

//     fetch(`http://localhost:8000/streak?username=${username}`)
//       .then(res => res.json())
//       .then(data => setStreak(data))
//       .catch(err => console.error("Streak Error:", err));
//   }, [username]);

//   // The JSX layout is identical to before
//   return (
//     <div className="home-dashboard">
//       <header className="dashboard-header">
//         <div className="quote-bar">
//           A Motivational Quote (Eg: Never Give Up)
//         </div>
//       </header>

//       <div className="dashboard-grid">
        
//         <div className="card stats-card steps-card">
//           <div className="stats-icon">🚶‍♂️</div>
//           <div className="stats-info">
//             <span className="stats-title">Steps Count</span>
//             <span className="stats-value">{steps}</span>
//           </div>
//         </div>

//         <div className="card stats-card calories-card">
//           <div className="stats-icon">🔥</div>
//           <div className="stats-info">
//             <span className="stats-title">Calorie Burn</span>
//             <span className="stats-value">{calories}</span>
//           </div>
//         </div>

//         <div className="card wellness-card">
//           <h4>Mental Wellness</h4>
//           <p>Give your mind space to breath</p>
//           <button className="btn btn-explore">
//             Explore
//           </button>
//         </div>

//         <div className="card workout-card">
//           <h4>Today's Workout</h4>
//           <p className="workout-title">WeekDay - Title</p>
//           <p className="workout-example">Example: Monday - Chest.</p>
//           <div className="workout-buttons">
//             <button className="btn btn-start">Start</button>
//             <button className="btn btn-generate">Generate a new split</button>
//           </div>
//         </div>

//         <div className="card leaderboard-card">
//           <h4>Leaderboard</h4>
//           <ul className="leaderboard-list">
//             {dummyLeaderboard.map((user, index) => (
//               <li key={index}>
//                 <span>{user.name}</span>
//                 <span className={index === 0 ? 'xp-top' : 'xp-normal'}>{user.xp}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="card heatmap-card">
//           <div className="heatmap-stats">
//             <span>Total Active Days - {streak.total_active_days}</span>
//             <span>Current Streak - {streak.current_streak}</span>
//           </div>
//           <p>Progress</p>
//           {/* This now smartly renders using your API data! */}
//           {renderHeatmapGrid(streak.active_days)}
//         </div>
        
//       </div>
//     </div>
//   );
// }

// export default Home;
import React from "react";
import "./Home.css";

export default function Home() {
  // Example user data – replace with real user info or from localStorage
  const username = localStorage.getItem("username") || "dhananjaymishra8338wzr77RB";
  const flexcoins = localStorage.getItem("flexcoins") || 1259;

  return (
    <div className="home-dashboard">
      {/* === Sidebar === */}
      <aside className="sidebar">
        <div className="sidebar-logo">Flexora</div>
        <nav className="sidebar-nav">
          <a href="/home" className="active">Home</a>
          <a href="/workout">Workout</a>
          <a href="/nutrition">Nutrition</a>
          <a href="/community">Community</a>
          <a href="/flexcoins">FlexCoins</a>
        </nav>
        <div className="sidebar-user">
          <div>{username}</div>
          <div>FlexCoins: {flexcoins}</div>
        </div>
      </aside>

      {/* === Main Content === */}
      <main className="dashboard-main">
        {/* Left Section */}
        <div className="dashboard-left">
          {/* Quote bar */}
          <div className="quote-bar">
            <p>“Push harder than yesterday if you want a different tomorrow.”</p>
          </div>

          {/* Stats row */}
          <div className="stats-row">
            <div className="stats-circle">
              <h3>Steps</h3>
              <p className="steps-value">8,452</p>
            </div>
            <div className="stats-circle">
              <h3>Calories</h3>
              <p className="calories-value">1,259</p>
            </div>
          </div>

          {/* Mental Wellness */}
          <div className="card">
            <h3>Mental Wellness</h3>
            <p>Mindfulness tips and stress relief techniques.</p>
            <button className="btn-explore">Explore</button>
          </div>

          {/* Workout */}
          <div className="card">
            <h3>Workout</h3>
            <p>Personalized training routines to fit your goals.</p>
            <div className="workout-buttons">
              <button className="btn-start">Start</button>
              <button className="btn-generate">Generate</button>
            </div>
          </div>

          {/* Heatmap */}
          <div className="card">
            <h3>Heatmap</h3>
            <div className="heatmap-grid">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`heatmap-day ${
                    ["color-scale-1", "color-scale-2", "color-scale-3", "color-scale-4", "color-empty"][
                      Math.floor(Math.random() * 5)
                    ]
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="card leaderboard-card">
            <h3>Leaderboard</h3>
            <ul className="leaderboard-list">
              <li><span>Arjun</span><span className="xp-top">450 XP</span></li>
              <li><span>Riya</span><span>320 XP</span></li>
              <li><span>Manav</span><span>280 XP</span></li>
              <li><span>Ayesha</span><span>200 XP</span></li>
            </ul>
          </div>
        </div>

        {/* Right Section - Chatbot */}
        <div className="dashboard-right">
          <h3>GymBro</h3>
          <div className="chatbot-messages">
            <div><strong>GymBro:</strong> Welcome back, champ! 💪</div>
            <div><strong>You:</strong> Suggest a chest workout</div>
            <div><strong>GymBro:</strong> Sure! Bench press, push-ups & dips 🔥</div>
          </div>
          <div className="chatbot-input">
            <input type="text" placeholder="Ask GymBro..." />
            <button>Send</button>
          </div>
        </div>
      </main>
    </div>
  );
}
