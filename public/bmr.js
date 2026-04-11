const calculateCalories = (profile) => {
    let basalMetabolicRate;
    const baseCalories = 10 * parseInt(profile.weight) + 6.25 * parseInt(profile.height) - 5 * parseInt(profile.age)

    if (profile.gender === 'male') {
        basalMetabolicRate = baseCalories + 5;
    } else {
        basalMetabolicRate = baseCalories - 161;
    }

    const activityMultipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very active": 1.9,
    }

    const totalDailyCalories = basalMetabolicRate * activityMultipliers[profile.activityLevel];
    let goalAdjustment = 0;
    if (profile.goal === 'lose') goalAdjustment = -200;
    if (profile.goal === 'gain') goalAdjustment = 200;

    return (totalDailyCalories + goalAdjustment);
}
