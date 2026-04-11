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
const mealInput = document.querySelector('#meal-input')
const mealList = document.querySelector('#meal-list');

const reactionText = document.querySelector('#reaction-text');

const activityForm = document.querySelector('#activity-form');
const activityType = document.querySelector('#activity-type');
const activityDuration = document.querySelector('#activity-duration');
const activityList = document.querySelector('#activity-list');

const saveBtn = document.querySelector('#save-btn');
const loadBtn = document.querySelector('#load-btn');
const fileInput = document.querySelector('#file-input');


//           ##############################################
//           #############   LOCAL STORAGE   ##############
//           ##############################################

let meals = JSON.parse(localStorage.getItem('meals')) || [];
meals.forEach((meal, index) => renderMealsLi(meal, index));

let activities = JSON.parse(localStorage.getItem('activities')) || [];
activities.forEach(activity => renderActivityLi(activity));


//           ##########################################
//           #############   REUSABLES   ##############
//           ##########################################

function renderMealsLi(meal, index) {
    const li = document.createElement('li');
    li.textContent = `${meal.name} - ${Math.round(meal.calories)} kcal`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute('data-index', index);
    deleteBtn.style.leftMargin = "auto";

    li.appendChild(deleteBtn);
    mealList.appendChild(li);
}

function renderActivityLi(activity) {
    const li = document.createElement('li');
    li.textContent = `${activity.date} | ${activity.name} | ${activity.duration} | ${activity.burned} kcal`;
}


//           ##########################################
//           ###########   SAVE / LOAD   ##############
//           ##########################################

function saveData() {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nourish-overlord-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

saveBtn.addEventListener('click', saveData);

function loadData() {
    fileInput.click();
}

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        Object.keys(data).forEach(key => {
            localStorage.setItem(key, data[key]);
        });
    };
    reader.readAsText(file);
});

loadBtn.addEventListener('click', loadData);


//           ##########################################
//           #############   PROFILE   ################
//           ##########################################

function updateTotalCalories(profile) {
    const totalDailyCalories = calculateCalories(profile);
    calorieTarget.textContent = Math.round(totalDailyCalories / 50) * 50;
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

//           ########################################
//           #############   MEALS   ################
//           ########################################

function updateMacrosRenderMeals(data) {
    let items = data.items;
    let totalCalories = 0;
    let totalFat = 0;
    let totalCarbohydrates = 0;
    let totalProteins = 0;

    items.forEach(meal => {
        totalCalories += meal.calories;
        totalFat += meal.fat_total_g;
        totalCarbohydrates += meal.carbohydrates_total_g;
        totalProteins += meal.protein_g;
        let index = meals.length - 1;
        renderMealsLi(meal, index);
        // console.log(data);

        meals.push({
            name: meal.name,
            calories: Math.round(meal.calories),
            carbohydrates: Math.round(meal.carbohydrates_total_g),
            fat: Math.round(meal.fat_total_g),
            protein: Math.round(meal.protein_g),
        });
        localStorage.setItem('meals', JSON.stringify(meals));
    });

    caloriesConsumed.textContent = Math.round(totalCalories);
    fatConsumed.textContent = Math.round(totalFat);
    carbohydratesConsumed.textContent = Math.round(totalCarbohydrates);
    proteinConsumed.textContent = Math.round(totalProteins);
    caloriesRemaining.textContent = Math.round(calorieTarget.textContent) - Math.round(totalCalories);

    reactionText.textContent = data.reaction;
}

mealForm.addEventListener('submit', (e) => {
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
            updateMacrosRenderMeals(data);
            console.log(data);
        });
});

mealList.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const index = parseInt(e.target.getAttribute('data-index'));
    meals.splice(index, 1);
    localStorage.setItem('meals', JSON.stringify(meals));
    mealList.innerHTML = '';
    meals.forEach((meal, i) => renderMealsLi(meal, i));
});

//           ###########################################
//           #############   ACTIVITY   ################
//           ###########################################


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
            renderActivityLi(activity);

            console.log(data);
        });

});

//           #########################################
//           #############   THEMES   ################
//           #########################################

overlordFieldset.addEventListener('change', (e) => {
    document.body.setAttribute('data-theme', e.target.value);
    reactionText.textContent = '';
})
