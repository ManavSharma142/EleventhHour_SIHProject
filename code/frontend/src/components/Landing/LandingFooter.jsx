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
<div className="w-14 h-14 rounded-2xl shadow-2xl group-hover:scale-110 transition-all duration-300">
  <svg
    viewBox="0 0 58 58"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full rounded-2xl"
  >
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="50%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>

    {/* Background */}
    <rect x="0" y="0" width="58" height="58" rx="14" fill="url(#grad)" />

    {/* Dumbbell icon */}
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
