import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Brain, Smartphone, Coins, Heart } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: "Personalized AI Split Generator",
      description: "Get custom workout plans tailored to your goals, experience level, and schedule using advanced AI algorithms."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
      title: "Google Fit Integration",
      description: "Seamlessly sync your fitness data across all devices and track your progress automatically."
    },
    {
      icon: <Coins className="w-8 h-8 text-yellow-400" />,
      title: "FlexCoin System",
      description: "Earn rewards for achieving fitness goals and redeem them for premium features and exclusive content."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-400" />,
      title: "Stress-Busting Sessions",
      description: "Access guided meditation, breathing exercises, and relaxation techniques to manage academic stress."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black/40 to-black/60">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need for fitness
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Comprehensive tools and features designed to support your fitness journey from day one
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 h-full">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}