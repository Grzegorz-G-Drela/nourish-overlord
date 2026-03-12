// load saved data from localStorage
// calculate and display calorieTarget
// set user data, save to localStorage
// profile form on submit:
    // stop the page from realoading
    // collect form data into the profile object
    // save profile to localStorage
    // update the total calories display
// log a meal on a button click:
    // take the data from the input
    // fetch the data to the AI
        // what are the macros for the meal this size?
    // filter the response
        // update Consumed calories display
        // put the macros on the display in Daily Summary
    // clear the input field
// log activity on button click:
    // take the data from the input
    // fetch to AI
        // what are the calories burned?
    // filter the response
        // put the name/time and calories burned down in the Daily Summary
        // update calories burned display
// Daily summary holds the data for every day in objects
    // if there's an object for today, just add more to it
        // add new key:value pair to the existing today's object
        // update display
    // else, create the object and add the EDIT and DELETE buttons
        // DELETE on click-release, hold shorter than 3s
            // give a short message that goes off after 5s "hold for 3s"
            // or hold for 3s to delete and let the button do the counting, 3, 2, 1, then delete (lears some css?)
                // deletes an objects
                // updates the Daily Summary display
        // EDIT click to edit the file
            // EDIT turns to SAVE
                // no idea how we edit, this can completely change the structure of this section, is it worth it? (seems like a really useful feature)
            // SAVE on click (turn back to EDIT)
                // saves the new object
                // updates the Daily Summary display


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
