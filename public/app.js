// on page load:
    // load saved data from localStorage (if not empty)
    // calculate and display calorieTarget
    // set user data, save to localStorage
    // create
        // displayUpdate() - refresh the display with the new data (for all sections at once)
        // deleteUpdate() - refresh the select element after the day-element deletion in Daily Sumary section


// profile form on submit:
    // stop the page from realoading
    // collect form data into the profile object
    // save profile to localStorage
    // displayUpdate()

// log a meal on a form submit:
    // take the data from the input
    // fetch the data to the AI
        // what are the macros for the meal this size?
    // filter the response
        // displayUpdate() - Today's Dashboard + Daily Summary
    // clear the input field

// log activity on form submit:
    // take the data from the input
    // fetch to AI
        // what are the calories burned?
    // filter the response
        // put the name/time and calories burned down in the Daily Summary
        // update calories burned display

// Daily summary holds the data for every day in separate objects
    // if there's an object for today, just add more to it
        // add new key:value pair to the existing today's object
        // update display
    // else, create the object and add EDIT and DELETE buttons, highlighting ON HOVER
        // DELETE button
            // on click-release, hold shorter than 3s
                // give a short message that goes off after 5s "hold for 3s"
            // on hold for 3s to delete and let the button do the counting, 3, 2, 1, then delete (learn some css?)
                // move object to RECENTLY DELETED select element (need to create one too in HTML)
                // displayUpdate(), deletedUpdate()
        // EDIT button on click
            // change button name to SAVE
            // swap the display section wtih pre-filled inputs
        // SAVE button on click 
            // change button name back to EDIT
            // pass new input data into day-object
            // displayUpdate()

// SAVE MY DATA button on click
    // saves the localStorage data into a text file
// LOAD MY DATA button on click
    // triggers hidden file input - then load the data into the local storage
    // displayUpdate()


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
