// Data processing utilities for Kaggle datasets integration
// Handles loading, processing, and validation of external datasets

interface RawExerciseData {
  name?: string;
  exercise_name?: string;
  bodyPart?: string;
  body_part?: string;
  equipment?: string;
  target?: string;
  primary_muscle?: string;
  instructions?: string | string[];
  difficulty?: string;
  level?: string;
  gifUrl?: string;
  gif_url?: string;
}

interface RawNutritionData {
  food?: string;
  name?: string;
  calories?: string | number;
  protein?: string | number;
  protein_g?: string | number;
  carbs?: string | number;
  carbohydrates?: string | number;
  fats?: string | number;
  fat?: string | number;
  fiber?: string | number;
  sugar?: string | number;
  amount?: string;
}

interface RawBodyCompositionData {
  age?: string | number;
  gender?: string;
  height_cm?: string | number;
  height?: string | number;
  weight_kg?: string | number;
  weight?: string | number;
  body_fat?: string | number;
  body_fat_percentage?: string | number;
  bmi?: string | number;
  class?: string;
  performance_level?: string;
}

export interface ProcessedExercise {
  name: string;
  bodyPart: string;
  equipment: string;
  target: string;
  instructions: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  muscleGroups: string[];
  gifUrl?: string;
}

export interface ProcessedFood {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber?: number;
  sugar?: number;
  amount: string;
}

export interface BodyCompositionData {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bodyFat: number;
  bmi: number;
  performanceClass: string;
}

export class DatasetProcessor {
  // Process exercise datasets from Kaggle
  static processExerciseData(rawData: RawExerciseData[]): ProcessedExercise[] {
    return rawData
      .filter(item => item.name || item.exercise_name)
      .map(item => ({
        name: item.name || item.exercise_name || 'Unknown Exercise',
        bodyPart: item.bodyPart || item.body_part || 'unknown',
        equipment: item.equipment || 'bodyweight',
        target: item.target || item.primary_muscle || 'unknown',
        instructions: this.parseInstructions(item.instructions || []),
        difficulty: this.calculateDifficulty(item),
        muscleGroups: this.extractMuscleGroups(item.target || item.primary_muscle || ''),
        gifUrl: item.gifUrl || item.gif_url
      }));
  }

  // Process nutrition datasets from Kaggle
  static processNutritionData(rawData: RawNutritionData[]): ProcessedFood[] {
    return rawData
      .filter(item => item.food || item.name)
      .map(item => ({
        name: item.food || item.name || 'Unknown Food',
        calories: Number(item.calories) || 0,
        protein: Number(item.protein || item.protein_g) || 0,
        carbs: Number(item.carbs || item.carbohydrates) || 0,
        fats: Number(item.fats || item.fat) || 0,
        fiber: Number(item.fiber) || undefined,
        sugar: Number(item.sugar) || undefined,
        amount: item.amount || '100g'
      }));
  }

  // Process body composition datasets
  static processBodyCompositionData(rawData: RawBodyCompositionData[]): BodyCompositionData[] {
    return rawData
      .filter(item => item.gender)
      .map(item => ({
        age: Number(item.age),
        gender: item.gender || 'Unknown',
        height: Number(item.height_cm || item.height),
        weight: Number(item.weight_kg || item.weight),
        bodyFat: Number(item.body_fat || item.body_fat_percentage),
        bmi: Number(item.bmi),
        performanceClass: item.class || item.performance_level || 'Unknown'
      }));
  }

  private static parseInstructions(instructions: string | string[]): string[] {
    if (Array.isArray(instructions)) return instructions;
    if (typeof instructions === 'string') {
      return instructions.split('.').filter(step => step.trim().length > 0);
    }
    return [];
  }

  private static calculateDifficulty(item: RawExerciseData): 'Easy' | 'Medium' | 'Hard' {
    // Logic to determine difficulty based on dataset features
    if (item.difficulty && ['Easy', 'Medium', 'Hard'].includes(item.difficulty)) {
      return item.difficulty as 'Easy' | 'Medium' | 'Hard';
    }
    if (item.level && ['Easy', 'Medium', 'Hard'].includes(item.level)) {
      return item.level as 'Easy' | 'Medium' | 'Hard';
    }

    // Fallback logic based on equipment and target
    const equipment = item.equipment || 'bodyweight';
    const hasEquipment = equipment !== 'bodyweight' && equipment !== 'none';

    return hasEquipment ? 'Medium' : 'Easy';
  }

  private static extractMuscleGroups(target: string): string[] {
    if (!target) return [];

    // Map common target names to muscle groups
    const muscleMap: { [key: string]: string[] } = {
      'chest': ['chest', 'pectorals'],
      'back': ['back', 'lats', 'traps'],
      'shoulders': ['shoulders', 'deltoids'],
      'arms': ['biceps', 'triceps'],
      'legs': ['quadriceps', 'hamstrings', 'calves'],
      'core': ['abs', 'obliques'],
      'glutes': ['glutes']
    };

    return muscleMap[target.toLowerCase()] || [target];
  }
}