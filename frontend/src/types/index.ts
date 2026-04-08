// Type definitions for the NTFit application

export interface UserProfile {
  name: string;
  age: number;
  height: number;
  weight: number;
  fitnessGoal: 'cutting' | 'bulking' | 'maintaining';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  bodyAnalysis?: BodyAnalysis;
}

export interface BodyAnalysis {
  bodyFat: number;
  muscleMass: number;
  bmi: number;
  measurements: BodyMeasurements;
  postureScore: PostureScore;
  metabolicRate: number;
  bodyType: string;
  fitnessAge: number;
  symmetryScore: number;
  flexibilityScore: number;
  accuracyScore: number;
  recommendations: string[];
}

export interface BodyMeasurements {
  chest: number;
  waist: number;
  hips: number;
  arms: number;
  thighs: number;
  shoulders: number;
  neck: number;
  forearms: number;
}

export interface PostureScore {
  shoulderAlignment: number;
  spinalAlignment: number;
  hipBalance: number;
  neckPosition: number;
  overallScore: number;
  issues: string[];
  improvements: string[];
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  muscleGroups: string[];
  instructions: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  equipment: string[];
}

export interface WorkoutSession {
  name: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: Exercise[];
  focusAreas: string[];
  sessionType: 'Strength' | 'Cardio' | 'HIIT' | 'Flexibility' | 'Full Body';
}

export interface Food {
  name: string;
  amount: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Meal {
  name: string;
  time: string;
  foods: Food[];
  macros: MacroNutrients;
}

export interface MacroNutrients {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DayPlan {
  meals: Meal[];
  totalMacros: MacroNutrients;
  theme: string;
  specialFocus: string;
}

export interface DietPlan {
  dailyMacros: MacroNutrients;
  weeklyPlan: DayPlan[];
  insights: DietInsights;
  waterIntake: string;
  supplements: string[];
}

export interface DietInsights {
  tips: string[];
  timing: string;
  hydration: string;
  weeklyFocus: string;
}

export interface ProgressEntry {
  date: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
  measurements: {
    chest: number;
    waist: number;
    hips: number;
  };
  notes: string;
}

export interface WeeklySchedule {
  day: string;
  session: WorkoutSession | null;
  isRestDay: boolean;
}