import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Activity, Clock, Target, Zap, TrendingUp, Calendar } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  progress?: number;
  delay: number;
}

function StatCard({ title, value, change, icon, progress, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            {icon}
          </div>
          <span className="text-green-400 text-sm">{change}</span>
        </div>
        <h3 className="text-white/60 text-sm mb-1">{title}</h3>
        <p className="text-3xl font-bold mb-3">{value}</p>
        {progress !== undefined && (
          <Progress value={progress} className="h-2" />
        )}
      </Card>
    </motion.div>
  );
}

export function DashboardStats() {
  const stats = [
    {
      title: "Today's Workouts",
      value: "2/3",
      change: "+1 from yesterday",
      icon: <Activity className="w-5 h-5 text-purple-400" />,
      progress: 67,
      delay: 0
    },
    {
      title: "Active Minutes",
      value: "45m",
      change: "+12% this week",
      icon: <Clock className="w-5 h-5 text-blue-400" />,
      delay: 0.1
    },
    {
      title: "Weekly Goal",
      value: "4/5",
      change: "80% complete",
      icon: <Target className="w-5 h-5 text-green-400" />,
      progress: 80,
      delay: 0.2
    },
    {
      title: "Flex Coins",
      value: "1,247",
      change: "+25 today",
      icon: <Zap className="w-5 h-5 text-yellow-400" />,
      delay: 0.3
    },
    {
      title: "Streak",
      value: "12 days",
      change: "Personal best!",
      icon: <TrendingUp className="w-5 h-5 text-orange-400" />,
      delay: 0.4
    },
    {
      title: "Next Workout",
      value: "6:00 PM",
      change: "Pull Day",
      icon: <Calendar className="w-5 h-5 text-indigo-400" />,
      delay: 0.5
    }
  ];

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Your Fitness Dashboard</h2>
          <p className="text-xl text-white/60">Track your progress and stay motivated</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}