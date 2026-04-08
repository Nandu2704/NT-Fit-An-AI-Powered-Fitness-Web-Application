import React, { useState, useEffect } from 'react';
import { X, Play, Pause, SkipForward, SkipBack, Timer, CheckCircle } from 'lucide-react';
import { WorkoutSession, Exercise } from '../types';

interface WorkoutPlayerProps {
  workout: WorkoutSession;
  onClose: () => void;
}

const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ workout, onClose }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const currentExercise = workout.exercises[currentExerciseIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const handleTimerComplete = () => {
    if (isResting) {
      setIsResting(false);
      setIsPlaying(false);
    } else {
      // Move to next set or exercise
      if (currentSet < currentExercise.sets) {
        setCurrentSet(prev => prev + 1);
        startRestTimer();
      } else {
        completeExercise();
      }
    }
  };

  const startRestTimer = () => {
    const restTime = parseInt(currentExercise.rest.replace('s', '').replace('min', '')) * (currentExercise.rest.includes('min') ? 60 : 1);
    setTimeRemaining(restTime);
    setIsResting(true);
    setIsPlaying(true);
  };

  const completeExercise = () => {
    setCompletedExercises(prev => [...prev, currentExerciseIndex]);
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setCurrentSet(1);
      setIsResting(false);
      setIsPlaying(false);
    }
  };

  const skipExercise = () => {
    completeExercise();
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
      setCurrentSet(1);
      setIsResting(false);
      setIsPlaying(false);
      setTimeRemaining(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">{workout.name}</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="p-6 bg-gray-50">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentExerciseIndex + 1} of {workout.exercises.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentExerciseIndex + (currentSet / currentExercise.sets)) / workout.exercises.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Exercise Display */}
          <div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white mb-6">
              <h2 className="text-2xl font-bold mb-2">{currentExercise.name}</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold">{currentSet}</div>
                  <div className="text-sm opacity-80">of {currentExercise.sets} sets</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{currentExercise.reps}</div>
                  <div className="text-sm opacity-80">repetitions</div>
                </div>
              </div>
            </div>

            {/* Timer */}
            {(isResting || timeRemaining > 0) && (
              <div className="text-center p-6 bg-orange-50 rounded-2xl mb-6">
                <Timer className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-orange-700">
                  {isResting ? 'Rest Time' : 'Exercise Time'}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Instructions</h3>
              <ol className="space-y-2">
                {currentExercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Controls and Exercise List */}
          <div>
            {/* Controls */}
            <div className="bg-white border rounded-2xl p-6 mb-6">
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={previousExercise}
                  disabled={currentExerciseIndex === 0}
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
                >
                  <SkipBack className="w-6 h-6" />
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={skipExercise}
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors duration-200"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    const restTime = parseInt(currentExercise.rest.replace('s', '').replace('min', '')) * (currentExercise.rest.includes('min') ? 60 : 1);
                    setTimeRemaining(restTime);
                    setIsResting(true);
                    setIsPlaying(true);
                  }}
                  className="bg-orange-100 text-orange-700 py-2 px-4 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-200"
                >
                  Start Rest
                </button>
                <button
                  onClick={completeExercise}
                  className="bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200"
                >
                  Complete Set
                </button>
              </div>
            </div>

            {/* Exercise List */}
            <div className="bg-white border rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Workout Plan</h3>
              <div className="space-y-3">
                {workout.exercises.map((exercise: Exercise, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition-colors duration-200 ${
                      index === currentExerciseIndex
                        ? 'bg-blue-50 border-blue-200'
                        : completedExercises.includes(index)
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{exercise.name}</div>
                        <div className="text-sm text-gray-600">
                          {exercise.sets} sets × {exercise.reps} reps
                        </div>
                      </div>
                      {completedExercises.includes(index) && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlayer;