import { motion } from 'framer-motion';
import { Users, Zap, Trophy } from 'lucide-react';

export function StatsBar() {
  const stats = [
    { icon: <Trophy className="w-6 h-6 text-blue-400" />, number: "100+", label: "Workout Splits Generated" },
    { icon: <Zap className="w-6 h-6 text-green-400" />, number: "24/7", label: "AI Support" },
    { icon: <Users className="w-6 h-6 text-purple-400" />, number: "5,000+", label: "Active Students" }
  ];

  return (
    <section className="py-16 px-6 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center mb-4">{stat.icon}</div>
              <motion.div 
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              >
                {stat.number}
              </motion.div>
              <p className="text-white/70 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
