import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Smartphone, Activity, Heart, MapPin, CheckCircle, RefreshCw } from 'lucide-react';

export function GoogleFitIntegration() {
  const fitData = {
    steps: 8425,
    stepGoal: 10000,
    calories: 2340,
    calorieGoal: 2500,
    activeMinutes: 45,
    activeGoal: 60,
    heartRate: 72,
    lastSync: '2 minutes ago'
  };

  const recentActivities = [
    { type: 'Running', duration: '25 min', calories: 340, time: '2 hours ago' },
    { type: 'Strength Training', duration: '45 min', calories: 180, time: '5 hours ago' },
    { type: 'Walking', duration: '30 min', calories: 120, time: '1 day ago' }
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
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
            <Smartphone className="w-3 h-3 mr-1" />
            Connected Device
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Google Fit Integration</h2>
          <p className="text-xl text-white/60">Seamlessly sync your fitness data across all devices</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sync Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Sync Status</h3>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white">Google Fit</p>
                    <p className="text-white/60 text-sm">Last sync: {fitData.lastSync}</p>
                  </div>
                </div>
                
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Daily Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10">
              <h3 className="text-white font-medium mb-4">Today's Goals</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Steps</span>
                    <span className="text-white">{fitData.steps.toLocaleString()} / {fitData.stepGoal.toLocaleString()}</span>
                  </div>
                  <Progress value={(fitData.steps / fitData.stepGoal) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Calories</span>
                    <span className="text-white">{fitData.calories} / {fitData.calorieGoal}</span>
                  </div>
                  <Progress value={(fitData.calories / fitData.calorieGoal) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white/80">Active Minutes</span>
                    <span className="text-white">{fitData.activeMinutes} / {fitData.activeGoal}</span>
                  </div>
                  <Progress value={(fitData.activeMinutes / fitData.activeGoal) * 100} className="h-2" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Health Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10">
              <h3 className="text-white font-medium mb-4">Health Metrics</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-red-400" />
                    <span className="text-white/80">Heart Rate</span>
                  </div>
                  <span className="text-white font-medium">{fitData.heartRate} BPM</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <span className="text-white/80">Active Zone</span>
                  </div>
                  <span className="text-green-400 font-medium">Normal</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-white/80">Location</span>
                  </div>
                  <span className="text-white font-medium">Gym</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10">
            <h3 className="text-white font-medium mb-4">Recent Activities</h3>
            
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{activity.type}</p>
                      <p className="text-white/60 text-sm">{activity.time}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white">{activity.duration}</p>
                    <p className="text-white/60 text-sm">{activity.calories} cal</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}