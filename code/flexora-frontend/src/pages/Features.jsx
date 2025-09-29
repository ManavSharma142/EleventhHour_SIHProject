"use client"

import { motion } from "framer-motion"
import { Zap, Users, ChefHat, TrendingUp, Pointer } from "lucide-react"

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const features = [
    {
      id: "workout-generator",
      title: "AI Workout Generator",
      subtitle: "Personalized Training Plans",
      description:
        "Generate custom workout plans tailored to your goals, schedule, and preferences with our advanced AI technology.",
      icon: Zap,
      badge: "AI Powered",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-09-29%20115722-IY02hBTbI0FiPkfaiCsveCEzrFdUC2.png",
      stats: [
        { label: "Time", value: "Flexible" },
        { label: "Goals", value: "Customized" },
        { label: "Types", value: "50+" },
      ],
    },
    {
      id: "community-hub",
      title: "Community Hub",
      subtitle: "Insights from Fitness Experts",
      description:
        "Connect with fitness professionals and enthusiasts. Access expert articles, tips, and join discussions.",
      icon: Users,
      badge: "Expert Content",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-09-29%20115752-v3KYKE4OQx9TPQM3pdnsQ3EpblnTKF.png",
      stats: [
        { label: "Articles", value: "500+" },
        { label: "Experts", value: "50+" },
        { label: "Members", value: "10K+" },
      ],
    },
    {
      id: "nutrition",
      title: "Fuel Your Gains",
      subtitle: "Protein-Rich Recipes",
      description:
        "Discover curated collection of protein-rich recipes designed to maximize your results and fuel your fitness journey.",
      icon: ChefHat,
      badge: "Nutrition Focus",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-09-29%20115810-9cXI1fWAep8yaJXso8OtqJRv8Xd3sw.png",
      stats: [
        { label: "Recipes", value: "200+" },
        { label: "Avg Protein", value: "30g" },
        { label: "Prep Time", value: "~12min" },
      ],
    },
  ]

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-900/10 to-transparent rounded-full" />
      </div>
      <motion.header
        className="relative z-10 bg-transparent py-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="w-14 h-14 rounded-2xl shadow-2xl group-hover:scale-110 transition-all duration-300">
                <svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-2xl">
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0f172a" />
                      <stop offset="50%" stopColor="#1e3a8a" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="58" height="58" rx="14" fill="url(#grad)" />
                  <g
                    transform="translate(17,17)"
                    className="group-hover:rotate-45 transition-transform duration-300 origin-center"
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
              <span className="text-xl font-semibold text-white">Flexora</span>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-white/80 hover:text-white transition-colors">
                Go Back
              </a>
              <a href="/faqs" className="text-white hover:text-white transition-colors font-medium">
                FAQs
              </a>
            </nav>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 mb-6"
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-medium">Powerful Features</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
              {" "}
              Transform
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto text-pretty">
            Discover the complete fitness ecosystem designed to help you achieve your goals faster and smarter than ever
            before.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={feature.id} variants={itemVariants} className="group relative">
              <div className="relative h-full bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30">
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30">
                      <span className="text-blue-300 text-xs font-medium">{feature.badge}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-blue-300 font-medium mb-4">{feature.subtitle}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>

                {/* Feature Image */}
                <div className="relative mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Floating Stats */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    {feature.stats.map((stat, statIndex) => (
                      <div
                        key={statIndex}
                        className="flex-1 bg-black/60 backdrop-blur-sm rounded-lg p-2 border border-gray-700/50"
                      >
                        <div className="text-xs text-gray-400">{stat.label}</div>
                        <div className="text-sm font-bold text-white">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mt-20"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-12 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span className="text-green-400 font-semibold">Ready to Transform?</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join thousands who are already
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                crushing their goals
              </span>
            </h3>

            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your fitness journey today with AI-powered workouts, expert guidance, and nutrition plans that
              actually work.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                <a href="/">Get Started Free</a>
               
              </motion.button>

              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:bg-blue-600/10"
              >
                Watch Demo
              </motion.button> */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
