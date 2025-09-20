// import React, { useState, useEffect } from "react";
// import {
//   Home,
//   Dumbbell,
//   Apple,
//   Users,
//   Coins,
//   User,
//   Flame,
//   Footprints,
//   TrendingUp,
//   Send,
//   Sparkles,
//   Target,
//   Zap,
//   Award,
//   Activity,
//   Calendar,
//   ChevronRight,
//   Clock,
//   Star,
//   Plus,
//   ArrowUpRight,

// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";


// // Enhanced Card component with glassmorphism effect
// function Card({ children, className, onClick, hover = true }) {
//   return (
//     <div
//       className={`
//         backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl
//         ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer' : ''}
//         ${className}
//       `}
//       onClick={onClick}
//     >
//       {children}
//     </div>
//   );
// }

// // Animated gradient background component

// // Enhanced recipe card with complete nutrition info
// function RecipeCard({ recipe, isExpanded, onToggle }) {
//   return (
//     <Card className="p-6 relative group" onClick={onToggle}>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex justify-between items-start">
//           <div className="space-y-2">
//             <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
//               {recipe.name}
//             </h3>
//             <div className="flex items-center gap-4 text-sm">
//               <div className="flex items-center gap-1 text-emerald-400">
//                 <Clock size={14} />
//                 <span>{recipe.prepTime}</span>
//               </div>
//               <div className="flex items-center gap-1 text-orange-400">
//                 <Zap size={14} />
//                 <span>{recipe.difficulty}</span>
//               </div>
//               <div className="flex items-center gap-1 text-yellow-400">
//                 <Star size={14} fill="currentColor" />
//                 <span>{recipe.rating}</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="text-xs text-slate-400 mb-1">Serving Size</div>
//             <div className="text-sm font-medium text-white">{recipe.servingSize}</div>
//           </div>
//         </div>

//         {/* Nutrition Grid */}
//         <div className="grid grid-cols-3 gap-4">
//           <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
//             <div className="text-2xl font-bold text-blue-300">{recipe.nutrition.protein}</div>
//             <div className="text-xs text-slate-300">Protein</div>
//           </div>
//           <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10">
//             <div className="text-2xl font-bold text-emerald-300">{recipe.nutrition.carbs}</div>
//             <div className="text-xs text-slate-300">Carbs</div>
//           </div>
//           <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-white/10">
//             <div className="text-2xl font-bold text-orange-300">{recipe.nutrition.fat}</div>
//             <div className="text-xs text-slate-300">Fat</div>
//           </div>
//         </div>

//         {/* Expanded Content */}
//         {isExpanded && (
//           <div className="space-y-4 animate-in slide-in-from-top duration-300">
//             <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

//             <div className="space-y-3">
//               <h4 className="font-semibold text-white mb-2">Ingredients:</h4>
//               <ul className="space-y-1 text-sm text-slate-300">
//                 {recipe.ingredients.map((ingredient, index) => (
//                   <li key={index} className="flex items-center gap-2">
//                     <div className="w-1 h-1 rounded-full bg-blue-400"></div>
//                     {ingredient}
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="space-y-3">
//               <h4 className="font-semibold text-white mb-2">Instructions:</h4>
//               <ol className="space-y-2 text-sm text-slate-300">
//                 {recipe.instructions.map((step, index) => (
//                   <li key={index} className="flex gap-3">
//                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-300 font-medium">
//                       {index + 1}
//                     </span>
//                     {step}
//                   </li>
//                 ))}
//               </ol>
//             </div>

//             <div className="flex items-center justify-between pt-4">
//               <div className="text-sm text-emerald-400 font-medium">
//                 Total Calories: {recipe.calories}
//               </div>
//               <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all">
//                 Add to Plan <Plus size={16} />
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Action Button */}
//         {!isExpanded && (
//           <div className="flex items-center justify-between pt-2">
//             <div className="text-sm text-emerald-400 font-medium">
//               {recipe.calories} calories
//             </div>
//             <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
//               View Recipe <ArrowUpRight size={16} />
//             </button>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// }

// export default function Nutrition() {
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [username, setusername] = useState("")
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [flexcoins, setflexcoins] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUsername = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         navigate("/login");
//         return;
//       }
//       try {
//         const res = await fetch("http://localhost:8000/validate", {
//           headers: {
//             "Authorization": `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to validate user");

//         const data = await res.json();

//         if (data?.status === "error") {
//           navigate("/login");
//           return;
//         }

//         if (data?.username) {
//           setusername(data.username);
//           console.log("Username:", data.username);
//           getflexcoins(data.username)
//         } else {
//           navigate("/login");
//         }
//       } catch (err) {
//         console.error("Error validating user:", err);
//         navigate("/login");
//       }
//     };

//     getUsername();
//   }, []);
//   const recipes = [
//     {
//       name: "Overnight Oats",
//       prepTime: "5min",
//       difficulty: "Easy",
//       rating: "4.8",
//       servingSize: "40gm",
//       calories: "320",
//       nutrition: {
//         protein: "40g",
//         carbs: "45g",
//         fat: "8g"
//       },
//       ingredients: [
//         "40gm High Protein rolled oats",
//         "1 scoop protein powder",
//         "1 tbsp chia seeds",
//         "1 cup almond milk",
//         "1 tbsp honey",
//         "½ cup berries"
//       ],
//       instructions: [
//         "Mix oats, protein powder, and chia seeds in a jar",
//         "Add almond milk and honey, stir well",
//         "Refrigerate overnight",
//         "Top with berries before serving"
//       ]
//     },
//     {
//       name: "Protein Bulking Smoothie (No whey)",
//       prepTime: "5min",
//       difficulty: "Easy",
//       rating: "4.9",
//       servingSize: "265mL",
//       calories: "630",
//       nutrition: {
//         protein: "30g",
//         carbs: "25g",
//         fat: "6g"
//       },
//       ingredients: [
//         "265mL milk (dairy or plant-based)",
//         "45gm oats",
//         "2 tbsp Peanut Butter",
//         "1 tbsp Honey",
//         "1 tbsp Chia Seeds",
//       ],
//       instructions: [
//         "Add all ingredients to blender",
//         "Blend on high for 60 seconds",
//         "Add ice for desired consistency",
//         "Serve immediately"
//       ]
//     },
//     {
//       name: "Paneer Sandwich",
//       prepTime: "15min",
//       difficulty: "Medium",
//       rating: "4.7",
//       servingSize: "4 slices",
//       calories: "450",
//       nutrition: {
//         protein: "40g",
//         carbs: "35g",
//         fat: "18g"
//       },
//       ingredients: [
//         "200g paneer, cubed",
//         "4 bread slices",
//         "1 tomato, sliced",
//         "Lettuce leaves",
//         "1 tsp olive oil",
//         "Spices to taste"
//       ],
//       instructions: [
//         "Sauté paneer with spices",
//         "Toast bread slices lightly",
//         "Layer paneer, tomato, and lettuce",
//         "Assemble and serve warm"
//       ]
//     },
//     {
//       name: "High Protein Chana Chaat (Recommened for post workout meal)",
//       prepTime: "15min",
//       difficulty: "Medium",
//       rating: "4.7",
//       servingSize: "1 bowl",
//       calories: "450",
//       nutrition: {
//         protein: "40g",
//         carbs: "35g",
//         fat: "18g"
//       },
//       ingredients: [
//         "50gm boiled chickpeas",
//         "100 gm cubed paneer",
//         "1/2 tbsp chaat masala",
//         "1/2 chopped onion",
//         "1 chopped tomato",
//         "Spices to taste"
//       ],
//       instructions: [
//         "Mix chickpeas, paneer, onion, and tomato",
//         "Add chaat masala and spices",
//         "Toss well and serve fresh"
//       ]
//     },
//     {
//       name: "Paneer Sandwich",
//       prepTime: "15min",
//       difficulty: "Medium",
//       rating: "4.7",
//       servingSize: "4 slices",
//       calories: "450",
//       nutrition: {
//         protein: "40g",
//         carbs: "35g",
//         fat: "18g"
//       },
//       ingredients: [
//         "200g paneer, cubed",
//         "4 bread slices",
//         "1 tomato, sliced",
//         "Lettuce leaves",
//         "1 tsp olive oil",
//         "Spices to taste"
//       ],
//       instructions: [
//         "Sauté paneer with spices",
//         "Toast bread slices lightly",
//         "Layer paneer, tomato, and lettuce",
//         "Assemble and serve warm"
//       ]
//     },
//     {
//       name: "Paneer Sandwich",
//       prepTime: "15min",
//       difficulty: "Medium",
//       rating: "4.7",
//       servingSize: "4 slices",
//       calories: "450",
//       nutrition: {
//         protein: "40g",
//         carbs: "35g",
//         fat: "18g"
//       },
//       ingredients: [
//         "200g paneer, cubed",
//         "4 bread slices",
//         "1 tomato, sliced",
//         "Lettuce leaves",
//         "1 tsp olive oil",
//         "Spices to taste"
//       ],
//       instructions: [
//         "Sauté paneer with spices",
//         "Toast bread slices lightly",
//         "Layer paneer, tomato, and lettuce",
//         "Assemble and serve warm"
//       ]
//     }
//   ];

//   const toggleCard = (index) => {
//     setExpandedCard(expandedCard === index ? null : index);
//   };
//   const getflexcoins = async (username) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/flexcoin?username=${username}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.json();
//       setflexcoins(data.coins)
//       return data; // This will be the response from your API
//     } catch (error) {
//       console.error("Error fetching flexcoins:", error);
//       return null;
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white flex relative overflow-hidden">
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       {/* Enhanced Sidebar */}
//       <aside className="w-72 bg-gradient-to-b from-[#0F1729] to-[#0A1018] backdrop-blur-xl border-r border-white/10 p-6 flex flex-col fixed top-0 left-0 h-full z-10 shadow-2xl">
//         {/* Logo with animation */}
//         <div className="flex items-center gap-4 mb-12 group cursor-pointer">
//           <div className="relative">
// <div className="w-14 h-14 rounded-2xl shadow-2xl group-hover:scale-110 transition-all duration-300">
//   <svg
//     viewBox="0 0 58 58"
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-full h-full rounded-2xl"
//   >
//     <defs>
//       <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
//         <stop offset="0%" stopColor="#0f172a" />
//         <stop offset="50%" stopColor="#1e3a8a" />
//         <stop offset="100%" stopColor="#3b82f6" />
//       </linearGradient>
//     </defs>

//     {/* Background */}
//     <rect x="0" y="0" width="58" height="58" rx="14" fill="url(#grad)" />

//     {/* Dumbbell icon */}
//     <g
//       transform="translate(17,17)"
//       className="origin-center"
//     >
//       <path
//         d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"
//         stroke="white"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         fill="none"
//       />
//       <path d="m2.5 21.5 1.4-1.4" stroke="white" strokeWidth="2" strokeLinecap="round" />
//       <path d="m20.1 3.9 1.4-1.4" stroke="white" strokeWidth="2" strokeLinecap="round" />
//       <path
//         d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"
//         stroke="white"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         fill="none"
//       />
//       <path d="m9.6 14.4 4.8-4.8" stroke="white" strokeWidth="2" strokeLinecap="round" />
//     </g>
//   </svg>
// </div>
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
//           </div>
//           <div>
//             <span className="text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent tracking-tight">Flexora</span>
//             <div className="text-xs text-gray-400 font-medium">Fitness Reimagined</div>
//           </div>
//         </div>

//         {/* Time Display */}
//         <div className="mb-6 p-4 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-2xl border border-white/10 backdrop-blur-sm">
//           <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//             {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//           </div>
//           <div className="text-sm text-gray-400">
//             {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
//           </div>
//         </div>

//         {/* Enhanced Navigation */}
//         <nav className="flex-1 space-y-3">
//           {[
//             { icon: Home, label: "Dashboard", color: "from-blue-500 to-cyan-500", page: "/app" },
//             { icon: Dumbbell, label: "Workouts", color: "from-green-500 to-emerald-500", page: "/workout" },
//             { icon: Apple, label: "Nutrition", active: true, color: "from-orange-500 to-yellow-500", page: "/nutrition" },
//             { icon: Users, label: "Community", color: "from-purple-500 to-pink-500", page: "/community" },
//             { icon: Coins, label: "FlexCoins", color: "from-amber-500 to-orange-500", page: "/flexcoins" },
//           ].map(({ icon: Icon, label, active, color, page }) => (
//             <Link
//               to={page}
//               key={label}
//               className={`group flex items-center gap-4 px-5 py-4 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden
//                 ${active
//                   ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg"
//                   : "text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
//                 }`}
//             >
//               {active && (
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl"></div>
//               )}
//               <div className={`relative p-2 rounded-xl ${active ? `bg-gradient-to-r ${color}` : 'bg-gray-700/50 group-hover:bg-gray-600/50'} transition-all duration-300`}>
//                 <Icon className="w-5 h-5 relative z-10" />
//               </div>
//               <span className="font-semibold relative z-10">{label}</span>
//               {active && <div className="absolute right-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>}
//             </Link>
//           ))}
//         </nav>

//         {/* Enhanced Profile */}
//         <div className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
//           <div className="relative flex items-center gap-4 p-4 bg-gradient-to-r from-[#1A1F2E] to-[#1E2331] rounded-2xl border border-white/10 backdrop-blur-sm">
//             <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl">
//               <User className="w-6 h-6" />
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="font-bold text-white truncate text-sm">
//                 {username}
//               </div>
//               <div className="flex items-center gap-2 text-xs text-gray-400">
//                 <Coins className="w-3 h-3 text-amber-400" />
//                 <span className="text-amber-400 font-semibold">{flexcoins}</span>
//                 <span>FlexCoins</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Enhanced Main Content */}
//       <div className="flex-1 p-10 relative z-10 ml-72">
//         {/* Breadcrumb */}
//         <div className="flex items-center gap-3 mb-12 text-slate-300">
//           <Link to={"/app"} className="hover:text-white transition-colors cursor-pointer">Home</Link>
//           <ChevronRight size={18} />
//           <span className="text-white font-medium">Nutrition</span>
//         </div>

//         {/* Enhanced Header */}
//         <div className="mb-12">
//           <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
//             Fuel Your Gains
//           </h1>
//           <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
//             Discover our curated collection of protein-rich recipes designed to maximize your workout results and accelerate recovery.
//           </p>

//           {/* Stats Cards */}
//           <div className="flex gap-6 mt-8">
//             <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
//               <TrendingUp className="text-emerald-400" size={20} />
//               <div>
//                 <div className="text-sm text-slate-300">Avg Protein</div>
//                 <div className="font-bold text-emerald-400">30g</div>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
//               <Clock className="text-blue-400" size={20} />
//               <div>
//                 <div className="text-sm text-slate-300">Prep Time</div>
//                 <div className="font-bold text-blue-400">8 min</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Recipe Cards Grid */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 mb-16">
//           {recipes.map((recipe, index) => (
//             <RecipeCard
//               key={index}
//               recipe={recipe}
//               isExpanded={expandedCard === index}
//               onToggle={() => toggleCard(index)}
//             />
//           ))}
//         </div>

//         {/* Enhanced Bottom Section */}
//         <div className="text-center py-12">
//           <Card className="inline-block px-8 py-6" hover={false}>
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center">
//                 <Plus className="text-blue-400" size={24} />
//               </div>
//               <div className="text-left">
//                 <div className="font-semibold text-white mb-1">More recipes coming soon!</div>
//                 <div className="text-sm text-slate-400">We're adding new protein-packed recipes every week</div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button"
import {
  Home,
  Dumbbell,
  Apple,
  Users,
  Coins,
  User,
  Flame,
  Footprints,
  TrendingUp,
  Send,
  Sparkles,
  Target,
  Zap,
  Award,
  Activity,
  Calendar,
  ChevronRight,
  Clock,
  Star,
  Plus,
  ArrowUpRight,
  Menu,
  X,
} from "lucide-react";
// react-router-dom is not available in this environment, so we use placeholder components
// In a real app, you would use: import { Link, useNavigate } from "react-router-dom";
const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;
const useNavigate = () => (path) => console.log(`Navigating to ${path}`);


// Enhanced Card component with glassmorphism effect
function Card({ children, className, onClick, hover = true }) {
  return (
    <div
      className={`
        backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl
        ${hover ? 'hover:bg-white/10 hover:border-white/20 lg:hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Enhanced recipe card with complete nutrition info
function RecipeCard({ recipe, isExpanded, onToggle }) {
  return (
    <Card className="p-6 relative group cursor-pointer" onClick={onToggle}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {recipe.name}
            </h3>
            
            {/* Image */}
            <div className="w-full max-w-64 h-64 flex items-center justify-center overflow-hidden rounded-lg">
              <img
                src={recipe.imglink}
                alt={recipe.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Recipe Info */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-emerald-400">
                  <Clock size={14} />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1 text-orange-400">
                  <Zap size={14} />
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span>{recipe.rating}</span>
                </div>
              </div>
              
              {/* Serving Size */}
              <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">Serving</div>
                <div className="text-sm font-medium text-white">{recipe.servingSize}</div>
              </div>
            </div>
          </div>

          {/* Nutrition Grid */}
          <div className="grid grid-row-1 sm:grid-row-3 gap-4">
            <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
              <div className="text-xl md:text-2xl font-bold text-blue-300">{recipe.nutrition.protein}</div>
              <div className="text-xs text-slate-300">Protein</div>
            </div>
            <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10">
              <div className="text-xl md:text-2xl font-bold text-emerald-300">{recipe.nutrition.carbs}</div>
              <div className="text-xs text-slate-300">Carbs</div>
            </div>
            <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-white/10">
              <div className="text-xl md:text-2xl font-bold text-orange-300">{recipe.nutrition.fat}</div>
              <div className="text-xs text-slate-300">Fat</div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top duration-300">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ingredients */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white mb-2">Ingredients:</h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white mb-2">Instructions:</h4>
                <ol className="space-y-2 text-sm text-slate-300">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-xs text-blue-300 font-medium">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-emerald-400 font-medium">
                Total Calories: {recipe.calories}
              </div>
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to plan logic here
                }}
              >
                Add to Plan <Plus size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Collapsed State Bottom */}
        {!isExpanded && (
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-emerald-400 font-medium">
              {recipe.calories} calories
            </div>
            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
              View Recipe <ArrowUpRight size={16} />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default function Nutrition() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [username, setusername] = useState("User")
  const [currentTime, setCurrentTime] = useState(new Date());
  const [flexcoins, setflexcoins] = useState(1250);
  const navigate = useNavigate();

  // NOTE: This useEffect is commented out as it relies on a local server
  // and localStorage, which are not available in this environment.
  // The component will use mock data for username and flexcoins.

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


  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const recipes = [
    {
      name: "Overnight Oats",
      imglink: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_548/k%2FPhoto%2FRecipes%2F2025-02-overnight-oats%2Fovernight-oats-484",
      prepTime: "5min",
      difficulty: "Easy",
      rating: "4.8",
      servingSize: "40gm",
      calories: "320",
      nutrition: {
        protein: "40g",
        carbs: "45g",
        fat: "8g"
      },
      ingredients: [
        "40gm High Protein rolled oats",
        "1 scoop protein powder",
        "1 tbsp chia seeds",
        "1 cup almond milk",
        "1 tbsp honey",
        "½ cup berries"
      ],
      instructions: [
        "Mix oats, protein powder, and chia seeds in a jar",
        "Add almond milk and honey, stir well",
        "Refrigerate overnight",
        "Top with berries before serving"
      ]
    },
    {
      name: "Protein Bulking Smoothie (No whey)",
      imglink: "https://ca.myprotein.com/images?url=https://blogscdn.thehut.net/app/uploads/sites/444/2020/10/BulkingShakes-FEATURE-1_1572368471_1604091319.jpg&auto=avif&width=1200&fit=crop",
      name: "Protein Bulking Smoothie",
      prepTime: "5min",
      difficulty: "Easy",
      rating: "4.9",
      servingSize: "265mL",
      calories: "630",
      nutrition: {
        protein: "30g",
        carbs: "25g",
        fat: "6g"
      },
      ingredients: [
        "265mL milk (dairy or plant-based)",
        "45gm oats",
        "2 tbsp Peanut Butter",
        "1 tbsp Honey",
        "1 tbsp Chia Seeds",
      ],
      instructions: [
        "Add all ingredients to blender",
        "Blend on high for 60 seconds",
        "Add ice for desired consistency",
        "Serve immediately"
      ]
    },
    {
      name: "Paneer Sandwich",
      imglink: "https://greenbowl2soul.com/wp-content/uploads/2022/06/paneer-sandwich.jpg",
      prepTime: "15min",
      difficulty: "Medium",
      rating: "4.7",
      servingSize: "4 slices",
      calories: "450",
      nutrition: {
        protein: "40g",
        carbs: "35g",
        fat: "18g"
      },
      ingredients: [
        "200g paneer, cubed",
        "4 bread slices",
        "1 tomato, sliced",
        "Lettuce leaves",
        "1 tsp olive oil",
        "Spices to taste"
      ],
      instructions: [
        "Sauté paneer with spices",
        "Toast bread slices lightly",
        "Layer paneer, tomato, and lettuce",
        "Assemble and serve warm"
      ]
    },
    {
      name: "High Protein Chana Chaat (Recommened for post workout meal)",
      imglink: "https://www.indianveggiedelight.com/wp-content/uploads/2025/06/roasted-chana-salad.jpg",
      name: "High Protein Chana Chaat",
      prepTime: "15min",
      difficulty: "Medium",
      rating: "4.7",
      servingSize: "1 bowl",
      calories: "450",
      nutrition: {
        protein: "40g",
        carbs: "35g",
        fat: "18g"
      },
      ingredients: [
        "50gm boiled chickpeas",
        "100 gm cubed paneer",
        "1/2 tbsp chaat masala",
        "1/2 chopped onion",
        "1 chopped tomato",
        "Spices to taste"
      ],
      instructions: [
        "Mix chickpeas, paneer, onion, and tomato",
        "Add chaat masala and spices",
        "Toss well and serve fresh"
      ]
    },
    {
      name: "Paneer Sandwich",
      imglink: "https://www.ruchikrandhap.com/wp-content/uploads/2017/09/Paneer-Corn-Spinach-Sandwich-4-1.jpg",
      prepTime: "15min",
      difficulty: "Medium",
      rating: "4.7",
      servingSize: "4 slices",
      calories: "450",
      nutrition: {
        protein: "40g",
        carbs: "35g",
        fat: "18g"
      },
      ingredients: [
        "200g paneer, cubed",
        "4 bread slices",
        "1 tomato, sliced",
        "Lettuce leaves",
        "1 tsp olive oil",
        "Spices to taste"
      ],
      instructions: [
        "Sauté paneer with spices",
        "Toast bread slices lightly",
        "Layer paneer, tomato, and lettuce",
        "Assemble and serve warm"
      ]
    },
    {
      name: "Paneer Sandwich",
      imglink: "https://www.vegrecipesofindia.com/wp-content/uploads/2017/01/paneer-sandwich-recipe-1.jpg",
      prepTime: "15min",
      difficulty: "Medium",
      rating: "4.7",
      servingSize: "4 slices",
      calories: "450",
      nutrition: {
        protein: "40g",
        carbs: "35g",
        fat: "18g"
      },
      ingredients: [
        "200g paneer, cubed",
        "4 bread slices",
        "1 tomato, sliced",
        "Lettuce leaves",
        "1 tsp olive oil",
        "Spices to taste"
      ],
      instructions: [
        "Sauté paneer with spices",
        "Toast bread slices lightly",
        "Layer paneer, tomato, and lettuce",
        "Assemble and serve warm"
      ]
    },
    {
      name: "Greek Yogurt Parfait",
      imglink: "https://spicecravings.com/wp-content/uploads/2023/09/Greek-Yogurt-Parfait-Featured.jpg",
      prepTime: "10min",
      difficulty: "Easy",
      rating: "4.8",
      servingSize: "1 bowl",
      calories: "380",
      nutrition: { protein: "35g", carbs: "40g", fat: "10g" },
      ingredients: ["200g Greek yogurt", "50g granola", "1/2 cup mixed berries", "1 tbsp honey"],
      instructions: ["Layer yogurt, granola, and berries in a glass.", "Drizzle with honey.", "Repeat layers.", "Serve chilled."]
    },
    {
      name: "Spicy Tofu Scramble",
      imglink: "https://asset.slimmingworld.co.uk/content/media/20551/spicy-tofu-scramble-sq_sw_recipe.jpg?v1=JGXiore20qg9NNIj0tmc3TKfKw-jr0s127JqqpCA2x7sMviNgcAYh1epuS_Lqxebn9V_qusKHfwbF7MOUrAPptzBhXIUL1Xnq2Mmdvx4fOk&width=552&height=552",
      prepTime: "20min",
      difficulty: "Medium",
      rating: "4.6",
      servingSize: "200g",
      calories: "320",
      nutrition: { protein: "25g", carbs: "15g", fat: "18g" },
      ingredients: ["200g firm tofu", "1/2 onion, chopped", "1/2 bell pepper, chopped", "1 tsp turmeric", "1/2 tsp chili powder", "Salt and pepper"],
      instructions: ["Crumble tofu in a bowl.", "Sauté onion and bell pepper.", "Add tofu and spices.", "Cook for 5-7 minutes, stirring occasionally."]
    }
  ];

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white flex flex-col lg:flex-row relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
      {/* RESPONSIVE SIDEBAR/BOTTOM NAV */}
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
                        { icon: Dumbbell, label: "Workouts",  color: "from-green-500 to-emerald-500", page: "/workout" },
                        { icon: Apple, label: "Nutrition",active: true, color: "from-orange-500 to-yellow-500", page: "/nutrition" },
                        { icon: Users, label: "Community", color: "from-purple-500 to-pink-500", page: "/community" },
                        { icon: Coins, label: "FlexCoins (soon)", color: "from-amber-500 to-orange-500", page: "/flexcoins" },
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
                                <span className="text-amber-400 font-semibold">{flexcoins}</span>
                                <span>FlexCoins</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </aside>

      {/* Enhanced Main Content - Responsive margin and padding */}
      <div className="flex-1 p-6 lg:p-10 relative z-10 lg:ml-72 pb-28 lg:pb-10">
          <div className="lg:hidden bg-slate-800/20 backdrop-blur-2xl border-b border-slate-700/30 p-4 flex items-center justify-between shadow-xl">
                    <Button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
          </div>
        {/* Breadcrumb */}
        <div className="hidden md:flex items-center gap-3 mb-12 text-slate-300">
          <Link to={"/app"} className="hover:text-white transition-colors cursor-pointer">Home</Link>
          <ChevronRight size={18} />
          <span className="text-white font-medium">Nutrition</span>
        </div>

        {/* Enhanced Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Fuel Your Gains
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Discover our curated collection of protein-rich recipes designed to maximize your results.
          </p>

          {/* Stats Cards */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
              <TrendingUp className="text-emerald-400" size={20} />
              <div>
                <div className="text-sm text-slate-300">Avg Protein</div>
                <div className="font-bold text-emerald-400">30g</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <Clock className="text-blue-400" size={20} />
              <div>
                <div className="text-sm text-slate-300">Prep Time</div>
                <div className="font-bold text-blue-400">~12 min</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-16">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              isExpanded={expandedCard === index}
              onToggle={() => toggleCard(index)}
            />
          ))}
        </div>

        {/* Enhanced Bottom Section */}
        <div className="text-center py-12">
          <Card className="inline-block px-8 py-6" hover={false}>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 items-center justify-center">
                <Plus className="text-blue-400" size={24} />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white mb-1">More recipes coming soon!</div>
                <div className="text-sm text-slate-400">We're adding new recipes every week.</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
