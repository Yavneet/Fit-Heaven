/* FitHeaven - Exercise Data
   Comprehensive exercise library with filtering and categorization
   Includes gym and outdoor exercises with calorie estimates
*/

const FH_EXERCISE_DATA = {
  // Exercise categories and data
  exercises: [
    // Full Body Exercises
    {
      id: "burpees",
      name: "Burpees",
      bodyPart: "Full Body",
      mode: "Gym",
      calories: 10, // per minute
      difficulty: "Hard",
      description: "Full-body explosive exercise combining squat, push-up, and jump",
      instructions: [
        "Start in standing position",
        "Drop into squat position and place hands on floor",
        "Jump feet back into plank position",
        "Perform push-up",
        "Jump feet back to squat position",
        "Jump up with arms overhead"
      ],
      equipment: "None",
      icon: "🏃‍♂️"
    },
    {
      id: "mountain_climbers",
      name: "Mountain Climbers",
      bodyPart: "Full Body",
      mode: "Gym",
      calories: 8,
      difficulty: "Medium",
      description: "High-intensity cardio exercise targeting core and legs",
      instructions: [
        "Start in plank position",
        "Bring right knee to chest",
        "Quickly switch legs",
        "Continue alternating at fast pace"
      ],
      equipment: "None",
      icon: "🏔️"
    },
    {
      id: "jumping_jacks",
      name: "Jumping Jacks",
      bodyPart: "Full Body",
      mode: "Gym",
      calories: 6,
      difficulty: "Easy",
      description: "Classic cardio exercise for warm-up and conditioning",
      instructions: [
        "Stand with feet together, arms at sides",
        "Jump up spreading feet shoulder-width apart",
        "Raise arms overhead",
        "Jump back to starting position"
      ],
      equipment: "None",
      icon: "🤸‍♂️"
    },

    // Chest Exercises
    {
      id: "push_ups",
      name: "Push-ups",
      bodyPart: "Chest",
      mode: "Gym",
      calories: 7,
      difficulty: "Medium",
      description: "Classic bodyweight exercise for chest, shoulders, and triceps",
      instructions: [
        "Start in plank position",
        "Lower body until chest nearly touches floor",
        "Push back up to starting position",
        "Keep core tight throughout"
      ],
      equipment: "None",
      icon: "💪"
    },
    {
      id: "bench_press",
      name: "Bench Press",
      bodyPart: "Chest",
      mode: "Gym",
      calories: 8,
      difficulty: "Medium",
      description: "Compound exercise for chest, shoulders, and triceps",
      instructions: [
        "Lie on bench with feet flat on floor",
        "Grip bar slightly wider than shoulders",
        "Lower bar to chest with control",
        "Press bar up to starting position"
      ],
      equipment: "Barbell, Bench",
      icon: "🏋️‍♂️"
    },
    {
      id: "chest_flyes",
      name: "Chest Flyes",
      bodyPart: "Chest",
      mode: "Gym",
      calories: 6,
      difficulty: "Easy",
      description: "Isolation exercise targeting chest muscles",
      instructions: [
        "Lie on bench holding dumbbells",
        "Start with arms extended over chest",
        "Lower weights in wide arc",
        "Bring weights back together over chest"
      ],
      equipment: "Dumbbells, Bench",
      icon: "🦋"
    },

    // Back Exercises
    {
      id: "pull_ups",
      name: "Pull-ups",
      bodyPart: "Back",
      mode: "Gym",
      calories: 9,
      difficulty: "Hard",
      description: "Upper body pulling exercise for back and biceps",
      instructions: [
        "Hang from pull-up bar with overhand grip",
        "Pull body up until chin clears bar",
        "Lower with control to starting position",
        "Keep core engaged throughout"
      ],
      equipment: "Pull-up Bar",
      icon: "🆙"
    },
    {
      id: "deadlifts",
      name: "Deadlifts",
      bodyPart: "Back",
      mode: "Gym",
      calories: 12,
      difficulty: "Hard",
      description: "Compound exercise targeting posterior chain",
      instructions: [
        "Stand with feet hip-width apart",
        "Bend at hips and knees to grip bar",
        "Keep back straight and chest up",
        "Stand up by extending hips and knees"
      ],
      equipment: "Barbell",
      icon: "⚡"
    },
    {
      id: "rows",
      name: "Bent-over Rows",
      bodyPart: "Back",
      mode: "Gym",
      calories: 8,
      difficulty: "Medium",
      description: "Compound pulling exercise for back muscles",
      instructions: [
        "Stand with feet hip-width apart",
        "Bend forward at hips with slight knee bend",
        "Pull weight to lower chest/upper abdomen",
        "Squeeze shoulder blades together"
      ],
      equipment: "Barbell or Dumbbells",
      icon: "🚣‍♂️"
    },

    // Arms Exercises
    {
      id: "bicep_curls",
      name: "Bicep Curls",
      bodyPart: "Arms",
      mode: "Gym",
      calories: 5,
      difficulty: "Easy",
      description: "Isolation exercise for bicep muscles",
      instructions: [
        "Stand with feet shoulder-width apart",
        "Hold weights with arms at sides",
        "Curl weights up to shoulders",
        "Lower with control"
      ],
      equipment: "Dumbbells",
      icon: "💪"
    },
    {
      id: "tricep_dips",
      name: "Tricep Dips",
      bodyPart: "Arms",
      mode: "Gym",
      calories: 7,
      difficulty: "Medium",
      description: "Bodyweight exercise targeting triceps",
      instructions: [
        "Sit on edge of bench or chair",
        "Place hands beside hips",
        "Lower body by bending elbows",
        "Push back up to starting position"
      ],
      equipment: "Bench or Chair",
      icon: "⬇️"
    },
    {
      id: "hammer_curls",
      name: "Hammer Curls",
      bodyPart: "Arms",
      mode: "Gym",
      calories: 5,
      difficulty: "Easy",
      description: "Variation of bicep curl targeting different muscle fibers",
      instructions: [
        "Hold dumbbells with neutral grip",
        "Keep elbows close to body",
        "Curl weights up to shoulders",
        "Lower with control"
      ],
      equipment: "Dumbbells",
      icon: "🔨"
    },

    // Legs Exercises
    {
      id: "squats",
      name: "Squats",
      bodyPart: "Legs",
      mode: "Gym",
      calories: 8,
      difficulty: "Medium",
      description: "Fundamental lower body exercise",
      instructions: [
        "Stand with feet shoulder-width apart",
        "Lower body as if sitting back in chair",
        "Keep knees behind toes",
        "Return to standing position"
      ],
      equipment: "None",
      icon: "🦵"
    },
    {
      id: "lunges",
      name: "Lunges",
      bodyPart: "Legs",
      mode: "Gym",
      calories: 7,
      difficulty: "Medium",
      description: "Single-leg exercise for legs and glutes",
      instructions: [
        "Step forward with one leg",
        "Lower back knee toward ground",
        "Push back to starting position",
        "Alternate legs"
      ],
      equipment: "None",
      icon: "🚶‍♂️"
    },
    {
      id: "leg_press",
      name: "Leg Press",
      bodyPart: "Legs",
      mode: "Gym",
      calories: 10,
      difficulty: "Medium",
      description: "Machine exercise for quadriceps and glutes",
      instructions: [
        "Sit in leg press machine",
        "Place feet shoulder-width apart on platform",
        "Lower weight with control",
        "Press back to starting position"
      ],
      equipment: "Leg Press Machine",
      icon: "🦵"
    },

    // Shoulders Exercises
    {
      id: "shoulder_press",
      name: "Shoulder Press",
      bodyPart: "Shoulders",
      mode: "Gym",
      calories: 7,
      difficulty: "Medium",
      description: "Overhead pressing exercise for shoulders",
      instructions: [
        "Sit or stand with weights at shoulder level",
        "Press weights straight up overhead",
        "Lower with control to starting position",
        "Keep core engaged"
      ],
      equipment: "Dumbbells",
      icon: "⬆️"
    },
    {
      id: "lateral_raises",
      name: "Lateral Raises",
      bodyPart: "Shoulders",
      mode: "Gym",
      calories: 5,
      difficulty: "Easy",
      description: "Isolation exercise for shoulder deltoids",
      instructions: [
        "Hold weights at sides with slight bend in elbows",
        "Raise arms out to sides to shoulder height",
        "Lower with control",
        "Keep movement controlled"
      ],
      equipment: "Dumbbells",
      icon: "✋"
    },
    {
      id: "front_raises",
      name: "Front Raises",
      bodyPart: "Shoulders",
      mode: "Gym",
      calories: 5,
      difficulty: "Easy",
      description: "Isolation exercise for front deltoids",
      instructions: [
        "Hold weights in front of thighs",
        "Raise weights to shoulder height",
        "Lower with control",
        "Keep slight bend in elbows"
      ],
      equipment: "Dumbbells",
      icon: "🖐️"
    },

    // Core Exercises
    {
      id: "plank",
      name: "Plank",
      bodyPart: "Core",
      mode: "Gym",
      calories: 4,
      difficulty: "Medium",
      description: "Isometric exercise for core stability",
      instructions: [
        "Start in push-up position",
        "Lower to forearms",
        "Keep body in straight line",
        "Hold position while breathing normally"
      ],
      equipment: "None",
      icon: "📏"
    },
    {
      id: "crunches",
      name: "Crunches",
      bodyPart: "Core",
      mode: "Gym",
      calories: 5,
      difficulty: "Easy",
      description: "Basic abdominal exercise",
      instructions: [
        "Lie on back with knees bent",
        "Place hands behind head",
        "Lift shoulders off ground",
        "Lower with control"
      ],
      equipment: "None",
      icon: "🔄"
    },
    {
      id: "russian_twists",
      name: "Russian Twists",
      bodyPart: "Core",
      mode: "Gym",
      calories: 6,
      difficulty: "Medium",
      description: "Rotational core exercise",
      instructions: [
        "Sit with knees bent, feet off ground",
        "Lean back slightly",
        "Rotate torso side to side",
        "Keep core engaged throughout"
      ],
      equipment: "None (optional: weight)",
      icon: "🌪️"
    },

    // Cardio Exercises
    {
      id: "running",
      name: "Running",
      bodyPart: "Cardio",
      mode: "Outdoor",
      calories: 12,
      difficulty: "Medium",
      description: "High-intensity cardiovascular exercise",
      instructions: [
        "Start with proper running form",
        "Maintain steady pace",
        "Land on forefoot",
        "Keep posture upright"
      ],
      equipment: "Running Shoes",
      icon: "🏃‍♂️"
    },
    {
      id: "cycling",
      name: "Cycling",
      bodyPart: "Cardio",
      mode: "Outdoor",
      calories: 10,
      difficulty: "Medium",
      description: "Low-impact cardiovascular exercise",
      instructions: [
        "Adjust seat height properly",
        "Maintain steady cadence",
        "Keep core engaged",
        "Use proper breathing technique"
      ],
      equipment: "Bicycle",
      icon: "🚴‍♂️"
    },
    {
      id: "swimming",
      name: "Swimming",
      bodyPart: "Cardio",
      mode: "Outdoor",
      calories: 11,
      difficulty: "Medium",
      description: "Full-body low-impact exercise",
      instructions: [
        "Choose appropriate stroke",
        "Maintain steady breathing",
        "Keep body streamlined",
        "Use proper technique"
      ],
      equipment: "Swimsuit, Goggles",
      icon: "🏊‍♂️"
    },
    {
      id: "hiking",
      name: "Hiking",
      bodyPart: "Cardio",
      mode: "Outdoor",
      calories: 8,
      difficulty: "Easy",
      description: "Moderate-intensity outdoor activity",
      instructions: [
        "Wear appropriate footwear",
        "Maintain steady pace",
        "Stay hydrated",
        "Be aware of surroundings"
      ],
      equipment: "Hiking Boots, Water",
      icon: "🥾"
    },
    {
      id: "jump_rope",
      name: "Jump Rope",
      bodyPart: "Cardio",
      mode: "Gym",
      calories: 12,
      difficulty: "Medium",
      description: "High-intensity cardio and coordination exercise",
      instructions: [
        "Hold rope handles at hip level",
        "Jump with both feet together",
        "Keep elbows close to body",
        "Land softly on balls of feet"
      ],
      equipment: "Jump Rope",
      icon: "🪢"
    },

    // Yoga & Flexibility
    {
      id: "yoga",
      name: "Yoga",
      bodyPart: "Full Body",
      mode: "Gym",
      calories: 4,
      difficulty: "Easy",
      description: "Mind-body practice combining poses and breathing",
      instructions: [
        "Start with basic poses",
        "Focus on breathing",
        "Hold poses with proper alignment",
        "Listen to your body"
      ],
      equipment: "Yoga Mat",
      icon: "🧘‍♀️"
    },
    {
      id: "stretching",
      name: "Stretching",
      bodyPart: "Full Body",
      mode: "Gym",
      calories: 2,
      difficulty: "Easy",
      description: "Flexibility and mobility exercises",
      instructions: [
        "Hold each stretch for 30 seconds",
        "Don't bounce",
        "Breathe deeply",
        "Stretch to point of mild tension"
      ],
      equipment: "None",
      icon: "🤸‍♀️"
    }
  ],

  // Filter functions
  getByBodyPart(bodyPart) {
    if (!bodyPart || bodyPart === "All") return this.exercises;
    return this.exercises.filter(exercise => exercise.bodyPart === bodyPart);
  },

  getByMode(mode) {
    if (!mode || mode === "All") return this.exercises;
    return this.exercises.filter(exercise => exercise.mode === mode);
  },

  getByDifficulty(difficulty) {
    if (!difficulty || difficulty === "All") return this.exercises;
    return this.exercises.filter(exercise => exercise.difficulty === difficulty);
  },

  search(query) {
    if (!query) return this.exercises;
    const lowercaseQuery = query.toLowerCase();
    return this.exercises.filter(exercise => 
      exercise.name.toLowerCase().includes(lowercaseQuery) ||
      exercise.description.toLowerCase().includes(lowercaseQuery) ||
      exercise.bodyPart.toLowerCase().includes(lowercaseQuery)
    );
  },

  // Combined filtering
  filter(filters = {}) {
    let results = this.exercises;

    if (filters.bodyPart && filters.bodyPart !== "All") {
      results = results.filter(exercise => exercise.bodyPart === filters.bodyPart);
    }

    if (filters.mode && filters.mode !== "All") {
      results = results.filter(exercise => exercise.mode === filters.mode);
    }

    if (filters.difficulty && filters.difficulty !== "All") {
      results = results.filter(exercise => exercise.difficulty === filters.difficulty);
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      results = results.filter(exercise => 
        exercise.name.toLowerCase().includes(query) ||
        exercise.description.toLowerCase().includes(query) ||
        exercise.bodyPart.toLowerCase().includes(query)
      );
    }

    return results;
  },

  // Get unique values for dropdowns
  getBodyParts() {
    const parts = [...new Set(this.exercises.map(ex => ex.bodyPart))];
    return parts.sort();
  },

  getModes() {
    const modes = [...new Set(this.exercises.map(ex => ex.mode))];
    return modes.sort();
  },

  getDifficulties() {
    const difficulties = [...new Set(this.exercises.map(ex => ex.difficulty))];
    return difficulties.sort();
  },

  // Get exercise by ID
  getById(id) {
    return this.exercises.find(exercise => exercise.id === id);
  },

  // Get random exercises
  getRandom(count = 5) {
    const shuffled = [...this.exercises].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FH_EXERCISE_DATA;
} else {
  window.FH_EXERCISE_DATA = FH_EXERCISE_DATA;
}