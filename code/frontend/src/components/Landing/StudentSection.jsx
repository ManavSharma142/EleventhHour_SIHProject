import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { CheckCircle, Users } from 'lucide-react';

export function StudentSection() {
  const benefits = [
    "Workouts that fit in your dorm room",
    "Study break reminders to boost focus",
    "No expensive gym membership required",
    "Flexible scheduling around classes",
    "Progress tracking with academic benefits",
    "Community of fellow student athletes"
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black/60 to-black/80">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Built for working professionals & students
            </motion.h2>
            <motion.p 
              className="text-xl text-white/70 mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              We understand the unique challenges of balancing academics, work, and fitness. 
              Flexora is designed specifically for your busy lifestyle.
            </motion.p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white/80 text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} viewport={{ once: true }}>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all">
                <Users className="w-5 h-5 mr-2" />
                Join These Athletes
              </Button>
            </motion.div>
          </motion.div>

          {/* Right content - Visual */}
          <motion.div className="relative" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}>
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-800 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <motion.div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl font-bold text-blue-400 mb-2">15min</div>
                  <div className="text-white/70">Quick Workouts</div>
                </motion.div>
                <motion.div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl font-bold text-green-400 mb-2">85%</div>
                  <div className="text-white/70">Better Focus</div>
                </motion.div>
                <motion.div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl font-bold text-purple-400 mb-2">$0</div>
                  <div className="text-white/70">Gym Membership</div>
                </motion.div>
                <motion.div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                  <div className="text-white/70">Flexible Access</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
