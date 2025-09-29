"use client"

import { motion } from "framer-motion"
import { ChevronDown, Mail, MessageCircle } from "lucide-react"
import { useState } from "react"

export  default function FAQs() {
  const [openFAQ, setOpenFAQ] = useState(null)

  const faqs = [
    {
      question: "How does Flexora's AI create personalized workout plans?",
      answer:
        "Flexora's advanced AI analyzes your fitness level, goals, available equipment, time constraints, and preferences to generate completely customized workout routines. Our machine learning algorithms continuously adapt your plans based on your progress, feedback, and performance data to ensure optimal results.",
    },
    {
      question: "Can I use Flexora without gym equipment?",
      answer:
        "Flexora is designed for both gym and home workouts. Our AI can create effective bodyweight routines, resistance band workouts, and exercises using common household items. Whether you're in a dorm room, hotel, or your living room, Flexora adapts to your available space and equipment.",
    },
    {
      question: "How does the progress tracking work?",
      answer:
        "Flexora tracks multiple metrics including workout completion, strength gains, endurance improvements, and consistency patterns. Our smart analytics provide insights into your fitness journey with visual progress charts, achievement badges, and personalized recommendations for continuous improvement.",
    },
    {
      question: "Is Flexora suitable for beginners?",
      answer:
        "Yes! Flexora is perfect for all fitness levels. Our AI starts with a comprehensive assessment to understand your current fitness level and creates beginner-friendly routines with proper form guidance, gradual progression, and educational content to help you build a strong foundation safely.",
    },
    {
      question: "What makes Flexora different from other fitness apps?",
      answer:
        "Flexora combines cutting-edge AI technology with deep understanding of student and professional lifestyles. Unlike generic fitness apps, we specialize in creating flexible, time-efficient workouts that fit around your academic or work schedule, with 24/7 AI support and community features, Nutrition plans, Articles from industry experts and more",
    },
    {
      question: "How much does Flexora cost?",
      answer:
        "Flexora is a complete free of cost platform which provides you with almost every feature and utlity you expectt from a fitness app, So chill outt, we don't want you to break your piggybank for stayiing fit. ",
    },
    {
      question: "Can I sync Flexora with other fitness devices?",
      answer:
        "Yes! Flexora integrates with fitness trackers, smartwatches, and health app - Google Fit. This allows for seamless data synchronization and more accurate progress tracking across all your fitness activities.",
    },
    {
      question: "What if I have specific injuries or limitations?",
      answer:
        "Flexora's AI can accommodate various physical limitations and injuries. During setup, you can specify any restrictions, and our system will modify exercises accordingly. However, we always recommend consulting with healthcare professionals for serious injuries or medical conditions.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-20 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
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
              <a href="/features" className="text-white/80 hover:text-white transition-colors">
                Features
              </a>
              <a href="/" className="text-white hover:text-white transition-colors font-medium">
                Go Back
              </a>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Title Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Everything you need to know about Flexora's AI-powered fitness platform. Can't find what you're looking
              for? We're here to help.
            </motion.p>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-white pr-4">{faq.question}</h3>
                  <motion.div animate={{ rotate: openFAQ === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <p className="text-white/80 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            className="text-center bg-gradient-to-br from-blue-500/20 to-blue-800/30 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <MessageCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Still got a doubt?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Our team is here to help you get the most out of your Flexora experience. Reach out anytime for
              personalized support.
            </p>

            <motion.a
              href="mailto:support@flexora.com"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=support@flexora.com&su=Support%20Request&body=Hi%20Team," target="_blank">
            Contact Us - support@flexora.com
            </a>
            </motion.a>

            <p className="text-white/50 text-sm mt-4">We typically respond within 48 hours</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              className="flex items-center space-x-4 mb-6 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-2xl shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" className="w-full h-full rounded-2xl">
                    <defs>
                      <linearGradient id="footerGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#0f172a" />
                        <stop offset="50%" stopColor="#1e3a8a" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="58" height="58" rx="14" fill="url(#footerGrad)" />
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
              </div>
              <span className="text-white/40 text-sm">© 2025 Flexora. All rights reserved.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4">
                <a href="/terms" className="text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
