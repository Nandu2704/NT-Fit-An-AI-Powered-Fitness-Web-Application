// Predictive modeling for fitness progress
// Simulates advanced AI prediction algorithms

import { UserProfile, ProgressEntry } from '../types';

export class FitnessPredictionModel {
  static predictWeightChange(profile: UserProfile, adherenceRate: number = 0.8, timeframe: number = 12) {
    const weeklyDeficit = profile.fitnessGoal === 'cutting' ? -0.5 : 
                         profile.fitnessGoal === 'bulking' ? 0.3 : 0;
    
    const predictions = [];
    let currentWeight = profile.weight;
    
    for (let week = 1; week <= timeframe; week++) {
      // Apply diminishing returns
      const effectivenessDecay = Math.exp(-week * 0.02);
      const adjustedDeficit = weeklyDeficit * adherenceRate * effectivenessDecay;
      currentWeight += adjustedDeficit;
      
      predictions.push({
        week,
        weight: Math.round(currentWeight * 10) / 10,
        bodyFat: this.predictBodyFatChange(profile, week, adherenceRate),
        muscleMass: this.predictMuscleMassChange(profile, week, adherenceRate)
      });
    }
    
    return predictions;
  }

  static predictBodyFatChange(profile: UserProfile, week: number, adherence: number): number {
    const initialBF = profile.bodyAnalysis?.bodyFat || 20;
    let change = 0;
    
    if (profile.fitnessGoal === 'cutting') {
      change = -0.5 * adherence * Math.exp(-week * 0.03);
    } else if (profile.fitnessGoal === 'bulking') {
      change = 0.2 * adherence * Math.exp(-week * 0.05);
    }
    
    const newBF = initialBF + (change * week);
    return Math.max(8, Math.min(35, Math.round(newBF * 10) / 10));
  }

  static predictMuscleMassChange(profile: UserProfile, week: number, adherence: number): number {
    const initialMM = profile.bodyAnalysis?.muscleMass || 45;
    let change = 0;
    
    if (profile.fitnessGoal === 'bulking') {
      change = 0.3 * adherence * Math.exp(-week * 0.04);
    } else if (profile.fitnessGoal === 'cutting') {
      change = -0.1 * adherence * Math.exp(-week * 0.06);
    } else {
      change = 0.1 * adherence * Math.exp(-week * 0.05);
    }
    
    const newMM = initialMM + (change * week);
    return Math.max(30, Math.min(70, Math.round(newMM * 10) / 10));
  }

  static generateMotivationalInsights(progressData: ProgressEntry[], profile: UserProfile): string[] {
    const insights = [];
    
    if (progressData.length >= 2) {
      const latest = progressData[progressData.length - 1];
      const previous = progressData[progressData.length - 2];
      
      const weightChange = latest.weight - previous.weight;
      
      if (profile.fitnessGoal === 'cutting' && weightChange < 0) {
        insights.push(`Great progress! You've lost ${Math.abs(weightChange).toFixed(1)}kg since your last entry.`);
      } else if (profile.fitnessGoal === 'bulking' && weightChange > 0) {
        insights.push(`Excellent! You've gained ${weightChange.toFixed(1)}kg of quality mass.`);
      }
    }
    
    insights.push('Consistency is key - keep logging your progress!');
    insights.push('Your body composition is improving with each workout.');
    
    return insights;
  }

  static calculateCompletionRate(_profile: UserProfile, progressData: ProgressEntry[]): number {
    // Simulate completion rate based on progress entries
    const expectedEntries = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7)); // Weekly entries expected
    return Math.min(100, Math.round((progressData.length / Math.max(1, expectedEntries)) * 100));
  }
}