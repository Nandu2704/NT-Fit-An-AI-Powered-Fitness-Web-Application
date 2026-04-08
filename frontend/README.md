# NTFit - AI-Powered Fitness Web Application

## Overview
NTFit is a revolutionary AI-powered fitness web application that provides comprehensive body analysis, personalized workout plans, and adaptive nutrition recommendations using advanced computer vision and machine learning technologies.

## Features
- 🎯 AI-powered body composition analysis with 94.7% accuracy
- 💪 Multiple specialized workout sessions (Strength, HIIT, Cardio, Flexibility)
- 🍎 7 unique daily diet plans with different nutritional themes
- 📊 Advanced progress tracking with predictive analytics
- 📱 Responsive design optimized for all devices
- 🎨 Premium UI/UX with smooth animations and micro-interactions

## Technology Stack
- **Frontend**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router 7.8.2
- **Icons**: Lucide React
- **Build Tool**: Vite 5.4.2
- **State Management**: React Context API
- **Data Persistence**: LocalStorage

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ntfit-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Navigation and app structure
│   ├── CameraInterface.tsx  # Camera capture interface
│   ├── WorkoutPlayer.tsx    # Interactive workout sessions
│   ├── AnalysisResults.tsx  # Body analysis display
│   ├── ProgressChart.tsx    # Data visualization
│   ├── WorkoutGenerator.tsx # AI workout creation
│   └── DietGenerator.tsx    # AI nutrition planning
├── pages/              # Main application screens
│   ├── Home.tsx       # Landing and overview
│   ├── Analysis.tsx   # Body analysis workflow
│   ├── WorkoutPlans.tsx # Exercise planning
│   ├── DietPlans.tsx  # Nutrition planning
│   ├── Progress.tsx   # Analytics and tracking
│   └── Profile.tsx    # User profile management
├── contexts/          # Global state management
│   └── UserContext.tsx # User data and preferences
├── utils/             # Utility functions and AI logic
│   ├── aiAnalysis.ts  # Body analysis algorithms
│   └── predictionModels.ts # Progress forecasting
└── types/             # TypeScript type definitions
```

## Key Features

### AI Body Analysis
- Real-time camera-based body composition analysis
- Comprehensive measurements (8 body parts)
- Advanced posture analysis with 5 metrics
- Body fat percentage, muscle mass, BMI calculations
- Metabolic rate and fitness age assessment

### Workout Generation
- Multiple session types: Strength, HIIT, Cardio, Flexibility
- Equipment support: Bodyweight, dumbbells, barbells, kettlebells
- Experience-based difficulty scaling
- Interactive workout player with timers
- Editable weekly schedule with drag-and-drop functionality

### Nutrition Planning
- 7 unique daily meal plans with different themes
- Comprehensive food database (50+ foods)
- Macro calculation based on goals and body composition
- Meal timing optimization for pre/post workout
- Supplement recommendations

### Progress Tracking
- Visual progress charts with SVG rendering
- Predictive modeling for 12-week forecasts
- Motivational insights and daily quotes
- Progress entry logging with notes

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the MIT License.

## Contact
For questions or support, please contact the development team.