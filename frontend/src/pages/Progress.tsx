import React, { useState } from 'react';
import { TrendingUp, Camera, Scale, Calendar, Target, Plus } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import ProgressChart from '../components/ProgressChart';

const Progress: React.FC = () => {
  const { profile, progressData, addProgressEntry } = useUser();
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    weight: profile?.weight || 70,
    bodyFat: profile?.bodyAnalysis?.bodyFat || 20,
    muscleMass: profile?.bodyAnalysis?.muscleMass || 45,
    measurements: {
      chest: profile?.bodyAnalysis?.measurements?.chest || 95,
      waist: profile?.bodyAnalysis?.measurements?.waist || 80,
      hips: profile?.bodyAnalysis?.measurements?.hips || 90
    },
    notes: ''
  });

  const handleAddEntry = () => {
    addProgressEntry(newEntry);
    setShowAddEntry(false);
    setNewEntry({
      weight: newEntry.weight,
      bodyFat: newEntry.bodyFat,
      muscleMass: newEntry.muscleMass,
      measurements: newEntry.measurements,
      notes: ''
    });
  };

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <TrendingUp className="w-16 h-16 mx-auto mb-6 text-purple-500" />
        <h1 className="text-3xl font-bold mb-4">Profile Required</h1>
        <p className="text-gray-600 mb-8">Set up your profile to start tracking your fitness progress.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Progress Tracking</h1>
          <p className="text-gray-600 text-lg">Monitor your fitness journey with AI-powered analytics</p>
        </div>
        <button
          onClick={() => setShowAddEntry(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Entry
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <Scale className="w-8 h-8 mx-auto mb-3 text-blue-600" />
          <div className="text-2xl font-bold text-gray-900">
            {progressData.length > 0 ? progressData[progressData.length - 1].weight : profile.weight} kg
          </div>
          <div className="text-gray-600">Current Weight</div>
          {progressData.length > 1 && (
            <div className="text-sm mt-1">
              <span className={`${
                progressData[progressData.length - 1].weight < progressData[progressData.length - 2].weight 
                  ? 'text-green-600' : 'text-red-600'
              }`}>
                {progressData[progressData.length - 1].weight < progressData[progressData.length - 2].weight ? '↓' : '↑'}
                {Math.abs(progressData[progressData.length - 1].weight - progressData[progressData.length - 2].weight).toFixed(1)} kg
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <Target className="w-8 h-8 mx-auto mb-3 text-green-600" />
          <div className="text-2xl font-bold text-gray-900">
            {profile.bodyAnalysis?.bodyFat || 'N/A'}%
          </div>
          <div className="text-gray-600">Body Fat</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-600" />
          <div className="text-2xl font-bold text-gray-900">
            {profile.bodyAnalysis?.muscleMass || 'N/A'}%
          </div>
          <div className="text-gray-600">Muscle Mass</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <Calendar className="w-8 h-8 mx-auto mb-3 text-orange-600" />
          <div className="text-2xl font-bold text-gray-900">{progressData.length}</div>
          <div className="text-gray-600">Entries</div>
        </div>
      </div>

      {/* Progress Charts */}
      {progressData.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ProgressChart 
            data={progressData} 
            dataKey="weight" 
            title="Weight Progress" 
            color="#3B82F6"
            unit="kg"
            profile={profile}
          />
          <ProgressChart 
            data={progressData} 
            dataKey="bodyFat" 
            title="Body Fat Progress" 
            color="#10B981"
            unit="%"
            profile={profile}
          />
        </div>
      )}

      {/* Daily Motivation Section */}
      <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Today's Motivation</h2>
        <div className="text-center">
          <div className="text-xl italic mb-4">
            "{['Your body can do it. It\'s your mind you need to convince.', 
               'The only bad workout is the one that didn\'t happen.', 
               'Success is the sum of small efforts repeated day in and day out.',
               'Don\'t wish for it, work for it.',
               'A healthy outside starts from the inside.',
               'Fitness is not about being better than someone else. It\'s about being better than you used to be.',
               'The groundwork for all happiness is good health.'][new Date().getDay()]}"
          </div>
          <div className="text-sm opacity-80">
            Keep pushing forward, {profile.name}! Every step counts towards your {profile.fitnessGoal} goal.
          </div>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Entries</h2>
        {progressData.length === 0 ? (
          <div className="text-center py-12">
            <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No progress entries yet. Add your first measurement!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {progressData.slice(-5).reverse().map((entry, index) => (
              <div key={index} className="border rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="font-semibold text-gray-900">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleTimeString()}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-bold text-blue-600">{entry.weight} kg</div>
                    <div className="text-sm text-blue-700">Weight</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-bold text-green-600">{entry.bodyFat}%</div>
                    <div className="text-sm text-green-700">Body Fat</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="font-bold text-purple-600">{entry.muscleMass}%</div>
                    <div className="text-sm text-purple-700">Muscle Mass</div>
                  </div>
                </div>

                {entry.notes && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-700">{entry.notes}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Entry Modal */}
      {showAddEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Add Progress Entry</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={newEntry.weight}
                    onChange={(e) => setNewEntry({...newEntry, weight: parseFloat(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Body Fat (%)</label>
                  <input
                    type="number"
                    value={newEntry.bodyFat}
                    onChange={(e) => setNewEntry({...newEntry, bodyFat: parseFloat(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
                <textarea
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How are you feeling today? Any observations?"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddEntry}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                  Add Entry
                </button>
                <button
                  onClick={() => setShowAddEntry(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;