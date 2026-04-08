import { createClient } from '@supabase/supabase-js';

// Supabase configuration - Using credentials from import_to_supabase.js
// Get these from your Supabase project dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qqxhyknrnvctizcjhedz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'qk5HjzhAbuYXZ2xg6Jug_X3Pbt-N5';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table names
export const TABLES = {
  EXERCISES: 'exercises',
  NUTRITION: 'nutrition',
  BODY_COMPOSITION: 'body_composition',
  USER_PROFILES: 'user_profiles',
  PROGRESS_ENTRIES: 'progress_entries',
  WORKOUT_PLANS: 'workout_plans',
  DIET_PLANS: 'diet_plans'
} as const;

// Type definitions for Supabase data
export interface SupabaseExercise {
  id: number;
  name: string;
  body_part: string;
  equipment: string;
  target: string;
  instructions: string[];
  difficulty: string;
  muscle_groups: string[];
  gif_url: string;
}

export interface SupabaseNutrition {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  sugar: number;
  amount: string;
}

export interface SupabaseBodyComposition {
  id: number;
  age: number;
  gender: string;
  height: number;
  weight: number;
  body_fat: number;
  bmi: number;
  performance_class: string;
}

export interface SupabaseUserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  fitness_goal: string;
  experience_level: string;
  body_analysis: any;
  created_at: string;
}

export interface SupabaseProgressEntry {
  id: number;
  user_id: string;
  date: string;
  weight: number;
  body_fat: number;
  muscle_mass: number;
  notes: string;
  created_at: string;
}

// Helper functions for data fetching
export class SupabaseDataManager {
  // Get all exercises
  static async getExercises(): Promise<SupabaseExercise[]> {
    const { data, error } = await supabase
      .from(TABLES.EXERCISES)
      .select('*');
    
    if (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }
    return data || [];
  }

  // Get exercises by body part
  static async getExercisesByBodyPart(bodyPart: string): Promise<SupabaseExercise[]> {
    const { data, error } = await supabase
      .from(TABLES.EXERCISES)
      .select('*')
      .eq('body_part', bodyPart);
    
    if (error) {
      console.error('Error fetching exercises by body part:', error);
      return [];
    }
    return data || [];
  }

  // Get exercises by difficulty
  static async getExercisesByDifficulty(difficulty: string): Promise<SupabaseExercise[]> {
    const { data, error } = await supabase
      .from(TABLES.EXERCISES)
      .select('*')
      .eq('difficulty', difficulty);
    
    if (error) {
      console.error('Error fetching exercises by difficulty:', error);
      return [];
    }
    return data || [];
  }

  // Search exercises
  static async searchExercises(searchTerm: string): Promise<SupabaseExercise[]> {
    const { data, error } = await supabase
      .from(TABLES.EXERCISES)
      .select('*')
      .ilike('name', `%${searchTerm}%`);
    
    if (error) {
      console.error('Error searching exercises:', error);
      return [];
    }
    return data || [];
  }

  // Get all nutrition data
  static async getNutritionData(): Promise<SupabaseNutrition[]> {
    const { data, error } = await supabase
      .from(TABLES.NUTRITION)
      .select('*');
    
    if (error) {
      console.error('Error fetching nutrition data:', error);
      return [];
    }
    return data || [];
  }

  // Search nutrition data
  static async searchNutrition(searchTerm: string): Promise<SupabaseNutrition[]> {
    const { data, error } = await supabase
      .from(TABLES.NUTRITION)
      .select('*')
      .ilike('name', `%${searchTerm}%`);
    
    if (error) {
      console.error('Error searching nutrition:', error);
      return [];
    }
    return data || [];
  }

  // Get body composition data
  static async getBodyCompositionData(): Promise<SupabaseBodyComposition[]> {
    const { data, error } = await supabase
      .from(TABLES.BODY_COMPOSITION)
      .select('*');
    
    if (error) {
      console.error('Error fetching body composition:', error);
      return [];
    }
    return data || [];
  }

  // Get body composition by gender
  static async getBodyCompositionByGender(gender: string): Promise<SupabaseBodyComposition[]> {
    const { data, error } = await supabase
      .from(TABLES.BODY_COMPOSITION)
      .select('*')
      .eq('gender', gender);
    
    if (error) {
      console.error('Error fetching body composition by gender:', error);
      return [];
    }
    return data || [];
  }

  // User Profile operations
  static async getUserProfile(userId: string): Promise<SupabaseUserProfile | null> {
    const { data, error } = await supabase
      .from(TABLES.USER_PROFILES)
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    return data;
  }

  static async createUserProfile(profile: Partial<SupabaseUserProfile>): Promise<SupabaseUserProfile | null> {
    const { data, error } = await supabase
      .from(TABLES.USER_PROFILES)
      .insert(profile)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
    return data;
  }

  static async updateUserProfile(userId: string, profile: Partial<SupabaseUserProfile>): Promise<SupabaseUserProfile | null> {
    const { data, error } = await supabase
      .from(TABLES.USER_PROFILES)
      .update(profile)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user profile:', error);
      return null;
    }
    return data;
  }

  // Progress entries operations
  static async getProgressEntries(userId: string): Promise<SupabaseProgressEntry[]> {
    const { data, error } = await supabase
      .from(TABLES.PROGRESS_ENTRIES)
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching progress entries:', error);
      return [];
    }
    return data || [];
  }

  static async addProgressEntry(entry: Partial<SupabaseProgressEntry>): Promise<SupabaseProgressEntry | null> {
    const { data, error } = await supabase
      .from(TABLES.PROGRESS_ENTRIES)
      .insert(entry)
      .select()
      .single();
    
    if (error) {
      console.error('Error adding progress entry:', error);
      return null;
    }
    return data;
  }

  // Check Supabase connection
  static async checkConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from(TABLES.EXERCISES)
        .select('count')
        .limit(1);
      
      return !error;
    } catch (error) {
      console.error('Supabase connection error:', error);
      return false;
    }
  }
}

export default supabase;
