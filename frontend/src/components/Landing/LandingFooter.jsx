import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Activity, Mail } from 'lucide-react';

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
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
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
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
