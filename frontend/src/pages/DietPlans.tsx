import React, { useEffect, useState } from 'react';
import { Apple, TrendingUp, Clock, Target, Calendar, Sparkles } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import DietGenerator from '../components/DietGenerator';
import { Meal, Food } from '../types';

const DietPlans: React.FC = () => {
  const { profile, dietPlan, setDietPlan } = useUser();
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    if (profile && !dietPlan) {
      const generatedPlan = DietGenerator.generateDietPlan(profile);
      setDietPlan(generatedPlan);
    }
  }, [profile, dietPlan, setDietPlan]);

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <Apple className="w-16 h-16 mx-auto mb-6 text-orange-500" />
        <h1 className="text-3xl font-bold mb-4">Profile Required</h1>
        <p className="text-gray-600 mb-8">Complete your profile to get AI-powered nutrition recommendations.</p>
      </div>
    );
  }

  if (!dietPlan) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold mb-4">Generating Your Personalized Diet Plan...</h2>
        <p className="text-gray-600">Creating unique daily meal plans optimized for your goals...</p>
      </div>
    );
  }

  const currentDayPlan = dietPlan.weeklyPlan[selectedDay];
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">AI-Powered Nutrition Plan</h1>
        <p className="text-gray-600 text-lg">
          7 unique daily meal plans optimized for your {profile.fitnessGoal} goals
        </p>
      </div>

      {/* Daily Macros Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-600" />
          Daily Macro Targets
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-3xl font-bold text-blue-600">{dietPlan.dailyMacros.calories}</div>
            <div className="text-blue-700 font-medium">Calories</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-3xl font-bold text-green-600">{dietPlan.dailyMacros.protein}g</div>
            <div className="text-green-700 font-medium">Protein</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-3xl font-bold text-orange-600">{dietPlan.dailyMacros.carbs}g</div>
            <div className="text-orange-700 font-medium">Carbs</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-3xl font-bold text-purple-600">{dietPlan.dailyMacros.fats}g</div>
            <div className="text-purple-700 font-medium">Fats</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Week Navigation with Daily Themes */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h3 className="text-xl font-bold mb-4">Weekly Nutrition Plan</h3>
            <div className="space-y-2">
              {dayNames.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    selectedDay === index
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{day}</div>
                  <div className="text-xs opacity-75">
                    {dietPlan.weeklyPlan[index]?.theme || 'Balanced Day'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Meal Plan */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {dayNames[selectedDay]} Meal Plan
              </h2>
              <div className="flex items-center text-purple-600">
                <Sparkles className="w-5 h-5 mr-2" />
                <span className="font-medium">{currentDayPlan.theme}</span>
              </div>
            </div>

            {/* Daily Theme Focus */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
              <h3 className="font-semibold text-purple-800 mb-2">Today's Nutritional Focus</h3>
              <p className="text-purple-700">{currentDayPlan.specialFocus}</p>
            </div>

            <div className="space-y-6">
              {currentDayPlan.meals.map((meal: Meal, mealIndex: number) => (
                <div key={mealIndex} className="border rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      {meal.name}
                    </h3>
                    <div className="text-sm text-gray-500">{meal.time}</div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Foods & Portions</h4>
                      <div className="space-y-2">
                        {meal.foods.map((food: Food, foodIndex: number) => (
                          <div key={foodIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <span className="font-medium">{food.name}</span>
                            <span className="text-sm text-gray-600 font-medium">{food.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Nutritional Breakdown</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-blue-50 rounded-lg text-center">
                          <div className="font-bold text-blue-600">{meal.macros.calories}</div>
                          <div className="text-sm text-blue-700">Calories</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg text-center">
                          <div className="font-bold text-green-600">{meal.macros.protein}g</div>
                          <div className="text-sm text-green-700">Protein</div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg text-center">
                          <div className="font-bold text-orange-600">{meal.macros.carbs}g</div>
                          <div className="text-sm text-orange-700">Carbs</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg text-center">
                          <div className="font-bold text-purple-600">{meal.macros.fats}g</div>
                          <div className="text-sm text-purple-700">Fats</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Daily Totals */}
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                {dayNames[selectedDay]} Totals
              </h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="font-bold text-blue-600 text-xl">{currentDayPlan.totalMacros.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div>
                  <div className="font-bold text-green-600 text-xl">{currentDayPlan.totalMacros.protein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div>
                  <div className="font-bold text-orange-600 text-xl">{currentDayPlan.totalMacros.carbs}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div>
                  <div className="font-bold text-purple-600 text-xl">{currentDayPlan.totalMacros.fats}g</div>
                  <div className="text-sm text-gray-600">Fats</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced AI Nutrition Insights */}
      <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2" />
          AI Nutrition Intelligence
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Weekly Optimization</h3>
            <ul className="space-y-1 text-sm opacity-90">
              {dietPlan.insights.tips.slice(0, 4).map((tip: string, index: number) => (
                <li key={index}>• {tip}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Meal Timing Strategy</h3>
            <p className="text-sm opacity-90">{dietPlan.insights.timing}</p>
            <div className="mt-2 text-sm opacity-90">
              <strong>Weekly Focus:</strong> {dietPlan.insights.weeklyFocus}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Hydration & Supplements</h3>
            <p className="text-sm opacity-90 mb-2">{dietPlan.insights.hydration}</p>
            <div className="text-sm opacity-90">
              <strong>Recommended:</strong> {dietPlan.supplements.slice(0, 3).join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlans;