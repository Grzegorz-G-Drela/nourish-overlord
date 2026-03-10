let basalMetabolicRate;

if (profile.gender === 'male') {
    basalMetabolicRate = 10*profile.weight + 6.25*profile.height - 5*profile.age + 5;
} else {
    basalMetabolicRate = 10*profile.weight + 6.25*profile.height - 5*profile.age - 161;
}