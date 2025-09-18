import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

export function LandingHeader() {
  return (
    <motion.header 
      className="relative z-10 bg-transparent py-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
              <Dumbbell className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <span className="text-xl font-semibold text-white">Flexora</span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/app" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="/community" className="text-white/80 hover:text-white transition-colors">Community</a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
