import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Dumbbell, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingFooter() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and copyright */}
          <motion.div 
            className="flex items-center space-x-4 mb-6 md:mb-0"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
              <Dumbbell className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-300" />
            </div>
              <span className="text-xl font-semibold text-white">Flexora</span>
            </div>
            <span className="text-white/40 text-sm">© 2025 Flexora. All rights reserved.</span>
          </motion.div>

          {/* Contact button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className='flex items-center space-x-4'>
            <Link to={"/terms"}>Terms of Service</Link>
            <Link to={"/privacy"}>Privacy Policy</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
