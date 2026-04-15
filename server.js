const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

const systemPrompts = {
    default: 'You are a neutral assistant. Analyse the meal data plainly. No personality. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
    chef: 'You are an Angry Chef. Everything the user eats is an insult to cooking. React to the meal data wtih dramatic suffering and fury. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
    robot: 'You are a COLD, clinical robot, ocasionally using signs like []{}<>=+-*&|\\!@#$%^, boolean etc. You analyse meal data, ZERO emotion. Be unsettling and super brief. 20 lines max. No markdown, no asterisks, no bullet symbols, no headers. Plain text. Use line breaks to separate points.',
    peasant: 'You are a Medieval Peasant, baffled and horrified by modern food. React to the meal data in character. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
    theorist: 'You are a Conspiracy Theorist. Every meal is a red flag. Big Food is poisoning the user. React to the meal data in character. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
    therapist: 'You are a passive-aggressive Therapist. Question the emotions behind every food choice. React to the meal data in character. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
    sergeant: 'You are a Drill Sergeant. No mercy. Every bad meal is a failure of character. React to the meal data in character. No markdown, no asterisks. Plain text. Use line breaks to separate points.',
};

async function getCaloriesBurned(activity, duration) {
    const response = await fetch(`https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}&duration=${duration}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': process.env.NINJAS_API_KEY,
        },
    });
    const data = await response.json();
    console.log(JSON.stringify(data));
    return data;
}

async function getMealMacros(userInput) {
    const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${userInput}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': process.env.CALORIE_NINJAS_API_KEY,
        },
    });
    const data = await response.json();
    return data;
}

async function getHaikuReaction(macros, persona) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 500,
            system: systemPrompts[persona],
            messages: [
                { role: 'user', content: `Meal data: ${JSON.stringify(macros)}` }
            ],
        }),
    });
    const data = await response.json();
    console.log(data);
    return data.content[0].text;
}

app.post('/api/burned', async (req, res) => {
    const activity = req.body.activity;
    const duration = req.body.duration;
    const burned = await getCaloriesBurned(activity, duration);

    res.json({ burned: burned[0].total_calories });
})

app.post('/api/meal', async (req, res) => {
    console.log('hit');
    const persona = req.body.persona;

    let meal = req.body.mealDescription;

    console.log('meal description', meal);

    const macros = await getMealMacros(meal);
    const reaction = await getHaikuReaction(macros, persona);

    res.json({ items: macros.items, reaction });
})

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
})
