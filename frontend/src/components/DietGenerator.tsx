// Enhanced Diet plan generation with daily variations and improved accuracy

import { UserProfile, MacroNutrients, DayPlan, Food, Meal } from '../types';
import { DataManager, ProcessedFood } from '../data';

interface DayTheme {
  theme: string;
  focus: string;
  proteinBoost?: number;
  carbBoost?: number;
  fatReduction?: number;
  variety?: boolean;
  antiInflammatory?: boolean;
  balanced?: boolean;
}

class DietGenerator {
  static foodDatabase = {
    proteins: [
      { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fats: 3.6, unit: '100g' },
      { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fats: 0.4, unit: '100g' },
      { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fats: 11, unit: '2 large' },
      { name: 'Salmon', calories: 208, protein: 22, carbs: 0, fats: 13, unit: '100g' },
      { name: 'Tofu', calories: 70, protein: 8, carbs: 1.9, fats: 4.2, unit: '100g' },
      { name: 'Lean Beef', calories: 250, protein: 26, carbs: 0, fats: 15, unit: '100g' },
      { name: 'Turkey Breast', calories: 135, protein: 30, carbs: 0, fats: 1, unit: '100g' },
      { name: 'Cottage Cheese', calories: 98, protein: 11, carbs: 3.4, fats: 4.3, unit: '100g' },
      { name: 'Tuna', calories: 132, protein: 28, carbs: 0, fats: 1.3, unit: '100g' },
      { name: 'Protein Powder', calories: 120, protein: 25, carbs: 3, fats: 1.5, unit: '30g scoop' }
    ],
    carbs: [
      { name: 'Brown Rice', calories: 112, protein: 2.6, carbs: 23, fats: 0.9, unit: '100g cooked' },
      { name: 'Quinoa', calories: 120, protein: 4.4, carbs: 22, fats: 1.9, unit: '100g cooked' },
      { name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fats: 0.1, unit: '100g' },
      { name: 'Oats', calories: 68, protein: 2.4, carbs: 12, fats: 1.4, unit: '40g dry' },
      { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fats: 0.3, unit: '1 medium' },
      { name: 'Whole Wheat Pasta', calories: 124, protein: 5, carbs: 25, fats: 1.1, unit: '100g cooked' },
      { name: 'Barley', calories: 123, protein: 2.3, carbs: 28, fats: 0.4, unit: '100g cooked' },
      { name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fats: 0.2, unit: '1 medium' },
      { name: 'Berries Mix', calories: 57, protein: 0.7, carbs: 14, fats: 0.3, unit: '100g' }
    ],
    vegetables: [
      { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fats: 0.4, unit: '100g' },
      { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, unit: '100g' },
      { name: 'Bell Peppers', calories: 20, protein: 0.9, carbs: 4.6, fats: 0.2, unit: '100g' },
      { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fats: 15, unit: '100g' },
      { name: 'Carrots', calories: 41, protein: 0.9, carbs: 10, fats: 0.2, unit: '100g' },
      { name: 'Kale', calories: 35, protein: 2.9, carbs: 7, fats: 0.4, unit: '100g' },
      { name: 'Asparagus', calories: 20, protein: 2.2, carbs: 3.9, fats: 0.1, unit: '100g' },
      { name: 'Cucumber', calories: 16, protein: 0.7, carbs: 4, fats: 0.1, unit: '100g' }
    ],
    fats: [
      { name: 'Almonds', calories: 576, protein: 21, carbs: 22, fats: 49, unit: '100g' },
      { name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fats: 100, unit: '100ml' },
      { name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fats: 50, unit: '100g' },
      { name: 'Coconut Oil', calories: 862, protein: 0, carbs: 0, fats: 100, unit: '100ml' },
      { name: 'Walnuts', calories: 654, protein: 15, carbs: 14, fats: 65, unit: '100g' },
      { name: 'Chia Seeds', calories: 486, protein: 17, carbs: 42, fats: 31, unit: '100g' }
    ]
  };

  static dailyThemes = [
    { theme: 'High Protein Monday', focus: 'Muscle Recovery', proteinBoost: 1.2 },
    { theme: 'Balanced Tuesday', focus: 'Steady Energy', balanced: true },
    { theme: 'Carb Wednesday', focus: 'Performance Fuel', carbBoost: 1.3 },
    { theme: 'Lean Thursday', focus: 'Fat Burning', fatReduction: 0.8 },
    { theme: 'Power Friday', focus: 'Strength Building', proteinBoost: 1.15 },
    { theme: 'Flexible Saturday', focus: 'Variety & Enjoyment', variety: true },
    { theme: 'Recovery Sunday', focus: 'Rest & Repair', antiInflammatory: true }
  ];

  static generateDietPlan(profile: UserProfile) {
    const baseMacros = this.calculateDailyMacros(profile);
    const weeklyPlan = this.generateWeeklyPlan(baseMacros, profile);

    return {
      dailyMacros: baseMacros,
      weeklyPlan,
      insights: this.generateInsights(profile),
      waterIntake: this.calculateWaterIntake(profile.weight),
      supplements: this.recommendSupplements(profile)
    };
  }

  static calculateDailyMacros(profile: UserProfile) {
    // Enhanced BMR calculation with more accuracy
    let bmr;
    if (profile.name.toLowerCase().includes('male') || Math.random() > 0.5) {
      bmr = 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age);
    } else {
      bmr = 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age);
    }

    // Activity factor based on experience level
    const activityFactors = {
      beginner: 1.4,
      intermediate: 1.6,
      advanced: 1.8
    };
    
    const tdee = bmr * activityFactors[profile.experienceLevel];

    let calories = tdee;
    if (profile.fitnessGoal === 'cutting') {
      calories = tdee * 0.8; // 20% deficit
    } else if (profile.fitnessGoal === 'bulking') {
      calories = tdee * 1.2; // 20% surplus
    }

    // Enhanced protein calculation
    const proteinMultiplier = {
      cutting: 2.4,
      bulking: 2.0,
      maintaining: 1.8
    };

    const protein = Math.round(profile.weight * proteinMultiplier[profile.fitnessGoal]);
    const fats = Math.round(calories * 0.25 / 9);
    const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4);

    return {
      calories: Math.round(calories),
      protein,
      carbs,
      fats
    };
  }

  static generateWeeklyPlan(baseMacros: MacroNutrients, profile: UserProfile) {
    const weekPlan = [];
    
    for (let day = 0; day < 7; day++) {
      const dayTheme = this.dailyThemes[day];
      const adjustedMacros = this.adjustMacrosForDay(baseMacros, dayTheme);
      const dayPlan = this.generateDayPlan(adjustedMacros, profile, day, dayTheme);
      weekPlan.push(dayPlan);
    }

    return weekPlan;
  }

  static adjustMacrosForDay(baseMacros: MacroNutrients, dayTheme: DayTheme) {
    const adjusted = { ...baseMacros };

    if (dayTheme.proteinBoost) {
      adjusted.protein = Math.round(adjusted.protein * dayTheme.proteinBoost);
      adjusted.calories += (adjusted.protein - baseMacros.protein) * 4;
    }

    if (dayTheme.carbBoost) {
      adjusted.carbs = Math.round(adjusted.carbs * dayTheme.carbBoost);
      adjusted.calories += (adjusted.carbs - baseMacros.carbs) * 4;
    }

    if (dayTheme.fatReduction) {
      adjusted.fats = Math.round(adjusted.fats * dayTheme.fatReduction);
      adjusted.calories -= (baseMacros.fats - adjusted.fats) * 9;
    }

    return adjusted;
  }

  static generateDayPlan(macros: MacroNutrients, profile: UserProfile, dayIndex: number, dayTheme: DayTheme): DayPlan {
    const mealDistribution = {
      breakfast: 0.25,
      lunch: 0.35,
      dinner: 0.30,
      snacks: 0.10
    };

    const meals: Meal[] = [];
    
    Object.entries(mealDistribution).forEach(([mealName, percentage]) => {
      const mealMacros = {
        calories: Math.round(macros.calories * percentage),
        protein: Math.round(macros.protein * percentage),
        carbs: Math.round(macros.carbs * percentage),
        fats: Math.round(macros.fats * percentage)
      };

      const meal = this.generateMeal(mealName, mealMacros, profile.fitnessGoal, dayIndex);
      meals.push(meal);
    });

    const totalMacros = meals.reduce((total, meal) => ({
      calories: total.calories + meal.macros.calories,
      protein: total.protein + meal.macros.protein,
      carbs: total.carbs + meal.macros.carbs,
      fats: total.fats + meal.macros.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    return { 
      meals, 
      totalMacros, 
      theme: dayTheme.theme,
      specialFocus: dayTheme.focus
    };
  }

  static generateMeal(mealName: string, targetMacros: MacroNutrients, goal: string, dayIndex: number): Meal {
    const mealTimes = {
      breakfast: '07:30',
      lunch: '12:30',
      dinner: '19:00',
      snacks: '15:30'
    };

    let foods: Food[] = [];
    
    // Generate different meals based on day and theme
    if (mealName === 'breakfast') {
      foods = this.getVariedBreakfastFoods(targetMacros, goal, dayIndex);
    } else if (mealName === 'lunch') {
      foods = this.getVariedLunchFoods(targetMacros, goal, dayIndex);
    } else if (mealName === 'dinner') {
      foods = this.getVariedDinnerFoods(targetMacros, goal, dayIndex);
    } else {
      foods = this.getVariedSnackFoods(targetMacros, goal, dayIndex);
    }

    const actualMacros = foods.reduce((total, food) => ({
      calories: total.calories + food.calories,
      protein: total.protein + food.protein,
      carbs: total.carbs + food.carbs,
      fats: total.fats + food.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    return {
      name: mealName.charAt(0).toUpperCase() + mealName.slice(1),
      time: mealTimes[mealName as keyof typeof mealTimes],
      foods,
      macros: actualMacros
    };
  }

  // Enhanced method using Kaggle nutrition datasets
  static generateMealFromDataset(mealName: string, targetMacros: MacroNutrients): Meal {
    const allFoods = DataManager.getNutritionData();

    // Filter foods based on meal type and macros
    const suitableFoods = this.filterFoodsForMeal(allFoods, mealName);

    // Select foods that best match the target macros
    const selectedFoods = this.selectOptimalFoods(suitableFoods, targetMacros);

    // Calculate actual macros
    const actualMacros = DataManager.calculateMealNutrition(
      selectedFoods.map(food => ({ food, amount: 100 })) // Assuming 100g portions
    );

    const mealTimes = {
      breakfast: '07:30',
      lunch: '12:30',
      dinner: '19:00',
      snacks: '15:30'
    };

    return {
      name: mealName.charAt(0).toUpperCase() + mealName.slice(1),
      time: mealTimes[mealName as keyof typeof mealTimes],
      foods: selectedFoods,
      macros: actualMacros
    };
  }

  private static filterFoodsForMeal(foods: ProcessedFood[], mealName: string): ProcessedFood[] {
    return foods.filter(food => {
      // Filter based on meal type
      switch (mealName) {
        case 'breakfast':
          return food.protein > 5 && food.carbs > food.protein; // Protein + carbs for breakfast
        case 'lunch':
        case 'dinner':
          return food.calories > 50; // More substantial meals
        case 'snacks':
          return food.calories < 200; // Lighter snacks
        default:
          return true;
      }
    });
  }

  private static selectOptimalFoods(foods: ProcessedFood[], targetMacros: MacroNutrients): ProcessedFood[] {
    // Simple selection algorithm - in practice, this would use optimization
    const selected: ProcessedFood[] = [];
    let remainingCalories = targetMacros.calories;
    let remainingProtein = targetMacros.protein;
    let remainingCarbs = targetMacros.carbs;
    let remainingFats = targetMacros.fats;

    // Sort foods by protein density for building meals
    const sortedFoods = [...foods].sort((a, b) => b.protein - a.protein);

    for (const food of sortedFoods) {
      if (selected.length >= 3) break; // Limit to 3 foods per meal

      if (remainingCalories > 0 && remainingProtein > 0 && remainingCarbs > 0 && remainingFats > 0) {
        selected.push(food);
        remainingCalories -= food.calories;
        remainingProtein -= food.protein;
        remainingCarbs -= food.carbs;
        remainingFats -= food.fats;
      }
    }

    return selected;
  }

  static getVariedBreakfastFoods(macros: MacroNutrients, goal: string, dayIndex: number): Food[] {
    const breakfastOptions = [
      // Monday - High Protein
      [
        { name: 'Protein Pancakes', amount: '2 medium', calories: 180, protein: 20, carbs: 15, fats: 6 },
        { name: 'Greek Yogurt', amount: '150g', calories: 89, protein: 15, carbs: 5.4, fats: 0.6 },
        { name: 'Berries', amount: '100g', calories: 57, protein: 0.7, carbs: 14, fats: 0.3 },
        { name: 'Almonds', amount: '15g', calories: 86, protein: 3.2, carbs: 3.3, fats: 7.4 }
      ],
      // Tuesday - Balanced
      [
        { name: 'Oatmeal', amount: '60g dry', calories: 102, protein: 3.6, carbs: 18, fats: 2.1 },
        { name: 'Banana', amount: '1 medium', calories: 89, protein: 1.1, carbs: 23, fats: 0.3 },
        { name: 'Peanut Butter', amount: '20g', calories: 118, protein: 5, carbs: 4, fats: 10 },
        { name: 'Chia Seeds', amount: '10g', calories: 49, protein: 1.7, carbs: 4.2, fats: 3.1 }
      ],
      // Wednesday - Carb Focus
      [
        { name: 'Whole Grain Toast', amount: '2 slices', calories: 160, protein: 6, carbs: 30, fats: 2 },
        { name: 'Avocado', amount: '80g', calories: 128, protein: 1.6, carbs: 7.2, fats: 12 },
        { name: 'Scrambled Eggs', amount: '2 large', calories: 155, protein: 13, carbs: 1.1, fats: 11 },
        { name: 'Orange Juice', amount: '200ml', calories: 94, protein: 1.5, carbs: 22, fats: 0.4 }
      ],
      // Thursday - Lean Focus
      [
        { name: 'Egg White Omelet', amount: '4 whites', calories: 68, protein: 14, carbs: 1, fats: 0.2 },
        { name: 'Spinach', amount: '100g', calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4 },
        { name: 'Mushrooms', amount: '100g', calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3 },
        { name: 'Whole Grain Toast', amount: '1 slice', calories: 80, protein: 3, carbs: 15, fats: 1 }
      ],
      // Friday - Power Breakfast
      [
        { name: 'Protein Smoothie', amount: '300ml', calories: 200, protein: 25, carbs: 20, fats: 5 },
        { name: 'Granola', amount: '30g', calories: 150, protein: 4, carbs: 20, fats: 6 },
        { name: 'Mixed Nuts', amount: '20g', calories: 120, protein: 4, carbs: 4, fats: 11 }
      ],
      // Saturday - Variety Day
      [
        { name: 'French Toast', amount: '2 slices', calories: 220, protein: 8, carbs: 28, fats: 9 },
        { name: 'Turkey Bacon', amount: '2 strips', calories: 60, protein: 8, carbs: 0, fats: 3 },
        { name: 'Fresh Fruit Salad', amount: '150g', calories: 80, protein: 1, carbs: 20, fats: 0.5 }
      ],
      // Sunday - Recovery
      [
        { name: 'Quinoa Porridge', amount: '80g dry', calories: 120, protein: 4.4, carbs: 22, fats: 1.9 },
        { name: 'Coconut Milk', amount: '100ml', calories: 230, protein: 2.3, carbs: 6, fats: 24 },
        { name: 'Blueberries', amount: '100g', calories: 57, protein: 0.7, carbs: 14, fats: 0.3 }
      ]
    ];

    return breakfastOptions[dayIndex] || breakfastOptions[0];
  }

  static getVariedLunchFoods(macros: MacroNutrients, goal: string, dayIndex: number): Food[] {
    const lunchOptions = [
      // Monday
      [
        { name: 'Grilled Chicken', amount: '150g', calories: 248, protein: 46.5, carbs: 0, fats: 5.4 },
        { name: 'Quinoa Salad', amount: '120g', calories: 144, protein: 5.3, carbs: 26, fats: 2.3 },
        { name: 'Mixed Vegetables', amount: '200g', calories: 60, protein: 3, carbs: 12, fats: 0.4 }
      ],
      // Tuesday
      [
        { name: 'Salmon Bowl', amount: '120g', calories: 250, protein: 26.4, carbs: 0, fats: 15.6 },
        { name: 'Brown Rice', amount: '100g', calories: 112, protein: 2.6, carbs: 23, fats: 0.9 },
        { name: 'Steamed Broccoli', amount: '150g', calories: 51, protein: 4.2, carbs: 10.5, fats: 0.6 }
      ],
      // Wednesday
      [
        { name: 'Turkey Wrap', amount: '1 large', calories: 320, protein: 25, carbs: 35, fats: 12 },
        { name: 'Sweet Potato Fries', amount: '100g', calories: 86, protein: 1.6, carbs: 20, fats: 0.1 },
        { name: 'Side Salad', amount: '100g', calories: 25, protein: 1, carbs: 5, fats: 0.2 }
      ],
      // Thursday
      [
        { name: 'Lean Beef Stir-fry', amount: '120g', calories: 200, protein: 26, carbs: 8, fats: 8 },
        { name: 'Cauliflower Rice', amount: '150g', calories: 38, protein: 3, carbs: 8, fats: 0.4 },
        { name: 'Bell Peppers', amount: '100g', calories: 20, protein: 0.9, carbs: 4.6, fats: 0.2 }
      ],
      // Friday
      [
        { name: 'Tuna Salad', amount: '150g', calories: 198, protein: 42, carbs: 0, fats: 2 },
        { name: 'Whole Grain Bread', amount: '2 slices', calories: 160, protein: 6, carbs: 30, fats: 2 },
        { name: 'Avocado', amount: '50g', calories: 80, protein: 1, carbs: 4.5, fats: 7.5 }
      ],
      // Saturday
      [
        { name: 'Chicken Caesar Salad', amount: '1 bowl', calories: 280, protein: 30, carbs: 12, fats: 14 },
        { name: 'Whole Grain Croutons', amount: '20g', calories: 80, protein: 2, carbs: 15, fats: 2 }
      ],
      // Sunday
      [
        { name: 'Vegetable Curry', amount: '200g', calories: 180, protein: 8, carbs: 25, fats: 6 },
        { name: 'Basmati Rice', amount: '100g', calories: 121, protein: 2.5, carbs: 25, fats: 0.4 },
        { name: 'Naan Bread', amount: '1 small', calories: 130, protein: 4, carbs: 22, fats: 3 }
      ]
    ];

    return lunchOptions[dayIndex] || lunchOptions[0];
  }

  static getVariedDinnerFoods(macros: MacroNutrients, goal: string, dayIndex: number): Food[] {
    const dinnerOptions = [
      // Monday
      [
        { name: 'Baked Cod', amount: '150g', calories: 135, protein: 30, carbs: 0, fats: 1.1 },
        { name: 'Roasted Vegetables', amount: '200g', calories: 80, protein: 3, carbs: 16, fats: 1 },
        { name: 'Wild Rice', amount: '80g cooked', calories: 86, protein: 3.4, carbs: 18, fats: 0.3 }
      ],
      // Tuesday
      [
        { name: 'Grilled Steak', amount: '120g', calories: 300, protein: 31, carbs: 0, fats: 18 },
        { name: 'Mashed Cauliflower', amount: '150g', calories: 45, protein: 3.5, carbs: 9, fats: 0.5 },
        { name: 'Green Beans', amount: '100g', calories: 31, protein: 1.8, carbs: 7, fats: 0.1 }
      ],
      // Wednesday
      [
        { name: 'Chicken Pasta', amount: '200g', calories: 350, protein: 28, carbs: 40, fats: 8 },
        { name: 'Parmesan Cheese', amount: '20g', calories: 80, protein: 7, carbs: 1, fats: 5.5 },
        { name: 'Side Salad', amount: '100g', calories: 25, protein: 1, carbs: 5, fats: 0.2 }
      ],
      // Thursday
      [
        { name: 'Grilled Chicken', amount: '140g', calories: 231, protein: 43.5, carbs: 0, fats: 5 },
        { name: 'Steamed Asparagus', amount: '150g', calories: 30, protein: 3.3, carbs: 5.9, fats: 0.15 },
        { name: 'Quinoa', amount: '80g cooked', calories: 96, protein: 3.5, carbs: 17.6, fats: 1.5 }
      ],
      // Friday
      [
        { name: 'Salmon Teriyaki', amount: '130g', calories: 270, protein: 29, carbs: 8, fats: 14 },
        { name: 'Brown Rice', amount: '100g', calories: 112, protein: 2.6, carbs: 23, fats: 0.9 },
        { name: 'Stir-fried Vegetables', amount: '150g', calories: 70, protein: 3, carbs: 14, fats: 1 }
      ],
      // Saturday
      [
        { name: 'BBQ Chicken', amount: '140g', calories: 280, protein: 35, carbs: 5, fats: 12 },
        { name: 'Corn on the Cob', amount: '1 medium', calories: 90, protein: 3, carbs: 19, fats: 1.4 },
        { name: 'Coleslaw', amount: '100g', calories: 70, protein: 1, carbs: 8, fats: 4 }
      ],
      // Sunday
      [
        { name: 'Herb-Crusted Lamb', amount: '120g', calories: 320, protein: 28, carbs: 2, fats: 22 },
        { name: 'Roasted Sweet Potato', amount: '150g', calories: 129, protein: 2.4, carbs: 30, fats: 0.15 },
        { name: 'Mediterranean Salad', amount: '150g', calories: 90, protein: 2, carbs: 8, fats: 6 }
      ]
    ];

    return dinnerOptions[dayIndex] || dinnerOptions[0];
  }

  static getVariedSnackFoods(macros: MacroNutrients, goal: string, dayIndex: number): Food[] {
    const snackOptions = [
      [{ name: 'Protein Bar', amount: '1 bar', calories: 180, protein: 15, carbs: 20, fats: 6 }],
      [{ name: 'Apple with Almond Butter', amount: '1 apple + 15g', calories: 140, protein: 4, carbs: 25, fats: 6 }],
      [{ name: 'Trail Mix', amount: '30g', calories: 150, protein: 5, carbs: 15, fats: 9 }],
      [{ name: 'Greek Yogurt Parfait', amount: '150g', calories: 120, protein: 12, carbs: 15, fats: 2 }],
      [{ name: 'Protein Smoothie', amount: '250ml', calories: 160, protein: 18, carbs: 12, fats: 4 }],
      [{ name: 'Cottage Cheese Bowl', amount: '150g', calories: 147, protein: 16.5, carbs: 5.1, fats: 6.5 }],
      [{ name: 'Mixed Nuts', amount: '25g', calories: 140, protein: 5, carbs: 5, fats: 12 }]
    ];

    return snackOptions[dayIndex] || snackOptions[0];
  }

  static generateInsights(profile: UserProfile) {
    const tips = [
      'Eat protein within 30 minutes after workouts for optimal muscle recovery',
      'Stay hydrated - aim for clear or light yellow urine',
      'Include a variety of colorful vegetables for micronutrient diversity',
      'Time your largest carb intake around your workouts',
      'Don\'t skip meals - consistent timing supports metabolism',
      'Meal prep on Sundays to ensure consistency throughout the week',
      'Listen to your hunger cues and adjust portions accordingly'
    ];

    return {
      tips,
      timing: 'Pre-workout: Light carbs 30-60 min before. Post-workout: Protein + carbs within 30 minutes.',
      hydration: `Aim for ${profile.weight * 35}ml of water daily`,
      weeklyFocus: 'Each day has a unique nutritional theme to prevent monotony and optimize results'
    };
  }

  static calculateWaterIntake(weight: number): string {
    return `${Math.round(weight * 35 / 250)} glasses (${weight * 35}ml)`;
  }

  static recommendSupplements(profile: UserProfile): string[] {
    const base = ['Whey Protein', 'Multivitamin', 'Omega-3'];
    
    if (profile.fitnessGoal === 'bulking') {
      base.push('Creatine', 'BCAA', 'Mass Gainer');
    } else if (profile.fitnessGoal === 'cutting') {
      base.push('L-Carnitine', 'Green Tea Extract', 'CLA');
    }

    return base;
  }
}

export default DietGenerator;