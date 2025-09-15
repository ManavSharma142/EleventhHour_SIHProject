import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Zap, Target, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered Fitness
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Transform Your 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {" "}Fitness Journey
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl text-white/70 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Get personalized AI-generated workout splits, track your progress with Google Fit integration, 
              and earn Flex Coins for achieving your fitness goals.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                <Play className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-white/60 text-sm">AI Workouts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-white/60 text-sm">Progress Tracking</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-white/60 text-sm">Flex Rewards</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Hero image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative z-10"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1675910518330-1843b4d03de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrb3V0JTIwYXRobGV0ZXxlbnwxfHx8fDE3NTc5MjIzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern fitness workout"
                className="w-full h-[500px] object-cover rounded-2xl border border-white/10 shadow-2xl"
              />
              
              {/* Floating stats cards */}
              <motion.div
                className="absolute -top-4 -right-4 bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-white/10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <p className="text-white/60 text-sm">Today's Progress</p>
                <p className="text-2xl font-bold text-white">85%</p>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-black/40 backdrop-blur-lg rounded-xl p-4 border border-white/10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <p className="text-white/60 text-sm">Flex Coins Earned</p>
                <p className="text-2xl font-bold text-yellow-400">+25</p>
              </motion.div>
            </motion.div>

            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-3xl -z-10 scale-110" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}