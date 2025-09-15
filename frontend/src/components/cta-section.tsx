import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-t from-black to-black/80">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500/30 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Join the fitness revolution</span>
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your 
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Student Fitness?
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Join thousands of students who are already building healthy habits 
            that enhance their academic performance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-medium rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all group"
            >
              Start Free Today
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No subscription required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Easy access</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}