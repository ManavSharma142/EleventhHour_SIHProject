import React, { useState, useRef, useEffect } from "react";
import {
  Home, Dumbbell, Apple, Users, Coins, ChevronRight, Send,
  Heart, MessageCircle, Share2, Eye, Clock, User, X,
  Filter, TrendingUp, Award, Star, ThumbsUp, Bookmark, Menu
} from "lucide-react";
// react-router-dom is not available in this environment, so we use placeholder components
// In a real app, you would use: import { Link, useNavigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";



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

// Enhanced Article Card
function ArticleCard({ article, isExpanded, onToggle }) {
  return (
    <Card className="p-6 md:p-8 group" onClick={onToggle}>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
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

            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
              {article.title}
            </h3>

            {isExpanded && (
              <div className="space-y-4 animate-in slide-in-from-top duration-300">
                <p className="text-slate-300 leading-relaxed">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs md:text-sm">
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
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-pink-500/20 border border-blue-500/30">
              <Award size={16} className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-white/10 gap-4">
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
            <button className="text-slate-400 hover:text-yellow-400 transition-colors p-2">
              <Bookmark size={18} />
            </button>
            <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all">
              {isExpanded ? 'Close' : 'Read More'}
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
        <div className={`px-4 py-3 rounded-2xl text-sm ${isUser ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md' : 'bg-white/10 border border-white/20 text-slate-200 rounded-bl-md'}`}>
          {message.text}
        </div>
        <div className={`text-xs text-slate-400 mt-1 ${isUser ? 'text-right' : ''}`}>
          {message.time}
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {message.author[0]}
        </div>
      )}
    </div>
  );
}

// Chat Component for responsiveness
function ChatSection({ messages, newMessage, setNewMessage, sendMessage, handleKeyPress, onClose, totaluser }) {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    // Scroll to the latest message whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="backdrop-blur-xl bg-black/70 flex flex-col h-full w-full">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/10 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Community Chat</h2>
          <p className="text-sm text-slate-400">{totaluser} members online</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        )}
      </div>
      {/* Chat Messages */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-hide">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} isUser={message.isUser} />
        ))}
        {/* Empty div to reference for scrolling */}
        <div ref={messagesEndRef} />
      </div>
      {/* Enhanced Chat Input */}
      <div className="p-6 border-t border-white/10 bg-black/30">
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
      </div>
    </div>
  );
}


export default function Community() {
  const [expandedArticle, setExpandedArticle] = useState(0); // expand first article by default
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Flexora is really goood!", author: "SIH", time: "2:30 PM", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [flexcoins, setflexcoins] = useState(1250);
  const navigate = useNavigate();
  const [username, setusername] = useState("User");
  const [ws, setWs] = useState(null);
  const [totaluser, setTotaluser] = useState(1);



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
          getflexcoins(data.username);

          // WebSocket logic
          const socket = new WebSocket(`ws://localhost:8000/communintychat?username=${data.username}`);
          setWs(socket);

          socket.onopen = () => {
            console.log('WebSocket connection established.');
          };

          socket.onmessage = (event) => {
            try {
              const receivedMessage = JSON.parse(event.data);
              const now = new Date();
              const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              if (receivedMessage?.sysTotaluser != NaN){
                setTotaluser(receivedMessage.sysTotaluser);
                return;
              }
              setMessages(prevMessages => {
                const newMsg = {
                  id: prevMessages.length + 1,
                  text: receivedMessage.text,
                  author: receivedMessage.username,
                  time: timeString,
                  isUser: receivedMessage.username === data.username
                };
                return [...prevMessages, newMsg];
              });
            } catch (error) {
              console.error("Failed to parse message:", error);
            }
          };

          socket.onclose = () => {
            console.log('WebSocket connection closed.');
          };

          socket.onerror = (error) => {
            console.error('WebSocket error:', error);
          };

          return () => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.close();
            }
          };
        } else {
          navigate("/login");
        }
      } catch (err) {
        console.error("Error validating user:", err);
        navigate("/login");
      }
    };

    getUsername();
  }, []); // Empty dependency array ensures this effect runs only once

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
      return data;
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
    if (newMessage.trim() && ws && ws.readyState === WebSocket.OPEN) {
      const message = {
        username: username,
        text: newMessage,
      };
      ws.send(JSON.stringify(message));
      setNewMessage("");
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages(prevMessages => {
        const newMsg = {
          id: prevMessages.length + 1,
          text: newMessage,
          author: "You",
          time: timeString,
          isUser: true
        };
        return [...prevMessages, newMsg];
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

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
            { icon: Dumbbell, label: "Workouts", color: "from-green-500 to-emerald-500", page: "/workout" },
            { icon: Apple, label: "Nutrition", color: "from-orange-500 to-yellow-500", page: "/nutrition" },
            { icon: Users, label: "Community", active: true, color: "from-purple-500 to-pink-500", page: "/community" },
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
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 lg:p-10 lg:pr-28 relative z-10 lg:ml-72 xl:mr-96 pb-28 lg:pb-10">

        {/* Articles Section */}
        <div className="flex-1">
          <div className="lg:hidden bg-slate-800/20 backdrop-blur-2xl border-b border-slate-700/30 p-4 flex items-center justify-between shadow-xl">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>


          <div className="hidden md:flex items-center gap-3 mb-8 text-slate-300">
            <Link to="/app" className="hover:text-white transition-colors cursor-pointer">Home</Link>
            <ChevronRight size={18} />
            <span className="text-white font-medium">Community</span>
          </div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                Community Hub
              </h1>
              <p className="text-lg text-slate-300">Insights from fitness experts</p>
            </div>
            <button onClick={() => setIsChatOpen(true)} className="xl:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all">
              <MessageCircle size={16} />
              <span>Chat</span>
            </button>
          </div>

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
      </div>

      {/* Desktop Chat Section - FIXED POSITIONING */}
      <div className="hidden xl:block fixed right-0 top-0 h-full w-[30rem] p-6">
        <div className="border-l border-white/10 flex flex-col rounded-2xl overflow-hidden h-full max-h-[calc(100vh-5rem)] bg-white/5">
          <ChatSection
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            handleKeyPress={handleKeyPress}
            totaluser={totaluser/2}
          />
        </div>
      </div>

      {/* Mobile Chat Overlay */}
      {isChatOpen && (
        <div className="xl:hidden fixed inset-0 bg-black/50 z-30 animate-in fade-in-0">
          <div className="fixed inset-0 z-40">
            <ChatSection
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              handleKeyPress={handleKeyPress}
              onClose={() => setIsChatOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}