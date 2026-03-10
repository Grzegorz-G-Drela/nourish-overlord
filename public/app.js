const form = document.querySelector('form');
const username = document.querySelector('#username');
const age = document.querySelector('#age');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const goal = document.querySelector('#goal');
const activityLevel = document.querySelector('#activity-level');

let storedProfile = localStorage.getItem('profile');
let profile = JSON.parse(storedProfile) || {};
if (profile.username) {
    username.value = profile.username;
    age.value = profile.age;
    weight.value = profile.weight;
    height.value = profile.height;
    goal.value = profile.goal;
    activityLevel.value = profile.activityLevel;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    profile = {};

    profile.username = username.value;
    profile.age = age.value;
    profile.weight = weight.value;
    profile.height = height.value;
    profile.goal = goal.value;
    profile.activityLevel = activityLevel.value;

    localStorage.setItem('profile', JSON.stringify(profile));
});

