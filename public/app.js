// DOM SELECTORS ---------------------------------------------------------------------------------------

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

const overlordFieldset = document.querySelector('#overlord');
const mealForm = document.querySelector('#meal-form');
console.log('meal-form');
const mealInput = document.querySelector('#meal-input')
const mealSummaryList = document.querySelector('#meal-list');

const reactionText = document.querySelector('#reaction-text');

const activityForm = document.querySelector('#activity-form');
const activityType = document.querySelector('#activity-type');
const activityDuration = document.querySelector('#activity-duration');
const activityList = document.querySelector('#activity-list');

const saveBtn = document.querySelector('#save-btn');
const loadBtn = document.querySelector('#load-btn');
const fileInput = document.querySelector('#file-input');



// STATE -----------------------------------------------------------------------------------------------


let meals = JSON.parse(localStorage.getItem('meals')) || [];
meals.forEach((meal, index) => renderMealItem(meal, index));

let activities = JSON.parse(localStorage.getItem('activities')) || [];
activities.forEach(activity => renderActivityItem(activity));

let storedProfile = localStorage.getItem('profile');
let profile = JSON.parse(storedProfile) || {};



// RENDER -----------------------------------------------------------------------------------------------

function createDeleteBtn(index) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('data-index', index);
    return deleteBtn;
}

function renderMealItem(meal, index) {
    const li = document.createElement('li');
    li.textContent = `${meal.name} | ${meal.serving}g | ${Math.round(meal.calories)} kcal`;
    li.appendChild(createDeleteBtn(index));
    mealSummaryList.appendChild(li);
}

function renderActivityItem(activity) {
    const li = document.createElement('li');
    li.textContent = `${activity.date} | ${activity.name} | ${activity.duration} | ${activity.burned} kcal`;
    activityList.appendChild(li);
}

function renderDashboard(calories, fat, carbs, protein) {
    caloriesConsumed.textContent = calories;
    fatConsumed.textContent = fat;
    carbohydratesConsumed.textContent = carbs;
    proteinConsumed.textContent = protein;
    caloriesRemaining.textContent = Math.round(calorieTarget.textContent) - calories;
}

function refreshDashboard() {
    let totalCalories = 0, totalFat = 0, totalCarbs = 0, totalProtein = 0;
    meals.forEach(meal => {
        totalCalories += meal.calories;
        totalFat += meal.fat;
        totalCarbs += meal.carbs;
        totalProtein += meal.protein;
    });
    renderDashboard(totalCalories, totalFat, totalCarbs, totalProtein);
}



// RENDER -----------------------------------------------------------------------------------------------


function updateTotalCalories(profile) {
    const totalDailyCalories = calculateCalories(profile);
    calorieTarget.textContent = Math.round(totalDailyCalories / 50) * 50;
}

if (profile.username) {
    username.value = profile.username;
    gender.value = profile.gender;
    age.value = profile.age;
    weight.value = profile.weight;
    height.value = profile.height;
    goal.value = profile.goal;
    activityLevel.value = profile.activityLevel;

    updateTotalCalories(profile);
    refreshDashboard();
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



// RENDER -----------------------------------------------------------------------------------------------


overlordFieldset.addEventListener('change', (e) => {
    document.body.setAttribute('data-theme', e.target.value);
    reactionText.textContent = '';
});



// RENDER -----------------------------------------------------------------------------------------------

function onMealResponse(data) {
    data.items.forEach(meal => {
        meals.push({
            name: meal.name,
            calories: Math.round(meal.calories),
            carbs: Math.round(meal.carbohydrates_total_g),
            fat: Math.round(meal.fat_total_g),
            protein: Math.round(meal.protein_g),
            serving: meal.serving_size_g,
        });

        let index = meals.length - 1;
        renderMealItem(meals[index], index);
    });

    localStorage.setItem('meals', JSON.stringify(meals));
    refreshDashboard();
    reactionText.textContent = data.reaction;
}

mealForm.addEventListener('submit', (e) => {
    console.log('submitting');
    e.preventDefault();
    const mealDescription = mealInput.value;
    const selectedPersona = document.querySelector('#overlord input[name="overlord"]:checked').value;

    fetch('http://localhost:3000/api/meal', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ mealDescription, persona: selectedPersona }),
    })
        .then(response => response.json())
        .then(data => {
            onMealResponse(data);
            console.log(data);
        });
});

//                 DELETE MEAL BUTTON

mealSummaryList.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const index = parseInt(e.target.getAttribute('data-index'));
    meals.splice(index, 1);
    localStorage.setItem('meals', JSON.stringify(meals));
    mealSummaryList.replaceChildren();
    meals.forEach((meal, i) => renderMealItem(meal, i));
});



// RENDER -----------------------------------------------------------------------------------------------

activityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const activityName = activityType.value;
    const duration = activityDuration.value;

    fetch('http://localhost:3000/api/burned', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ activity: activityName, duration })
    })
        .then(response => response.json())
        .then(data => {
            caloriesBurned.textContent = data.burned;

            let date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            let durationConverted = duration >= 60
                ? `${Math.floor(duration / 60)}h ${duration % 60}m`
                : `${duration}m`;

            const activity = {
                date,
                name: activityName,
                duration: durationConverted,
                burned: data.burned,
            };

            activities.push(activity);
            localStorage.setItem('activities', JSON.stringify(activities));
            renderActivityItem(activity);

            console.log(data);
        });

});

