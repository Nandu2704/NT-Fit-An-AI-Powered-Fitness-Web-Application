import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, WorkoutSession, DietPlan, ProgressEntry } from '../types';

interface UserContextType {
  profile: UserProfile | null;
  updateProfile: (profile: UserProfile) => void;
  workoutPlans: WorkoutSession[];
  setWorkoutPlans: (plans: WorkoutSession[]) => void;
  dietPlan: DietPlan | null;
  setDietPlan: (plan: DietPlan | null) => void;
  progressData: ProgressEntry[];
  addProgressEntry: (entry: ProgressEntry) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutSession[]>([]);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('fitnessProfile', JSON.stringify(newProfile));
  };

  const addProgressEntry = (entry: ProgressEntry) => {
    const newProgressData = [...progressData, { ...entry, date: new Date().toISOString() }];
    setProgressData(newProgressData);
    localStorage.setItem('progressData', JSON.stringify(newProgressData));
  };

  // Load data from localStorage on mount
  React.useEffect(() => {
    const savedProfile = localStorage.getItem('fitnessProfile');
    const savedProgress = localStorage.getItem('progressData');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress));
    }
  }, []);

  return (
    <UserContext.Provider value={{
      profile,
      updateProfile,
      workoutPlans,
      setWorkoutPlans,
      dietPlan,
      setDietPlan,
      progressData,
      addProgressEntry
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};