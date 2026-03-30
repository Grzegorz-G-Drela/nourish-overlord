const profileForm = document.querySelector('#profile-form');
const username = document.querySelector('#username');
const gender = document.querySelector('#gender');
const age = document.querySelector('#age');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const goal = document.querySelector('#goal');
const activityLevel = document.querySelector('#activity-level');

const calorieTarget = document.querySelector('#calorie-target span:nth-child(2)');
const caloriesConsumed = document.querySelector('#calories-consumed span:nth-child(2)');
const fatConsumed = document.querySelector('#fat-consumed span:nth-child(2)');
const carbohydratesConsumed = document.querySelector('#carbohydrates-consumed span:nth-child(2)');
const proteinConsumed = document.querySelector('#protein-consumed span:nth-child(2)');
const caloriesBurned = document.querySelector('#calories-burned span:nth-child(2)');
const caloriesRemaining = document.querySelector('#calories-remaining span:nth-child(2)');

const mealForm = document.querySelector('#meal-form');
const mealInput = document.querySelector('#meal-input')
const reactionText = document.querySelector('#reaction-text');

const activityForm = document.querySelector('#activity-form');
const activityType = document.querySelector('#activity-type');
const activityTime = document.querySelector('#activity-time');




function updateTotalCalories(profile) {
    const totalDailyCalories = calculateCalories(profile);
    calorieTarget.textContent = Math.round(totalDailyCalories/50) * 50;
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
    const selectedPersona = document.querySelector('#overlord input[name="overlord"]:checked').value;

    fetch('http://localhost:3000/api/meal', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ mealDescription: mealDescription, persona: selectedPersona }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(selectedPersona);

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
            
            caloriesConsumed.textContent = Math.round(totalCalories);
            fatConsumed.textContent = Math.round(totalFat);
            carbohydratesConsumed.textContent = Math.round(totalCarbohydrates);
            proteinConsumed.textContent = Math.round(totalProteins);
            reactionText.textContent = data.reaction;
        })
    });
    
    