// on page load:
    // load saved data from localStorage (if not empty)
    // calculate and display calorieTarget
    // set user data, save to localStorage
    // create
        // displayUpdate() - refresh the display with the new data (for all sections at once)
        // deleteUpdate() - refresh the select element after the day-element deletion in Daily Sumary section


// profile profileForm on submit:
    // stop the page from realoading
    // collect profileForm data into the profile object
    // save profile to localStorage
    // displayUpdate()

// log a meal:
    // AUTO (mealForm submit):
        // take the data from the input
        // if input is not empty (after trimming spaces on the sides)
            // fetch to AI
                // pass input value inside a function that tells AI what to do with it
                    // if specific type of food/specitfic amounts
                        // response is more specific
                        // return [ carbs, fats, proteins, kcal ]
                        // displayUpdate() - Today's Dashboard + Daily Summary
                        // clear the input field
                    // else if it's not specified, ie. "spaghetti", "egg", "white bun"
                        // AI response should be based on the average portion of the dish, or one piece
                        // creates "warning" element and fills it with a msg - "Standard serving size."
                        // return [ carbs, fats, proteins, kcal, warning ]
                        // displayUpdate() - Today's Dashboard + Daily Summary
                        // clear the input field
                    // else - not enough details / unable to estimate
                        // return the message "Estimation error. Please give more details or add manually."
    // MANUAL:
        // opens the field with inputs to be filled and SAVE button
            // if (input field wasn't empty)
                // copy that value into input's textContent
            // else
                // start with an empty form
        // on SAVE submit the form and send its data into an object
        // save to localStorage
        // displayUpdate()

// log activity:
    // AUTO (activityForm submit):
        // if input activityInput && if activityTime are both not empty (after trimming spaces):
            // fetch that data to AI, inside the function asking AI to count the calories burned and name heatlh benefits
                // if (enough information)
                    // return the [caloriesBurned, healthBenefits]
                    // add data to the today's dashboard calculations
                    // displayUpdate
    // MANUAL
        // same as manually loggin the meal (just different inputs)

// Daily summary holds the data for every day in separate objects
    // if there's an object for today, just add more to it
        // add new key:value pair to the existing today's object
        // update display
    // else, create the object and add EDIT and DELETE buttons, highlighting ON HOVER
        // DELETE button on click
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


const profileForm = document.querySelector('#profile-form');
const mealForm = document.querySelector('#meal-form');
const activityForm = document.querySelector('#activity-form');

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

const mealInput = document.querySelector('#meal-input')
const activityInput = document.querySelector('#activity-input');

const fields = ['username', 'gender', 'age', 'weight', 'height', 'goal', 'activityLevel'];

// ###########################################################################################################
// ##### END OF DOM DECLARATIONS #############################################################################
// ###########################################################################################################

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
