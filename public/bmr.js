
const calculateCalories = (profile) => {
    let basalMetabolicRate;

    if (profile.gender === 'male') {
        basalMetabolicRate = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
    } else {
        basalMetabolicRate = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
    }

    const activityMultipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very active": 1.9,
    }

    const totalDailyCalories = basalMetabolicRate * activityMultipliers[profile.activityLevel];
    return totalDailyCalories;
}

module.exports = calculateCalories;