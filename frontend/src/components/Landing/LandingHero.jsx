import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Link } from 'react-router-dom';

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <ImageWithFallback
          src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQjvMpEI0EsAMmShRiOIbSV4PF6neni0UtXkoSruvr8YB_C8yKXNJ3d1bwEUKUerzFgczI5PJf35t_HNrRoxKdRADRMUP6QFuKI4VmrNSrTwEZ-j6U"
          alt="Modern gym interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="container mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Flexora
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fitness that adapts to you.
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Personalized workout plans, AI-powered suggestions, and comprehensive 
            progress tracking for both gym and home workouts. Your fitness journey, 
            redefined.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/signup" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">
              Register Now
            </Link>
            <Link to="/login" size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-xl backdrop-blur-sm transition-all">
              Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
