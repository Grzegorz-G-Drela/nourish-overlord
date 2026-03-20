const profileForm = document.querySelector('#profile-form');
const username = document.querySelector('#username');
const gender = document.querySelector('#gender');
const age = document.querySelector('#age');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const goal = document.querySelector('#goal');
const activityLevel = document.querySelector('#activity-level');

const calorieTarget = document.querySelector('#calorie-target');
const caloriesConsumed = document.querySelector('#calories-consumed');
const caloriesBurned = document.querySelector('#calories-burned');
const caloriesRemaining = document.querySelector('#calories-remaining');

const mealForm = document.querySelector('#meal-form');
const mealInput = document.querySelector('#meal-input')

const activityForm = document.querySelector('#activity-form');
const activityType = document.querySelector('#activity-type');
const activityTime = document.querySelector('#activity-time');




function updateTotalCalories(profile) {
    const totalDailyCalories = calculateCalories(profile);
    calorieTarget.textContent = 'Daily Target: ' + totalDailyCalories + ' kcal';
}

let storedProfile = localStorage.getItem('profile');
let profile = JSON.parse(storedProfile) || {};
if (profile.username) {
    username.value = profile.username;
    gender.value = profile.gender;
    age.value = profile.age;
    weight.value = profile.weight;
    height.value = profile.height;
    goal.value = profile.goal;
    activityLevel.value = profile.activityLevel;

    updateTotalCalories(profile);
}

profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    profile = {};

    profile.username = username.value;
    profile.gender = gender.value;
    profile.age = age.value;
    profile.weight = weight.value;
    profile.height = height.value;
    profile.goal = goal.value;
    profile.activityLevel = activityLevel.value;

    localStorage.setItem('profile', JSON.stringify(profile));
    updateTotalCalories(profile);
    
});

mealForm.addEventListener('submit', (e) => {
    e.preventDefault();
    meal = {};

    mealInput // send whole to the AI and let it figure out what it is
                    // if not recognized, send the msg back
})