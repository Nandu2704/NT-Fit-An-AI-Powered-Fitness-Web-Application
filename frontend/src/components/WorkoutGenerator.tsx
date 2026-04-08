// Enhanced workout generation with multiple sessions and improved variety

import { UserProfile, WorkoutSession, Exercise } from '../types';
import { DataManager, ProcessedExercise } from '../data';

class WorkoutGenerator {
  static exerciseDatabase = {
    cutting: {
      strength: [
        {
          name: 'High-Intensity Burpees',
          sets: 4,
          reps: '12-15',
          rest: '30s',
          muscleGroups: ['Full Body', 'Cardio'],
          difficulty: 'Hard' as const,
          equipment: ['None'],
          instructions: [
            'Start in standing position',
            'Drop into squat, place hands on floor',
            'Jump back into plank position',
            'Do a push-up, jump feet back to squat',
            'Jump up with arms overhead'
          ]
        },
        {
          name: 'Kettlebell Swings',
          sets: 4,
          reps: '20-25',
          rest: '45s',
          muscleGroups: ['Glutes', 'Core', 'Shoulders'],
          difficulty: 'Medium' as const,
          equipment: ['Kettlebell'],
          instructions: [
            'Stand with feet shoulder-width apart',
            'Hold kettlebell with both hands',
            'Hinge at hips, swing kettlebell up to chest level',
            'Let momentum carry the weight',
            'Control the descent'
          ]
        },
        {
          name: 'Battle Ropes',
          sets: 3,
          reps: '30s',
          rest: '60s',
          muscleGroups: ['Arms', 'Core', 'Cardio'],
          difficulty: 'Hard' as const,
          equipment: ['Battle Ropes'],
          instructions: [
            'Hold rope ends in each hand',
            'Stand with feet shoulder-width apart',
            'Create waves by moving arms up and down',
            'Maintain steady rhythm',
            'Keep core engaged'
          ]
        }
      ],
      cardio: [
        {
          name: 'Mountain Climbers',
          sets: 3,
          reps: '20 each leg',
          rest: '45s',
          muscleGroups: ['Core', 'Cardio'],
          difficulty: 'Medium' as const,
          equipment: ['None'],
          instructions: [
            'Start in plank position',
            'Bring right knee toward chest',
            'Quickly switch legs',
            'Maintain plank form throughout',
            'Keep core engaged'
          ]
        },
        {
          name: 'Jump Rope',
          sets: 4,
          reps: '60s',
          rest: '30s',
          muscleGroups: ['Calves', 'Cardio'],
          difficulty: 'Medium' as const,
          equipment: ['Jump Rope'],
          instructions: [
            'Hold rope handles lightly',
            'Jump on balls of feet',
            'Keep elbows close to body',
            'Maintain steady rhythm',
            'Land softly'
          ]
        }
      ],
      hiit: [
        {
          name: 'Tabata Squats',
          sets: 8,
          reps: '20s work, 10s rest',
          rest: '0s',
          muscleGroups: ['Legs', 'Glutes'],
          difficulty: 'Hard' as const,
          equipment: ['None'],
          instructions: [
            'Perform squats for 20 seconds',
            'Rest for 10 seconds',
            'Repeat for 8 rounds',
            'Maintain proper form',
            'Push through fatigue'
          ]
        }
      ]
    },
    bulking: {
      strength: [
        {
          name: 'Barbell Squats',
          sets: 4,
          reps: '6-8',
          rest: '3min',
          muscleGroups: ['Legs', 'Glutes', 'Core'],
          difficulty: 'Hard' as const,
          equipment: ['Barbell', 'Squat Rack'],
          instructions: [
            'Position barbell on upper back',
            'Stand with feet shoulder-width apart',
            'Lower into deep squat',
            'Drive through heels to stand',
            'Keep chest up and core tight'
          ]
        },
        {
          name: 'Deadlifts',
          sets: 4,
          reps: '5-6',
          rest: '3min',
          muscleGroups: ['Back', 'Glutes', 'Hamstrings'],
          difficulty: 'Hard' as const,
          equipment: ['Barbell'],
          instructions: [
            'Stand with feet hip-width apart',
            'Grip barbell with hands outside legs',
            'Keep back straight, lift by extending hips',
            'Stand tall, squeeze glutes',
            'Lower with control'
          ]
        },
        {
          name: 'Bench Press',
          sets: 4,
          reps: '8-10',
          rest: '2-3min',
          muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
          difficulty: 'Medium' as const,
          equipment: ['Barbell', 'Bench'],
          instructions: [
            'Lie on bench with feet flat on floor',
            'Grip barbell slightly wider than shoulders',
            'Lower bar to chest with control',
            'Press up explosively',
            'Keep core tight throughout'
          ]
        }
      ],
      hypertrophy: [
        {
          name: 'Dumbbell Rows',
          sets: 4,
          reps: '10-12',
          rest: '90s',
          muscleGroups: ['Back', 'Biceps'],
          difficulty: 'Medium' as const,
          equipment: ['Dumbbells', 'Bench'],
          instructions: [
            'Place one knee on bench',
            'Hold dumbbell in opposite hand',
            'Pull weight to hip',
            'Squeeze shoulder blade',
            'Lower with control'
          ]
        },
        {
          name: 'Overhead Press',
          sets: 4,
          reps: '8-10',
          rest: '2min',
          muscleGroups: ['Shoulders', 'Triceps', 'Core'],
          difficulty: 'Medium' as const,
          equipment: ['Dumbbells'],
          instructions: [
            'Stand with feet shoulder-width apart',
            'Hold dumbbells at shoulder height',
            'Press weights overhead',
            'Lower with control',
            'Keep core engaged'
          ]
        }
      ]
    },
    maintaining: {
      functional: [
        {
          name: 'Bodyweight Squats',
          sets: 3,
          reps: '15-20',
          rest: '60s',
          muscleGroups: ['Legs', 'Glutes'],
          difficulty: 'Easy' as const,
          equipment: ['None'],
          instructions: [
            'Stand with feet hip-width apart',
            'Lower into squat position',
            'Keep knees behind toes',
            'Stand back up',
            'Engage glutes at top'
          ]
        },
        {
          name: 'Push-ups',
          sets: 3,
          reps: '10-15',
          rest: '60s',
          muscleGroups: ['Chest', 'Arms', 'Core'],
          difficulty: 'Medium' as const,
          equipment: ['None'],
          instructions: [
            'Start in plank position',
            'Lower chest to ground',
            'Push back up',
            'Keep body in straight line',
            'Breathe steadily'
          ]
        }
      ],
      flexibility: [
        {
          name: 'Yoga Flow',
          sets: 1,
          reps: '10min',
          rest: '0s',
          muscleGroups: ['Full Body'],
          difficulty: 'Easy' as const,
          equipment: ['Yoga Mat'],
          instructions: [
            'Flow through sun salutation sequence',
            'Hold each pose for 30 seconds',
            'Focus on breathing',
            'Maintain proper alignment',
            'Listen to your body'
          ]
        }
      ]
    }
  };

  static generateMultipleSessions(profile: UserProfile): WorkoutSession[] {
    const goal = profile.fitnessGoal;
    const experience = profile.experienceLevel;
    const sessions: WorkoutSession[] = [];

    // Generate different types of workout sessions
    if (goal === 'cutting') {
      sessions.push(
        this.createSession('HIIT Fat Burner', 'High-intensity interval training for maximum fat burn', '30-40 min', 'HIIT', this.exerciseDatabase.cutting.hiit, experience),
        this.createSession('Cardio Strength Circuit', 'Combine cardio and strength for lean muscle', '45-55 min', 'Strength', this.exerciseDatabase.cutting.strength, experience),
        this.createSession('Metabolic Boost', 'High-energy workout to boost metabolism', '35-45 min', 'Cardio', this.exerciseDatabase.cutting.cardio, experience)
      );
    } else if (goal === 'bulking') {
      sessions.push(
        this.createSession('Heavy Compound Lifts', 'Focus on major muscle groups with heavy weights', '60-75 min', 'Strength', this.exerciseDatabase.bulking.strength, experience),
        this.createSession('Hypertrophy Training', 'Muscle building with moderate weights and higher volume', '50-65 min', 'Strength', this.exerciseDatabase.bulking.hypertrophy, experience),
        this.createSession('Power Building', 'Combine strength and power movements', '55-70 min', 'Strength', [...this.exerciseDatabase.bulking.strength, ...this.exerciseDatabase.bulking.hypertrophy], experience)
      );
    } else {
      sessions.push(
        this.createSession('Functional Fitness', 'Improve everyday movement patterns', '40-50 min', 'Full Body', this.exerciseDatabase.maintaining.functional, experience),
        this.createSession('Flexibility & Mobility', 'Enhance range of motion and recovery', '30-40 min', 'Flexibility', this.exerciseDatabase.maintaining.flexibility, experience),
        this.createSession('Balanced Strength', 'Well-rounded strength training', '45-55 min', 'Strength', this.exerciseDatabase.maintaining.functional, experience)
      );
    }

    return sessions;
  }

  // Enhanced method using Kaggle datasets
  static generateMultipleSessionsFromDatasets(profile: UserProfile): WorkoutSession[] {
    const allExercises = DataManager.getExercises();

    // Filter exercises based on user profile
    const suitableExercises = allExercises.filter(exercise => {
      // Match experience level
      const difficultyMatch = this.matchDifficultyToExperience(exercise.difficulty, profile.experienceLevel);
      return difficultyMatch;
    });

    // Group exercises by body part
    const exercisesByBodyPart = this.groupExercisesByBodyPart(suitableExercises);

    const sessions: WorkoutSession[] = [];

    // Create sessions based on fitness goal
    if (profile.fitnessGoal === 'cutting') {
      sessions.push(
        this.createSessionFromDataset('HIIT Cardio', 'High-intensity cardio for fat burning', '30-40 min', 'HIIT',
          [...exercisesByBodyPart.legs, ...exercisesByBodyPart.core].slice(0, 6), profile.experienceLevel),
        this.createSessionFromDataset('Strength Training', 'Build muscle while burning fat', '45-55 min', 'Strength',
          [...exercisesByBodyPart.chest, ...exercisesByBodyPart.back, ...exercisesByBodyPart.arms].slice(0, 8), profile.experienceLevel)
      );
    } else if (profile.fitnessGoal === 'bulking') {
      sessions.push(
        this.createSessionFromDataset('Heavy Lifting', 'Focus on compound movements', '50-60 min', 'Strength',
          [...exercisesByBodyPart.chest, ...exercisesByBodyPart.back, ...exercisesByBodyPart.legs].slice(0, 6), profile.experienceLevel),
        this.createSessionFromDataset('Muscle Building', 'Isolation exercises for growth', '40-50 min', 'Strength',
          [...exercisesByBodyPart.arms, ...exercisesByBodyPart.shoulders].slice(0, 8), profile.experienceLevel)
      );
    } else {
      sessions.push(
        this.createSessionFromDataset('Functional Fitness', 'Improve everyday movement patterns', '40-50 min', 'Full Body',
          [...exercisesByBodyPart.chest, ...exercisesByBodyPart.legs, ...exercisesByBodyPart.core].slice(0, 8), profile.experienceLevel),
        this.createSessionFromDataset('Flexibility & Mobility', 'Enhance range of motion and recovery', '30-40 min', 'Flexibility',
          exercisesByBodyPart.core.slice(0, 6), profile.experienceLevel),
        this.createSessionFromDataset('Balanced Strength', 'Well-rounded strength training', '45-55 min', 'Strength',
          [...exercisesByBodyPart.back, ...exercisesByBodyPart.arms].slice(0, 7), profile.experienceLevel)
      );
    }

    return sessions;
  }

  private static matchDifficultyToExperience(difficulty: string, experience: string): boolean {
    const difficultyMap = {
      'beginner': ['Easy'],
      'intermediate': ['Easy', 'Medium'],
      'advanced': ['Easy', 'Medium', 'Hard']
    };
    return difficultyMap[experience as keyof typeof difficultyMap]?.includes(difficulty) || false;
  }

  private static groupExercisesByBodyPart(exercises: ProcessedExercise[]): Record<string, ProcessedExercise[]> {
    return exercises.reduce((groups, exercise) => {
      const bodyPart = exercise.bodyPart.toLowerCase();
      if (!groups[bodyPart]) groups[bodyPart] = [];
      groups[bodyPart].push(exercise);
      return groups;
    }, {} as Record<string, ProcessedExercise[]>);
  }

  private static createSessionFromDataset(name: string, description: string, duration: string, type: WorkoutSession['sessionType'], exercises: ProcessedExercise[], experience: string): WorkoutSession {
    // Convert ProcessedExercise to Exercise format
    const convertedExercises: Exercise[] = exercises.map(ex => ({
      name: ex.name,
      sets: this.adjustSets(3, experience), // Default 3 sets
      reps: this.adjustReps('10-12', experience),
      rest: '60s',
      muscleGroups: ex.muscleGroups,
      instructions: ex.instructions,
      difficulty: ex.difficulty,
      equipment: [ex.equipment]
    }));

    return {
      name,
      description,
      duration,
      difficulty: experience as 'Beginner' | 'Intermediate' | 'Advanced',
      exercises: convertedExercises,
      focusAreas: WorkoutGenerator.extractFocusAreas(convertedExercises),
      sessionType: type
    };
  }

  static createSession(name: string, description: string, duration: string, type: WorkoutSession['sessionType'], exercises: Exercise[], experience: string): WorkoutSession {
    const adjustedExercises = exercises.map(exercise => ({
      ...exercise,
      sets: this.adjustSets(exercise.sets, experience),
      reps: this.adjustReps(exercise.reps, experience)
    }));

    return {
      name,
      description,
      duration,
      difficulty: this.getDifficultyLevel(experience),
      exercises: adjustedExercises,
      focusAreas: WorkoutGenerator.extractFocusAreas(exercises),
      sessionType: type
    };
  }

  static adjustSets(baseSets: number, experience: string): number {
    const multipliers = { beginner: 0.8, intermediate: 1.0, advanced: 1.2 };
    return Math.round(baseSets * multipliers[experience as keyof typeof multipliers]);
  }

  static adjustReps(baseReps: string, experience: string): string {
    if (experience === 'beginner') {
      return baseReps.includes('-') ? 
        baseReps.split('-').map(n => String(Math.max(1, parseInt(n) - 2))).join('-') : 
        String(Math.max(1, parseInt(baseReps) - 2));
    }
    return baseReps;
  }

  static extractFocusAreas(exercises: Exercise[]): string[] {
    const areas = new Set<string>();
    exercises.forEach(exercise => {
      exercise.muscleGroups.forEach(group => areas.add(group));
    });
    return Array.from(areas);
  }

  static getDifficultyLevel(experience: string): 'Beginner' | 'Intermediate' | 'Advanced' {
    return experience.charAt(0).toUpperCase() + experience.slice(1) as 'Beginner' | 'Intermediate' | 'Advanced';
  }

  // Legacy method for backward compatibility
  static generatePlans(profile: UserProfile): WorkoutSession[] {
    return this.generateMultipleSessions(profile);
  }
}

export default WorkoutGenerator;