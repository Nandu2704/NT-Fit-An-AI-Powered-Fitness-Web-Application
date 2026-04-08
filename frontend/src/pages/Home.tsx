import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Dumbbell, Apple, TrendingUp, Zap, Target, Users, Activity } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Home: React.FC = () => {
  const { profile } = useUser();

  const features = [
    {
      icon: Camera,
      title: 'AI Body Analysis',
      description: 'Advanced computer vision technology analyzes your body composition in real-time using just your camera.',
      color: 'bg-blue-500'
    },
    {
      icon: Dumbbell,
      title: 'Personalized Workouts',
      description: 'Machine learning algorithms create custom workout plans tailored to your goals and fitness level.',
      color: 'bg-green-500'
    },
    {
      icon: Apple,
      title: 'Smart Nutrition',
      description: 'AI-powered diet recommendations based on your body composition, goals, and dietary preferences.',
      color: 'bg-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Comprehensive analytics and predictive modeling to track your fitness journey and forecast results.',
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: Users },
    { number: '95%', label: 'Accuracy Rate', icon: Target },
    { number: '4.8/5', label: 'User Rating', icon: Zap }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section with Gym Equipment */}
      <div className="relative text-center py-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl mb-16 text-white overflow-hidden">
        {/* Background Gym Equipment Images */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 transform rotate-12">
            <img 
              src="https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Dumbbells" 
              className="w-24 h-24 rounded-lg"
            />
          </div>
          <div className="absolute top-20 right-20 transform -rotate-12">
            <img 
              src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Barbell" 
              className="w-32 h-20 rounded-lg"
            />
          </div>
          <div className="absolute bottom-10 left-20 transform rotate-6">
            <img 
              src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Kettlebell" 
              className="w-20 h-20 rounded-lg"
            />
          </div>
          <div className="absolute bottom-20 right-10 transform -rotate-6">
            <img 
              src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Weight Plates" 
              className="w-28 h-28 rounded-lg"
            />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <Dumbbell className="w-16 h-16 mr-4 text-white" />
            <h1 className="text-5xl font-bold">
              Transform Your Fitness Journey with NTFit AI
            </h1>
          </div>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience the future of personal fitness with our AI-powered platform that analyzes your body, 
            creates personalized workout plans, and provides real-time guidance - all through your camera.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/analysis"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 flex items-center"
            >
              <Camera className="w-5 h-5 mr-2" />
              Start Analysis
            </Link>
            <Link
              to="/profile"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center"
            >
              <Activity className="w-5 h-5 mr-2" />
              Setup Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Cutting-Edge Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gym Equipment Showcase */}
      <div className="mb-16 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Professional Gym Equipment Integration
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center group">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img 
                src="https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" 
                alt="Dumbbells" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Dumbbells</h3>
            <p className="text-sm text-gray-600">Versatile strength training for all muscle groups</p>
          </div>
          
          <div className="text-center group">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img 
                src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" 
                alt="Barbell" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-green-600 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Barbells</h3>
            <p className="text-sm text-gray-600">Heavy compound movements for maximum gains</p>
          </div>
          
          <div className="text-center group">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img 
                src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" 
                alt="Kettlebell" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-orange-600 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Kettlebells</h3>
            <p className="text-sm text-gray-600">Dynamic functional training and cardio</p>
          </div>
          
          <div className="text-center group">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img 
                src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" 
                alt="Weight Plates" 
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-purple-600 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Weight Plates</h3>
            <p className="text-sm text-gray-600">Progressive overload for continuous improvement</p>
          </div>
        </div>
      </div>

      {/* Current Status */}
      {profile ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Welcome Back, {profile.name}!</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                {profile.fitnessGoal.charAt(0).toUpperCase() + profile.fitnessGoal.slice(1)}
              </div>
              <div className="text-gray-600">Current Goal</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{profile.weight} kg</div>
              <div className="text-gray-600">Current Weight</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {profile.experienceLevel.charAt(0).toUpperCase() + profile.experienceLevel.slice(1)}
              </div>
              <div className="text-gray-600">Experience</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="mb-6">Set up your profile and get your first AI-powered body analysis.</p>
          <Link
            to="/profile"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
          >
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;