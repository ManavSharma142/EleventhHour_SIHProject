import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, Settings, Coins, Activity } from 'lucide-react';

interface HeaderProps {
  flexCoins: number;
}

export function Header({ flexCoins }: HeaderProps) {
  return (
    <motion.header 
      className="relative z-10 bg-black/20 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Flexora</span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#dashboard" className="text-white/80 hover:text-white transition-colors">Dashboard</a>
            <a href="#workouts" className="text-white/80 hover:text-white transition-colors">Workouts</a>
            <a href="#ai-split" className="text-white/80 hover:text-white transition-colors">AI Split</a>
            <a href="#progress" className="text-white/80 hover:text-white transition-colors">Progress</a>
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            {/* Flex Coins */}
            <motion.div 
              className="flex items-center space-x-2 bg-yellow-500/20 backdrop-blur-sm px-3 py-2 rounded-lg border border-yellow-500/30"
              whileHover={{ scale: 1.05 }}
            >
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium">{flexCoins}</span>
            </motion.div>

            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}