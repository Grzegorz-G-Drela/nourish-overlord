// 

const form = document.querySelector('form');
const username = document.querySelector('#username');
const gender = document.querySelector('#gender');
const age = document.querySelector('#age');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const goal = document.querySelector('#goal');
const activityLevel = document.querySelector('#activity-level');
const calorieTarget = document.querySelector('#calorie-target');

const fields = ['username', 'gender', 'age', 'weight', 'height', 'goal', 'activityLevel'];

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

    fields.forEach(field => {
        field.value = profile[field];
    })

    updateTotalCalories(profile);
}

form.addEventListener('submit', (e) => {
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
    console.log(totalDailyCalories);
    
});
