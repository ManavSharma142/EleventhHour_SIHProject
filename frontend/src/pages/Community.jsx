import React, { useState, useRef, useEffect } from "react";
import { 
  Home, Dumbbell, Apple, Users, Coins, ChevronRight, Send, 
  Heart, MessageCircle, Share2, Eye, Clock, User, Search,
  Filter, TrendingUp, Award, Star, ThumbsUp, Bookmark
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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

// Enhanced Article Card
function ArticleCard({ article, isExpanded, onToggle }) {
  return (
    <Card className="p-8 group" onClick={onToggle}>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-blue-400">
                <User size={14} />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <Eye size={14} />
                <span>{article.views}</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
              {article.title}
            </h3>
            
            {isExpanded && (
              <div className="space-y-4 animate-in slide-in-from-top duration-300">
                <p className="text-slate-300 leading-relaxed">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            {article.featured && (
              <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                <Star size={16} className="text-yellow-400" fill="currentColor" />
              </div>
            )}
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <Award size={16} className="text-purple-400" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors">
              <Heart size={18} />
              <span className="text-sm">{article.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm">{article.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
              <Share2 size={18} />
              <span className="text-sm">Share</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="text-slate-400 hover:text-yellow-400 transition-colors">
              <Bookmark size={18} />
            </button>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all">
              {isExpanded ? 'Read Full Article' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Enhanced Chat Message Component
function ChatMessage({ message, isUser }) {
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {message.author[0]}
        </div>
      )}
      
      <div className={`max-w-[80%] ${isUser ? 'order-first' : ''}`}>
        <div className={`
          px-4 py-3 rounded-2xl text-sm
          ${isUser 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md' 
            : 'bg-white/10 border border-white/20 text-white rounded-bl-md'
          }
        `}>
          {message.text}
        </div>
        <div className={`text-xs text-slate-400 mt-1 ${isUser ? 'text-right' : ''}`}>
          {message.time}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          U
        </div>
      )}
    </div>
  );
}

export default function Community() {
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, text: "I'm doing my exam preparation so can't do gym", author: "User1", time: "2:30 PM", isUser: false },
    { id: 2, text: "Same bro", author: "User2", time: "2:31 PM", isUser: false },
    { id: 3, text: "Instead you can do quick 20min Workout from FLexora App !", author: "User3", time: "2:32 PM", isUser: false },
    { id: 4, text: "What's Flexora ?", author: "User4", time: "2:33 PM", isUser: false },
    { id: 5, text: "Flexora is an amazing fitness app with personalised Ai workout plans, diet and much more !", author: "User5", time: "2:34 PM", isUser: false },
    { id: 6, text: "I'll try it asap !", author: "You", time: "2:35 PM", isUser: true },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [flexcoins, setflexcoins] = useState(0);

  const navigate = useNavigate();
  const [username, setusername] = useState("")
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


  const articles = [
    {
      id: 1,
      title: "How much does \"Time Under Tension\" actually matter?",
      author: "Dr. Mike Israetel",
      readTime: "8 min read",
      views: "12.4k",
      likes: 245,
      comments: 89,
      featured: true,
      excerpt: "Time under tension (TUT) has been a hot topic in the fitness community for years. In this comprehensive analysis, we dive deep into the scientific research to understand whether controlling tempo actually leads to better muscle growth and strength gains.",
      tags: ["Science", "Muscle Building", "Training"]
    },
    {
      id: 2,
      title: "What's the ideal frequency of training each muscle group per week?",
      author: "Brad Schoenfeld",
      readTime: "12 min read",
      views: "18.7k",
      likes: 432,
      comments: 156,
      featured: false,
      excerpt: "Training frequency is one of the most debated topics in resistance training. This meta-analysis examines the optimal number of times per week you should train each muscle group for maximum hypertrophy and strength development.",
      tags: ["Training", "Frequency", "Research"]
    },
    {
      id: 3,
      title: "Are Lengthened-partials actually worth it or just a hype?",
      author: "Jeff Nippard",
      readTime: "10 min read",
      views: "9.2k",
      likes: 298,
      comments: 74,
      featured: true,
      excerpt: "Lengthened partials have gained massive popularity recently, but do they actually provide superior muscle building benefits? We examine the latest research and practical applications of this training technique.",
      tags: ["Technique", "Hypertrophy", "Evidence-Based"]
    },
    {
      id: 4,
      title: "The Complete Guide to Progressive Overload in 2024",
      author: "Layne Norton",
      readTime: "15 min read",
      views: "25.1k",
      likes: 567,
      comments: 203,
      featured: false,
      excerpt: "Progressive overload is the foundation of all successful training programs. Learn the most effective methods to progressively challenge your muscles and ensure continuous growth and strength gains.",
      tags: ["Progressive Overload", "Training", "Beginner"]
    }
  ];

  const toggleArticle = (index) => {
    setExpandedArticle(expandedArticle === index ? null : index);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        author: "You",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isUser: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#0D1421] to-[#111827] text-white flex relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
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
                  { icon: Dumbbell, label: "Workouts", color: "from-green-500 to-emerald-500", page: "/workout" },
                  { icon: Apple, label: "Nutrition", color: "from-orange-500 to-yellow-500", page: "/nutrition" },
                  { icon: Users, label: "Community",active: true, color: "from-purple-500 to-pink-500", page: "/community" },
                  { icon: Coins, label: "FlexCoins", color: "from-amber-500 to-orange-500", page: "/flexcoin" },
                ].map(({ icon: Icon, label, active, color,page }) => (
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
      <div className="flex-1 flex p-10 relative z-10 ml-72">
        {/* Articles Section */}
        <div className="flex-1 p-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12 text-slate-300">
            <Link to="/app" className="hover:text-white transition-colors cursor-pointer">Home</Link>
            <ChevronRight size={18} />
            <span className="text-white font-medium">Community</span>
          </div>

          {/* Enhanced Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                  Articles
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Discover the latest insights from fitness experts and researchers
                </p>
              </div>
              
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <TrendingUp className="text-emerald-400" size={20} />
                <div>
                  <div className="text-sm text-slate-300">Trending Topics</div>
                  <div className="font-bold text-emerald-400">Training Science</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <MessageCircle className="text-blue-400" size={20} />
                <div>
                  <div className="text-sm text-slate-300">Active Discussions</div>
                  <div className="font-bold text-blue-400">247</div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Cards */}
          <div className="space-y-6">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                article={article}
                isExpanded={expandedArticle === index}
                onToggle={() => toggleArticle(index)}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Chat Section */}
        <div className="h-screen w-96 border-l border-white/10 backdrop-blur-xl bg-white/5 flex flex-col rounded-2xl overflow-y-auto scrollbar-hide">
          {/* Chat Header */}
          <div className="p-6 border-b border-white/10 ">
            <h2 className="text-2xl font-bold text-white mb-2">Community Chat</h2>
            <p className="text-slate-400">Here's what others say</p>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-slate-800 flex items-center justify-center text-white text-xs font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-emerald-400 font-medium">+12 online</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-hide">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} isUser={message.isUser} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Chat Input */}
          <div className="p-6 border-t border-white/10">
            <div className="flex gap-3">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                onClick={sendMessage}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:shadow-lg transition-all flex-shrink-0"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="text-xs text-slate-400 mt-2 text-center">
              Press Enter to send 

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}