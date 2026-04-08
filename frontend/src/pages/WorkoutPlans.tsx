import React, { useEffect, useState } from 'react';
import { Dumbbell, Clock, Target, Play, Star, Edit3, Save } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import WorkoutGenerator from '../components/WorkoutGenerator';
import WorkoutPlayer from '../components/WorkoutPlayer';
import { WorkoutSession, WeeklySchedule, Exercise } from '../types';

const WorkoutPlans: React.FC = () => {
  const { profile, workoutPlans, setWorkoutPlans } = useUser();
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule[]>([]);
  const [availableSessions, setAvailableSessions] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    if (profile && workoutPlans.length === 0) {
      const generatedSessions = WorkoutGenerator.generateMultipleSessions(profile);
      setWorkoutPlans(generatedSessions);
      setAvailableSessions(generatedSessions);
      
      // Initialize weekly schedule
      const initialSchedule = generatedSessions.slice(0, 7).map((session, index) => ({
        day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index],
        session: index < 5 ? session : null, // Rest days on weekend
        isRestDay: index >= 5
      }));
      setWeeklySchedule(initialSchedule);
    }
  }, [profile, workoutPlans, setWorkoutPlans]);

  const handleScheduleEdit = (dayIndex: number, sessionId: string) => {
    const newSchedule = [...weeklySchedule];
    if (sessionId === 'rest') {
      newSchedule[dayIndex] = { ...newSchedule[dayIndex], session: null, isRestDay: true };
    } else {
      const session = availableSessions.find(s => s.name === sessionId);
      newSchedule[dayIndex] = { ...newSchedule[dayIndex], session, isRestDay: false };
    }
    setWeeklySchedule(newSchedule);
  };

  const saveSchedule = () => {
    setIsEditingSchedule(false);
    // Here you could save to localStorage or backend
  };

  const motivationalQuotes = [
    { day: 'Monday', quote: 'New week, new goals! Start strong and set the tone.', author: 'Fitness Mindset' },
    { day: 'Tuesday', quote: 'Progress is impossible without change, and those who cannot change their minds cannot change anything.', author: 'George Bernard Shaw' },
    { day: 'Wednesday', quote: 'The middle of the week is where champions are made. Push through!', author: 'NTFit Motivation' },
    { day: 'Thursday', quote: 'Your body can stand almost anything. It\'s your mind that you have to convince.', author: 'Fitness Philosophy' },
    { day: 'Friday', quote: 'Finish the week like the champion you are. Every rep counts!', author: 'Weekend Warrior' },
    { day: 'Saturday', quote: 'Weekend workouts are where dedication meets determination.', author: 'Saturday Strength' },
    { day: 'Sunday', quote: 'Rest is not idleness, and to lie sometimes on the grass under trees on a summer\'s day is not a waste of time.', author: 'Recovery Wisdom' }
  ];

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <Target className="w-16 h-16 mx-auto mb-6 text-orange-500" />
        <h1 className="text-3xl font-bold mb-4">Profile Required</h1>
        <p className="text-gray-600 mb-8">Complete your profile and body analysis to get personalized workout plans.</p>
      </div>
    );
  }

  if (isPlaying && selectedWorkout) {
    return <WorkoutPlayer workout={selectedWorkout} onClose={() => setIsPlaying(false)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">AI-Generated Workout Sessions</h1>
        <p className="text-gray-600 text-lg">
          Multiple specialized workout sessions designed for your {profile.fitnessGoal} goals
        </p>
      </div>

      {/* Available Workout Sessions */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {workoutPlans.map((session, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className={`h-2 ${
              session.sessionType === 'Strength' ? 'bg-red-500' :
              session.sessionType === 'Cardio' ? 'bg-orange-500' :
              session.sessionType === 'HIIT' ? 'bg-purple-500' :
              session.sessionType === 'Flexibility' ? 'bg-green-500' : 'bg-blue-500'
            }`}></div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{session.name}</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm text-gray-600">4.{8 + index}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{session.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <div className="text-sm font-medium text-blue-700">{session.duration}</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Target className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <div className="text-sm font-medium text-green-700">{session.difficulty}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">Session Type:</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session.sessionType === 'Strength' ? 'bg-red-100 text-red-700' :
                    session.sessionType === 'Cardio' ? 'bg-orange-100 text-orange-700' :
                    session.sessionType === 'HIIT' ? 'bg-purple-100 text-purple-700' :
                    session.sessionType === 'Flexibility' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {session.sessionType}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {session.exercises.slice(0, 3).map((exercise: Exercise, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{exercise.name}</span>
                      <span className="text-gray-500">{exercise.sets}x{exercise.reps}</span>
                    </div>
                  ))}
                  {session.exercises.length > 3 && (
                    <div className="text-sm text-gray-500">+{session.exercises.length - 3} more exercises</div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedWorkout(session);
                  setIsPlaying(true);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Session
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editable Weekly Schedule */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Dumbbell className="w-6 h-6 mr-2 text-blue-600" />
            Weekly Schedule
          </h2>
          <button
            onClick={() => setIsEditingSchedule(!isEditingSchedule)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center"
          >
            {isEditingSchedule ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
            {isEditingSchedule ? 'Save Schedule' : 'Edit Schedule'}
          </button>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {weeklySchedule.map((dayPlan, index) => (
            <div key={index} className="text-center">
              <div className="font-semibold text-gray-700 mb-3">{dayPlan.day.slice(0, 3)}</div>
              <div className={`p-4 rounded-lg border-2 min-h-[120px] ${
                dayPlan.isRestDay 
                  ? 'border-gray-200 bg-gray-50' 
                  : 'border-blue-200 bg-blue-50'
              }`}>
                {isEditingSchedule ? (
                  <select
                    value={dayPlan.isRestDay ? 'rest' : dayPlan.session?.name || 'rest'}
                    onChange={(e) => handleScheduleEdit(index, e.target.value)}
                    className="w-full text-xs p-2 border rounded"
                  >
                    <option value="rest">Rest Day</option>
                    {availableSessions.map((session, sessionIndex) => (
                      <option key={sessionIndex} value={session.name}>
                        {session.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  dayPlan.isRestDay ? (
                    <div className="text-sm text-gray-400">Rest Day</div>
                  ) : (
                    <div>
                      <div className="text-sm font-medium text-blue-700 mb-1">
                        {dayPlan.session?.name.split(' ').slice(0, 2).join(' ')}
                      </div>
                      <div className="text-xs text-blue-600 mb-2">
                        {dayPlan.session?.duration}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        dayPlan.session?.sessionType === 'Strength' ? 'bg-red-100 text-red-600' :
                        dayPlan.session?.sessionType === 'Cardio' ? 'bg-orange-100 text-orange-600' :
                        dayPlan.session?.sessionType === 'HIIT' ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {dayPlan.session?.sessionType}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditingSchedule && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={saveSchedule}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Daily Motivation */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Star className="w-6 h-6 mr-2" />
          Daily Motivation & Wisdom
        </h2>
        <div className="grid md:grid-cols-7 gap-4">
          {motivationalQuotes.map((motivation, index) => (
            <div key={index} className="text-center p-4 bg-white bg-opacity-20 rounded-xl">
              <div className="font-bold text-lg mb-2">{motivation.day.slice(0, 3)}</div>
              <div className="text-sm opacity-90 italic mb-2">"{motivation.quote}"</div>
              <div className="text-xs opacity-75">- {motivation.author}</div>
            </div>
          ))}
        </div>
        
        {/* Today's Special Quote */}
        <div className="mt-8 text-center p-6 bg-white bg-opacity-20 rounded-xl">
          <h3 className="text-xl font-bold mb-3">Today's Inspiration</h3>
          <div className="text-lg italic mb-2">
            "{motivationalQuotes[new Date().getDay()].quote}"
          </div>
          <div className="text-sm opacity-80">
            - {motivationalQuotes[new Date().getDay()].author}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlans;