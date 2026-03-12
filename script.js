// FitHeaven Global Script - Shared functionality across all pages
(function() {
  'use strict';

  // Constants
  const THEME_KEY = 'fh_theme';
  const POINTS_KEY = 'fh_points';
  const STREAK_KEY = 'fh_streak';
  const LAST_SEEN_KEY = 'fh_last_seen';
  const MEMBERSHIP_KEY = 'fh_membership';
  const CALORIES_KEY = 'fh_total_calories';
  const WORKOUTS_KEY = 'fh_workouts';
  const SCHEDULE_KEY = 'fh_schedule';
  const REDEEMED_REWARDS_KEY = 'fh_redeemed_rewards';

  // Motivational quotes
  const MOTIVATIONAL_QUOTES = [
    "The only bad workout is the one that didn't happen.",
    "Your body can do it. It's your mind you have to convince.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "The groundwork for all happiness is good health.",
    "Take care of your body. It's the only place you have to live.",
    "Success isn't always about greatness. It's about consistency.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Don't wish for it, work for it.",
    "Your health is an investment, not an expense.",
    "The body achieves what the mind believes.",
    "Every expert was once a beginner.",
    "Progress, not perfection.",
    "You don't have to be great to get started, but you have to get started to be great.",
    "The secret of getting ahead is getting started.",
    "Believe you can and you're halfway there.",
    "It's not about perfect. It's about effort.",
    "Champions keep playing until they get it right.",
    "The only way to do great work is to love what you do.",
    "Success is the sum of small efforts repeated day in and day out.",
    "You are stronger than you think."
  ];

  // Utility functions
  function getNumber(key, defaultValue = 0) {
    const value = localStorage.getItem(key);
    return value ? parseInt(value, 10) : defaultValue;
  }

  function setNumber(key, value) {
    localStorage.setItem(key, String(value));
  }

  function todayStr() {
    return new Date().toISOString().split('T')[0];
  }

  function dateDiffInDays(dateStr1, dateStr2) {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Theme management
  function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-bs-theme', saved);
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.checked = saved === 'light';
  }

  function wireThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('change', () => {
      const mode = toggle.checked ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', mode);
      localStorage.setItem(THEME_KEY, mode);
    });
  }

  // Live clock
  function startClock() {
    const dateEl = document.getElementById('liveDate');
    const timeEl = document.getElementById('liveTime');
    
    function tick() {
      const now = new Date();
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      }
    }
    
    tick();
    setInterval(tick, 1000);
  }

  // Points management
  function addPoints(amount) {
    const current = getNumber(POINTS_KEY, 0);
    const membership = localStorage.getItem(MEMBERSHIP_KEY) || 'free';
    let multiplier = 1;
    
    if (membership === 'premium') multiplier = 2;
    else if (membership === 'pro') multiplier = 3;
    
    const newTotal = current + (amount * multiplier);
    setNumber(POINTS_KEY, newTotal);
    return newTotal;
  }

  function getPoints() {
    return getNumber(POINTS_KEY, 0);
  }

  function spendPoints(amount) {
    const current = getNumber(POINTS_KEY, 0);
    if (current >= amount) {
      setNumber(POINTS_KEY, current - amount);
      return true;
    }
    return false;
  }

  // Streak management
  function updateDailyStreak() {
    const lastSeen = localStorage.getItem(LAST_SEEN_KEY);
    const today = todayStr();
    let streak = getNumber(STREAK_KEY, 0);

    if (!lastSeen) {
      streak = Math.max(streak, 1);
    } else {
      const gap = dateDiffInDays(lastSeen, today);
      if (gap === 1) {
        streak = streak + 1;
      } else if (gap > 1) {
        streak = 1; // reset and count today
      }
    }

    localStorage.setItem(LAST_SEEN_KEY, today);
    setNumber(STREAK_KEY, streak);
    
    // Award streak milestones
    awardStreakMilestones(streak);
    
    return streak;
  }

  function awardStreakMilestones(streak) {
    const milestones = [7, 30, 50, 100, 365];
    const rewards = [20, 100, 150, 200, 500];
    
    milestones.forEach((milestone, index) => {
      const key = `streak_${milestone}_awarded`;
      if (streak >= milestone && !localStorage.getItem(key)) {
        addPoints(rewards[index]);
        localStorage.setItem(key, 'true');
        
        // Special effects for major milestones
        if (milestone >= 100) {
          showConfetti();
        }
        
        showToast(`🎉 ${milestone}-day streak milestone! +${rewards[index]} FitPoints!`, 'success');
      }
    });
  }

  // Calories management
  function addCalories(amount) {
    const current = getNumber(CALORIES_KEY, 0);
    const newTotal = current + amount;
    setNumber(CALORIES_KEY, newTotal);
    return newTotal;
  }

  function getCalories() {
    return getNumber(CALORIES_KEY, 0);
  }

  // Membership management
  function setMembership(plan) {
    localStorage.setItem(MEMBERSHIP_KEY, plan);
    updateMembershipUI();
  }

  function getMembership() {
    return localStorage.getItem(MEMBERSHIP_KEY) || 'free';
  }

  function updateMembershipUI() {
    const membership = getMembership();
    const badge = document.getElementById('currentPlanBadge');
    const status = document.getElementById('currentPlanStatus');
    
    if (badge) {
      const planNames = {
        'free': 'Free Plan',
        'premium': 'Premium Plan',
        'pro': 'Pro Plan'
      };
      badge.textContent = planNames[membership] || 'Free Plan';
    }
    
    if (status) {
      const planDescriptions = {
        'free': "You're currently on the Free plan. Upgrade to unlock premium features!",
        'premium': "You're enjoying Premium benefits! 2x FitPoints multiplier active.",
        'pro': "You're on the Pro plan! 3x FitPoints multiplier and all premium features active."
      };
      const description = status.querySelector('p');
      if (description) {
        description.textContent = planDescriptions[membership] || planDescriptions['free'];
      }
    }
  }

  // Motivational quotes
  function getRandomQuote() {
    const lastQuote = localStorage.getItem('fh_last_quote');
    const lastDate = localStorage.getItem('fh_quote_date');
    const today = todayStr();
    
    // Get new quote if it's a new day
    if (lastDate !== today) {
      let newQuote;
      do {
        newQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
      } while (newQuote === lastQuote && MOTIVATIONAL_QUOTES.length > 1);
      
      localStorage.setItem('fh_last_quote', newQuote);
      localStorage.setItem('fh_quote_date', today);
      return newQuote;
    }
    
    return lastQuote || MOTIVATIONAL_QUOTES[0];
  }

  // Toast notifications
  function showToast(message, type = 'info', duration = 5000) {
    // Create toast element
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    const toastId = 'toast_' + Date.now();
    
    const toastHTML = `
      <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">${getToastIcon(type)}</strong>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${message}
        </div>
      </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    // Show toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: duration });
    toast.show();
    
    // Remove element after hiding
    toastElement.addEventListener('hidden.bs.toast', () => {
      toastElement.remove();
    });
  }

  function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
  }

  function getToastIcon(type) {
    const icons = {
      'success': '🎉',
      'error': '❌',
      'warning': '⚠️',
      'info': 'ℹ️'
    };
    return icons[type] || icons['info'];
  }

  // Confetti effect
  function showConfetti() {
    // Simple confetti effect using CSS animations
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${['#00ff99', '#007bff', '#ff6b6b', '#ffa500'][Math.floor(Math.random() * 4)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
      `;
      confetti.appendChild(piece);
    }
    
    document.body.appendChild(confetti);
    
    // Add CSS animation
    if (!document.getElementById('confetti-styles')) {
      const style = document.createElement('style');
      style.id = 'confetti-styles';
      style.textContent = `
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }

  // Workout management
  function addWorkout(workout) {
    const workouts = JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
    workout.id = Date.now().toString();
    workout.timestamp = new Date().toISOString();
    workouts.unshift(workout);
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
    return workout;
  }

  function getWorkouts() {
    return JSON.parse(localStorage.getItem(WORKOUTS_KEY) || '[]');
  }

  function deleteWorkout(workoutId) {
    const workouts = getWorkouts();
    const filtered = workouts.filter(w => w.id !== workoutId);
    localStorage.setItem(WORKOUTS_KEY, JSON.stringify(filtered));
    return filtered;
  }

  // Schedule management
  function addToSchedule(exercise) {
    const schedule = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]');
    const scheduleItem = {
      id: Date.now().toString(),
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      bodyPart: exercise.bodyPart,
      calories: exercise.calories,
      difficulty: exercise.difficulty,
      mode: exercise.mode,
      addedAt: new Date().toISOString()
    };
    schedule.push(scheduleItem);
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
    return scheduleItem;
  }

  function getSchedule() {
    return JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '[]');
  }

  function deleteFromSchedule(itemId) {
    const schedule = getSchedule();
    const filtered = schedule.filter(item => item.id !== itemId);
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(filtered));
    return filtered;
  }

  // Rewards management
  function redeemReward(rewardId, cost) {
    if (spendPoints(cost)) {
      const redeemed = JSON.parse(localStorage.getItem(REDEEMED_REWARDS_KEY) || '[]');
      redeemed.push({
        id: rewardId,
        cost: cost,
        redeemedAt: new Date().toISOString()
      });
      localStorage.setItem(REDEEMED_REWARDS_KEY, JSON.stringify(redeemed));
      return true;
    }
    return false;
  }

  function getRedeemedRewards() {
    return JSON.parse(localStorage.getItem(REDEEMED_REWARDS_KEY) || '[]');
  }

  // Statistics
  function getStats() {
    const workouts = getWorkouts();
    const totalWorkouts = workouts.length;
    const totalCalories = getCalories();
    const totalPoints = getPoints();
    const currentStreak = getNumber(STREAK_KEY, 0);
    
    return {
      totalWorkouts,
      totalCalories,
      totalPoints,
      currentStreak,
      membership: getMembership()
    };
  }

  // Initialize app
  function init() {
    loadTheme();
    wireThemeToggle();
    startClock();
    updateDailyStreak();
    updateMembershipUI();
  }

  // Export to global scope
  window.FH_GLOBALS = {
    // Constants
    THEME_KEY,
    POINTS_KEY,
    STREAK_KEY,
    LAST_SEEN_KEY,
    MEMBERSHIP_KEY,
    CALORIES_KEY,
    WORKOUTS_KEY,
    SCHEDULE_KEY,
    REDEEMED_REWARDS_KEY,
    
    // Utility functions
    getNumber,
    setNumber,
    todayStr,
    dateDiffInDays,
    
    // Theme
    loadTheme,
    wireThemeToggle,
    
    // Clock
    startClock,
    
    // Points
    addPoints,
    getPoints,
    spendPoints,
    
    // Streak
    updateDailyStreak,
    awardStreakMilestones,
    
    // Calories
    addCalories,
    getCalories,
    
    // Membership
    setMembership,
    getMembership,
    updateMembershipUI,
    
    // Quotes
    getRandomQuote,
    
    // UI
    showToast,
    showConfetti,
    
    // Workouts
    addWorkout,
    getWorkouts,
    deleteWorkout,
    
    // Schedule
    addToSchedule,
    getSchedule,
    deleteFromSchedule,
    
    // Rewards
    redeemReward,
    getRedeemedRewards,
    
    // Stats
    getStats,
    
    // Initialize
    init
  };

  // Auto-initialize if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();