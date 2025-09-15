import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 right-20 w-96 h-96 bg-blue-500 rounded-full opacity-15 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-80 h-80 bg-indigo-500 rounded-full opacity-10 blur-3xl"
        animate={{
          x: [0, 120, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 bg-repeat opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 32V.5h32' fill='none' stroke='%23ffffff' stroke-width='0.1'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}