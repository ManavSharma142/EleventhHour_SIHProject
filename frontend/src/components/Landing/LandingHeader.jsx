import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

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
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">Flexora</span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#community" className="text-white/80 hover:text-white transition-colors">Community</a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
