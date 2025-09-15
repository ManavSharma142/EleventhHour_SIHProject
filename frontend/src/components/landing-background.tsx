import { motion } from 'framer-motion';

export function LandingBackground() {
  return (
    <div className="fixed inset-0 -z-20 bg-black">
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
      
      {/* Animated subtle orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
}