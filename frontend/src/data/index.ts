// Central data access point for Supabase database
// This file provides data access using Supabase as the backend

import { SupabaseDataManager, SupabaseExercise, SupabaseNutrition, SupabaseBodyComposition } from '../utils/supabaseClient';
import { DatasetProcessor, ProcessedExercise, ProcessedFood, BodyCompositionData } from './processor';

// Import processed datasets as fallback (when Supabase is not available)
import exerciseData from './exercises/exercise-database-enhanced.json';
import nutritionData from './nutrition/indian-food-database.json';
import bodyCompositionData from './body-composition/body-performance-enhanced.json';

export class DataManager {
  private static exerciseCache: ProcessedExercise[] | null = null;
  private static nutritionCache: ProcessedFood[] | null = null;
  private static bodyCompositionCache: BodyCompositionData[] | null = null;
  private static useSupabase: boolean = true; // Set to false to use local JSON files

  // Get processed exercise data (from Supabase or local fallback)
  static async getExercises(): Promise<ProcessedExercise[]> {
    if (this.useSupabase) {
      try {
        const supabaseData = await SupabaseDataManager.getExercises();
        return supabaseData.map(ex => ({
          name: ex.name,
          bodyPart: ex.body_part,
          equipment: ex.equipment,
          target: ex.target,
          instructions: ex.instructions || [],
          difficulty: ex.difficulty as 'Easy' | 'Medium' | 'Hard',
          muscleGroups: ex.muscle_groups || [],
          gifUrl: ex.gif_url
        }));
      } catch (error) {
        console.warn('Supabase unavailable, using local data:', error);
      }
    }
    
    // Fallback to local JSON
    if (!this.exerciseCache) {
      this.exerciseCache = DatasetProcessor.processExerciseData(exerciseData);
    }
    return this.exerciseCache;
  }

  // Get processed nutrition data (from Supabase or local fallback)
  static async getNutritionData(): Promise<ProcessedFood[]> {
    if (this.useSupabase) {
      try {
        const supabaseData = await SupabaseDataManager.getNutritionData();
        return supabaseData.map(n => ({
          name: n.name,
          calories: n.calories,
          protein: n.protein,
          carbs: n.carbs,
          fats: n.fats,
          fiber: n.fiber,
          sugar: n.sugar,
          amount: n.amount
        }));
      } catch (error) {
        console.warn('Supabase unavailable, using local data:', error);
      }
    }
    
    // Fallback to local JSON
    if (!this.nutritionCache) {
      this.nutritionCache = DatasetProcessor.processNutritionData(nutritionData);
    }
    return this.nutritionCache;
  }

  // Get body composition data for model training (from Supabase or local fallback)
  static async getBodyCompositionData(): Promise<BodyCompositionData[]> {
    if (this.useSupabase) {
      try {
        const supabaseData = await SupabaseDataManager.getBodyCompositionData();
        return supabaseData.map(b => ({
          age: b.age,
          gender: b.gender,
          height: b.height,
          weight: b.weight,
          bodyFat: b.body_fat,
          bmi: b.bmi,
          performanceClass: b.performance_class
        }));
      } catch (error) {
        console.warn('Supabase unavailable, using local data:', error);
      }
    }
    
    // Fallback to local JSON
    if (!this.bodyCompositionCache) {
      this.bodyCompositionCache = DatasetProcessor.processBodyCompositionData(bodyCompositionData);
    }
    return this.bodyCompositionCache;
  }

  // Search exercises by criteria
  static async findExercises(criteria: {
    bodyPart?: string;
    equipment?: string;
    difficulty?: string;
    muscleGroup?: string;
  }): Promise<ProcessedExercise[]> {
    const exercises = await this.getExercises();

    return exercises.filter(exercise => {
      if (criteria.bodyPart && exercise.bodyPart !== criteria.bodyPart) return false;
      if (criteria.equipment && exercise.equipment !== criteria.equipment) return false;
      if (criteria.difficulty && exercise.difficulty !== criteria.difficulty) return false;
      if (criteria.muscleGroup && !exercise.muscleGroups.includes(criteria.muscleGroup)) return false;
      return true;
    });
  }

  // Search nutrition data
  static async findFoods(searchTerm: string): Promise<ProcessedFood[]> {
    if (this.useSupabase) {
      try {
        const supabaseData = await SupabaseDataManager.searchNutrition(searchTerm);
        return supabaseData.map(n => ({
          name: n.name,
          calories: n.calories,
          protein: n.protein,
          carbs: n.carbs,
          fats: n.fats,
          fiber: n.fiber,
          sugar: n.sugar,
          amount: n.amount
        }));
      } catch (error) {
        console.warn('Supabase unavailable, using local data:', error);
      }
    }
    
    const foods = await this.getNutritionData();
    const term = searchTerm.toLowerCase();

    return foods.filter(food =>
      food.name.toLowerCase().includes(term)
    );
  }

  // Get nutritional information for meal planning
  static calculateMealNutrition(foods: Array<{ food: ProcessedFood; amount: number }>) {
    return foods.reduce((total, item) => {
      const multiplier = item.amount / 100; // Assuming amounts are per 100g
      return {
        calories: total.calories + (item.food.calories * multiplier),
        protein: total.protein + (item.food.protein * multiplier),
        carbs: total.carbs + (item.food.carbs * multiplier),
        fats: total.fats + (item.food.fats * multiplier)
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }

  // Check Supabase connection
  static async checkSupabaseConnection(): Promise<boolean> {
    return await SupabaseDataManager.checkConnection();
  }

  // Enable/disable Supabase
  static setUseSupabase(useSupabase: boolean): void {
    this.useSupabase = useSupabase;
  }
}

// Export types for use in other modules
export type { ProcessedExercise, ProcessedFood, BodyCompositionData };
