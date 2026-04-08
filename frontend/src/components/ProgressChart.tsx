import React from 'react';
import { ProgressEntry, UserProfile } from '../types';

interface ProgressChartProps {
  data: ProgressEntry[];
  dataKey: string;
  title: string;
  color: string;
  unit: string;
  profile: UserProfile;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, dataKey, title, color, unit, profile }) => {
  if (data.length < 2) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <div className="text-center py-8 text-gray-500">
          Need at least 2 entries to show progress chart
        </div>
      </div>
    );
  }

  const values = data.map(entry => entry[dataKey]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      <div className="relative h-48 mb-4">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(line => (
            <line
              key={line}
              x1="0"
              y1={40 * line}
              x2="400"
              y2={40 * line}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Progress line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            points={data.map((entry, index) => {
              const x = (index / (data.length - 1)) * 380 + 10;
              const y = 180 - ((entry[dataKey] - minValue) / range) * 160;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {data.map((entry, index) => {
            const x = (index / (data.length - 1)) * 380 + 10;
            const y = 180 - ((entry[dataKey] - minValue) / range) * 160;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                className="drop-shadow-sm"
              />
            );
          })}
        </svg>
      </div>

      {/* Latest vs First comparison */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="font-bold text-gray-700">{data[0][dataKey]}{unit}</div>
          <div className="text-sm text-gray-600">Starting</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="font-bold text-blue-600">{data[data.length - 1][dataKey]}{unit}</div>
          <div className="text-sm text-blue-700">Current</div>
        </div>
      </div>

      {/* Change indicator */}
      <div className="mt-4 text-center">
        {(() => {
          const startValue = data[0][dataKey];
          const endValue = data[data.length - 1][dataKey];
          const change = endValue - startValue;
          const isIncrease = change > 0;
          
          let isPositiveChange = false;
          
          if (dataKey === 'weight') {
            // For weight: depends on fitness goal
            if (profile.fitnessGoal === 'cutting') {
              isPositiveChange = !isIncrease; // Decrease is good for cutting
            } else if (profile.fitnessGoal === 'bulking') {
              isPositiveChange = isIncrease; // Increase is good for bulking
            } else {
              isPositiveChange = Math.abs(change) < 0.5; // Small changes are good for maintaining
            }
          } else if (dataKey === 'bodyFat') {
            // For body fat: decrease is always good
            isPositiveChange = !isIncrease;
          }
          
          return (
            <div className={`font-semibold ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change.toFixed(1)}{unit} total change
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default ProgressChart;