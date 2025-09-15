import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Coins, Trophy, Target, Gift, Star, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  progress?: number;
  maxProgress?: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: string;
  available: boolean;
}

export function FlexCoinSystem() {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Workout',
      description: 'Complete your first workout session',
      reward: 50,
      completed: true
    },
    {
      id: '2',
      title: 'Weekly Warrior',
      description: 'Complete 5 workouts this week',
      reward: 100,
      completed: false,
      progress: 3,
      maxProgress: 5
    },
    {
      id: '3',
      title: 'Consistency King',
      description: 'Maintain a 7-day workout streak',
      reward: 200,
      completed: false,
      progress: 5,
      maxProgress: 7
    },
    {
      id: '4',
      title: 'Goal Crusher',
      description: 'Achieve all daily fitness goals',
      reward: 75,
      completed: true
    }
  ];

  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Premium Workout Plans',
      description: 'Access exclusive AI-generated premium workout plans',
      cost: 500,
      category: 'Training',
      available: true
    },
    {
      id: '2',
      title: 'Nutrition Guide',
      description: 'Personalized meal plans and nutrition tracking',
      cost: 300,
      category: 'Nutrition',
      available: true
    },
    {
      id: '3',
      title: 'Virtual Personal Trainer',
      description: '1-on-1 virtual training session with certified trainer',
      cost: 1000,
      category: 'Training',
      available: true
    },
    {
      id: '4',
      title: 'Fitness Equipment Discount',
      description: '20% off on partner fitness equipment stores',
      cost: 750,
      category: 'Equipment',
      available: false
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            <Coins className="w-3 h-3 mr-1" />
            Rewards System
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Flex Coin System</h2>
          <p className="text-xl text-white/60">Earn coins by completing workouts and achieving goals</p>
        </motion.div>

        {/* Coin Balance */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="inline-block p-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg border-yellow-500/30">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Coins className="w-16 h-16 text-yellow-400" />
              </motion.div>
              <div>
                <p className="text-yellow-400 text-sm uppercase tracking-wider">Total Balance</p>
                <p className="text-5xl font-bold text-yellow-400">1,247</p>
              </div>
            </div>
            <p className="text-white/60">+25 coins earned today</p>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10">
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-bold text-white">Achievements</h3>
              </div>

              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.completed 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-white/5 border-white/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-white font-medium">{achievement.title}</h4>
                          {achievement.completed && (
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                              <Star className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-white/60 text-sm mb-2">{achievement.description}</p>
                        
                        {achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white/60">Progress</span>
                              <span className="text-white">{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-4">
                        <Coins className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">{achievement.reward}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Rewards Store */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10">
              <div className="flex items-center space-x-2 mb-6">
                <Gift className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Rewards Store</h3>
              </div>

              <div className="space-y-4">
                {rewards.map((reward) => (
                  <motion.div
                    key={reward.id}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-white font-medium">{reward.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {reward.category}
                          </Badge>
                        </div>
                        <p className="text-white/60 text-sm mb-3">{reward.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Coins className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-medium">{reward.cost}</span>
                          </div>
                          
                          <Button 
                            size="sm" 
                            disabled={!reward.available || reward.cost > 1247}
                            className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-purple-500/30"
                          >
                            {reward.available ? 'Redeem' : 'Coming Soon'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Zap className="w-4 h-4 mr-2" />
                View All Rewards
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}