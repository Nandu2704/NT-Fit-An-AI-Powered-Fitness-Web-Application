import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import WorkoutPlans from './pages/WorkoutPlans';
import DietPlans from './pages/DietPlans';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/workouts" element={<WorkoutPlans />} />
            <Route path="/diet" element={<DietPlans />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;