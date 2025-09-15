import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Brain, Clock, Target, Users, Sparkles, Play } from 'lucide-react';

interface WorkoutSplit {
  id: string;
  name: string;
  days: number;
  focus: string;
  difficulty: string;
  exercises: { name: string; sets: string; reps: string }[];
}

export function AiSplitGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSplit, setGeneratedSplit] = useState<WorkoutSplit | null>(null);
  const [formData, setFormData] = useState({
    experience: '',
    goals: '',
    daysPerWeek: '',
    timePerSession: ''
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock generated split
    const mockSplit: WorkoutSplit = {
      id: '1',
      name: 'AI-Generated Push/Pull/Legs',
      days: 6,
      focus: 'Muscle Building',
      difficulty: 'Intermediate',
      exercises: [
        { name: 'Bench Press', sets: '4', reps: '8-10' },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '10-12' },
        { name: 'Shoulder Press', sets: '3', reps: '10-12' },
        { name: 'Tricep Dips', sets: '3', reps: '12-15' },
        { name: 'Lateral Raises', sets: '4', reps: '12-15' }
      ]
    };
    
    setGeneratedSplit(mockSplit);
    setIsGenerating(false);
  };

  return (
    <section id="ai-split" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Brain className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Workout Split Generator</h2>
          <p className="text-xl text-white/60">Get personalized workout plans powered by AI</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Tell us about your goals</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-white/80">Experience Level</Label>
                  <Select value={formData.experience} onValueChange={(value: string) => setFormData(prev => ({...prev, experience: value}))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select your experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white/80">Primary Goal</Label>
                  <Select value={formData.goals} onValueChange={(value: string) => setFormData(prev => ({...prev, goals: value}))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="What's your main goal?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muscle">Build Muscle</SelectItem>
                      <SelectItem value="strength">Increase Strength</SelectItem>
                      <SelectItem value="endurance">Improve Endurance</SelectItem>
                      <SelectItem value="weight-loss">Lose Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white/80">Days per Week</Label>
                  <Select value={formData.daysPerWeek} onValueChange={(value: string) => setFormData(prev => ({...prev, daysPerWeek: value}))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="How often can you train?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="4">4 days</SelectItem>
                      <SelectItem value="5">5 days</SelectItem>
                      <SelectItem value="6">6 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white/80">Time per Session</Label>
                  <Select value={formData.timePerSession} onValueChange={(value : string) => setFormData(prev => ({...prev, timePerSession: value}))}>
                    <SelectTrigger className="bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="How long per workout?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !formData.experience || !formData.goals}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating Your Split...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generate AI Split
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Generated Split */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {generatedSplit ? (
              <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{generatedSplit.name}</h3>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Generated
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-white/60 text-sm">Duration</p>
                    <p className="text-white font-medium">{generatedSplit.days} days</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <Target className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <p className="text-white/60 text-sm">Focus</p>
                    <p className="text-white font-medium">{generatedSplit.focus}</p>
                  </div>
                </div>

                <h4 className="text-white font-medium mb-3">Today's Workout (Push)</h4>
                <div className="space-y-2 mb-6">
                  {generatedSplit.exercises.map((exercise, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded">
                      <span className="text-white">{exercise.name}</span>
                      <span className="text-white/60 text-sm">{exercise.sets} × {exercise.reps}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Play className="w-4 h-4 mr-2" />
                  Start Workout
                </Button>
              </Card>
            ) : (
              <Card className="p-6 bg-black/40 backdrop-blur-lg border-white/10 flex items-center justify-center h-full">
                <div className="text-center">
                  <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
                  <p className="text-white/60">Fill out the form to generate your personalized workout split</p>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}