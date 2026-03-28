const profileForm = document.querySelector('#profile-form');
const username = document.querySelector('#username');
const gender = document.querySelector('#gender');
const age = document.querySelector('#age');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const goal = document.querySelector('#goal');
const activityLevel = document.querySelector('#activity-level');

const calorieTarget = document.querySelector('#calorie-target span');
const caloriesConsumed = document.querySelector('#calories-consumed span');
const caloriesBurned = document.querySelector('#calories-burned span');
const caloriesRemaining = document.querySelector('#calories-remaining span');

const mealForm = document.querySelector('#meal-form');
const mealInput = document.querySelector('#meal-input')
const reactionText = document.querySelector('#reaction-text');

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
    const mealDescription = mealInput.value;
    // console.log(mealDescription);

    fetch('http://localhost:3000/api/meal', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ mealDescription }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.reaction);
            console.log(JSON.stringify(data.reaction));
            let items = data.items;
            let totalCalories = 0;
            let totalFat = 0;
            let totalCarbohydrates = 0;
            let totalProteins = 0;

            items.forEach(item => {
                totalCalories += item.calories;
                totalFat += item.fat_total_g;
                totalCarbohydrates += item.carbohydrates_total_g;
                totalProteins += item.protein_g;
            });
            
            caloriesConsumed.textContent = totalCalories;
            reactionText.textContent = data.reaction;
        })
    });
    
    