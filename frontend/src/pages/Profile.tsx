import React, { useState } from 'react';
import { User, Save, Target, Activity, Ruler } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { profile, updateProfile } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    age: profile?.age || 25,
    height: profile?.height || 170,
    weight: profile?.weight || 70,
    fitnessGoal: profile?.fitnessGoal || 'maintaining' as 'cutting' | 'bulking' | 'maintaining',
    experienceLevel: profile?.experienceLevel || 'beginner' as 'beginner' | 'intermediate' | 'advanced'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    navigate('/');
  };

  const goalDescriptions = {
    cutting: 'Lose fat while preserving muscle mass',
    bulking: 'Build muscle mass and increase strength',
    maintaining: 'Maintain current physique and improve fitness'
  };

  const experienceDescriptions = {
    beginner: 'New to fitness or returning after a long break',
    intermediate: '6+ months of consistent training',
    advanced: '2+ years of consistent training'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Your Fitness Profile</h1>
        <p className="text-gray-600 text-lg">
          Help our AI create the perfect fitness and nutrition plan for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-blue-600" />
            Basic Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                min="16"
                max="80"
                required
              />
            </div>
          </div>
        </div>

        {/* Physical Measurements */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Ruler className="w-6 h-6 mr-2 text-green-600" />
            Physical Measurements
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({...formData, height: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                min="120"
                max="220"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value)})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                min="40"
                max="200"
                required
              />
            </div>
          </div>
        </div>

        {/* Fitness Goals */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Target className="w-6 h-6 mr-2 text-purple-600" />
            Fitness Goals
          </h2>
          
          <div className="grid gap-4">
            {Object.entries(goalDescriptions).map(([goal, description]) => (
              <label
                key={goal}
                className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  formData.fitnessGoal === goal
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="fitnessGoal"
                  value={goal}
                  checked={formData.fitnessGoal === goal}
                  onChange={(e) => setFormData({...formData, fitnessGoal: e.target.value as 'cutting' | 'bulking' | 'maintaining'})}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 capitalize">{goal}</div>
                    <div className="text-sm text-gray-600">{description}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    formData.fitnessGoal === goal
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {formData.fitnessGoal === goal && (
                      <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-orange-600" />
            Experience Level
          </h2>
          
          <div className="grid gap-4">
            {Object.entries(experienceDescriptions).map(([level, description]) => (
              <label
                key={level}
                className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  formData.experienceLevel === level
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="experienceLevel"
                  value={level}
                  checked={formData.experienceLevel === level}
                  onChange={(e) => setFormData({...formData, experienceLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced'})}
                  className="sr-only"
                />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 capitalize">{level}</div>
                    <div className="text-sm text-gray-600">{description}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    formData.experienceLevel === level
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-300'
                  }`}>
                    {formData.experienceLevel === level && (
                      <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-12 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center mx-auto"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Profile
          </button>
        </div>
      </form>

      {/* Profile Summary */}
      {profile && (
        <div className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Current Profile Summary</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{profile.age}</div>
              <div className="opacity-80">Years Old</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{profile.height} cm</div>
              <div className="opacity-80">Height</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{profile.weight} kg</div>
              <div className="opacity-80">Weight</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold capitalize">{profile.fitnessGoal}</div>
              <div className="opacity-80">Goal</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold capitalize">{profile.experienceLevel}</div>
              <div className="opacity-80">Level</div>
            </div>
            {profile.bodyAnalysis && (
              <div className="text-center">
                <div className="text-xl font-bold">{profile.bodyAnalysis.bmi}</div>
                <div className="opacity-80">BMI</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;