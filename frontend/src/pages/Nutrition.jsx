import React, { useState } from "react";
import { Home, Dumbbell, Apple, Users, Coins, ChevronRight, Clock, Zap, TrendingUp, Star, ArrowUpRight, Plus } from "lucide-react";

// Enhanced Card component with glassmorphism effect
function Card({ children, className, onClick, hover = true }) {
  return (
    <div 
      className={`
        backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl
        ${hover ? 'hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// Animated gradient background component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
    </div>
  );
}

// Enhanced recipe card with complete nutrition info
function RecipeCard({ recipe, isExpanded, onToggle }) {
  return (
    <Card className="p-6 relative group" onClick={onToggle}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {recipe.name}
            </h3>
            <div className="flex items-center gap-4 text-sm">
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
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 mb-1">Serving Size</div>
            <div className="text-sm font-medium text-white">{recipe.servingSize}</div>
          </div>
        </div>

        {/* Nutrition Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10">
            <div className="text-2xl font-bold text-blue-300">{recipe.nutrition.protein}</div>
            <div className="text-xs text-slate-300">Protein</div>
          </div>
          <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-white/10">
            <div className="text-2xl font-bold text-emerald-300">{recipe.nutrition.carbs}</div>
            <div className="text-xs text-slate-300">Carbs</div>
          </div>
          <div className="text-center p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-white/10">
            <div className="text-2xl font-bold text-orange-300">{recipe.nutrition.fat}</div>
            <div className="text-xs text-slate-300">Fat</div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top duration-300">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
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

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-emerald-400 font-medium">
                Total Calories: {recipe.calories}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all">
                Add to Plan <Plus size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Action Button */}
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

  const recipes = [
    {
      name: "Overnight Oats",
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
    }
  ];

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Enhanced Sidebar */}
      <div className="w-72 backdrop-blur-xl bg-black/20 border-r border-white/10 p-8 flex flex-col relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Flexora
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-3">
          <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white shadow-lg">
            <Home size={22} />
            <span className="font-medium">Home</span>
          </div>
          
          {[
            { icon: Dumbbell, label: "Workout" },
            { icon: Apple, label: "Nutrition" },
            { icon: Users, label: "Community" },
            { icon: Coins, label: "FlexCoins" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 px-6 py-4 rounded-2xl text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer group">
              <item.icon size={22} className="group-hover:scale-110 transition-transform" />
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        {/* Enhanced User Profile */}
        <Card className="flex items-center gap-4 p-4" hover={false}>
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-white">Username</div>
            <div className="flex items-center gap-2 text-sm">
              <Coins size={14} className="text-yellow-400" />
              <span className="text-yellow-400 font-medium">1,259</span>
              <span className="text-slate-400">FlexCoins</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 p-10 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-12 text-slate-300">
          <span className="hover:text-white transition-colors cursor-pointer">Home</span>
          <ChevronRight size={18} />
          <span className="text-white font-medium">Nutrition</span>
        </div>

        {/* Enhanced Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Fuel Your Gains
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Discover our curated collection of protein-rich recipes designed to maximize your workout results and accelerate recovery.
          </p>
          
          {/* Stats Cards */}
          <div className="flex gap-6 mt-8">
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
                <div className="font-bold text-blue-400">8 min</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Recipe Cards Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8 mb-16">
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center">
                <Plus className="text-blue-400" size={24} />
              </div>
              <div className="text-left">
                <div className="font-semibold text-white mb-1">More recipes coming soon!</div>
                <div className="text-sm text-slate-400">We're adding new protein-packed recipes every week</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}