import React from 'react';
import { TrendingUp, Target, Activity, Zap, Award, Dumbbell, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BodyAnalysis } from '../types';

interface AnalysisResultsProps {
  results: BodyAnalysis;
  capturedImage: string;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, capturedImage }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Analysis Image and Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Analysis Complete</h2>
          <div className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full">
            <Award className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{results.accuracyScore}% Accuracy</span>
          </div>
        </div>
        
        <div className="mb-6">
          <img 
            src={capturedImage} 
            alt="Analysis capture" 
            className="w-full rounded-xl"
            style={{ transform: 'scaleX(-1)' }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-xl text-center">
            <div className="text-2xl font-bold text-blue-600">{results.bodyFat}%</div>
            <div className="text-sm text-blue-700">Body Fat</div>
          </div>
          <div className="p-4 bg-green-50 rounded-xl text-center">
            <div className="text-2xl font-bold text-green-600">{results.muscleMass}%</div>
            <div className="text-sm text-green-700">Muscle Mass</div>
          </div>
          <div className="p-4 bg-orange-50 rounded-xl text-center">
            <div className="text-2xl font-bold text-orange-600">{results.bmi}</div>
            <div className="text-sm text-orange-700">BMI</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl text-center">
            <div className="text-2xl font-bold text-purple-600">{results.postureScore.overallScore}%</div>
            <div className="text-sm text-purple-700">Posture Score</div>
          </div>
        </div>

        {/* Enhanced Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-indigo-50 rounded-lg text-center">
            <div className="text-lg font-bold text-indigo-600">{results.metabolicRate}</div>
            <div className="text-xs text-indigo-700">BMR (cal/day)</div>
          </div>
          <div className="p-3 bg-pink-50 rounded-lg text-center">
            <div className="text-lg font-bold text-pink-600">{results.fitnessAge}</div>
            <div className="text-xs text-pink-700">Fitness Age</div>
          </div>
          <div className="p-3 bg-teal-50 rounded-lg text-center">
            <div className="text-lg font-bold text-teal-600">{results.bodyType}</div>
            <div className="text-xs text-teal-700">Body Type</div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="space-y-6">
        {/* Enhanced Body Measurements */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-blue-600" />
            Detailed Body Measurements
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(results.measurements).map(([key, value]: [string, number]) => (
              <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium capitalize">{key}</span>
                <span className="font-bold text-gray-700">{value} cm</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Posture Analysis */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Activity className="w-6 h-6 mr-2 text-green-600" />
            Advanced Posture Analysis
          </h3>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Shoulder Alignment</span>
              <span className="font-bold text-green-600">{results.postureScore.shoulderAlignment}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Spinal Alignment</span>
              <span className="font-bold text-blue-600">{results.postureScore.spinalAlignment}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Hip Balance</span>
              <span className="font-bold text-purple-600">{results.postureScore.hipBalance}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Body Symmetry</span>
              <span className="font-bold text-indigo-600">{results.symmetryScore}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span>Flexibility Score</span>
              <span className="font-bold text-pink-600">{results.flexibilityScore}%</span>
            </div>
          </div>

          {results.postureScore.issues.length > 0 && (
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-800 mb-2">Areas for Improvement:</div>
              <ul className="text-sm text-yellow-700 space-y-1">
                {results.postureScore.issues.map((issue: string, index: number) => (
                  <li key={index}>• {issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Enhanced AI Recommendations */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-orange-600" />
            AI-Powered Recommendations
          </h3>
          <div className="space-y-3">
            {results.recommendations.map((rec: string, index: number) => (
              <div key={index} className="flex items-start p-3 bg-orange-50 rounded-lg">
                <Zap className="w-5 h-5 text-orange-600 mr-3 mt-0.5" />
                <span className="text-orange-800">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            to="/workouts"
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Dumbbell className="w-5 h-5 mr-2" />
            Get Workout Plan
          </Link>
          <Link
            to="/diet"
            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold text-center hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Apple className="w-5 h-5 mr-2" />
            Get Diet Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;