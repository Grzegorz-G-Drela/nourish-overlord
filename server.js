const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.use(express.static('public'));

async function getMealMacros(userInput) {
    const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${userInput}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': process.env.CALORIE_NINJAS_KEY,
        },
    });
    const data = await response.json();
    return data;
}

async function getHaikuReaction(macros) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 300,
            system: 'You are a COLD, clinical robot, printing text like_a_COMMAND_line. You analyse meal data, ZERO emotion. Be unsettling and super brief. 20 lines max. No markdown, no asterisks, no bullet symbols, no headers. Plain text. Use line breaks to separate points.',
            messages: [
                { role: 'user', content: `Meal data: ${JSON.stringify(macros)}` }
            ],
        }),
    });
    const data = await response.json();
    console.log(data);
    return data.content[0].text;
}





app.post('/api/meal', async (req, res) => {
    console.log('hit');
    const meal = req.body.mealDescription;
    const macros = await getMealMacros(meal);
    const reaction = await getHaikuReaction(macros);
    res.json({ items: macros.items, reaction });
});

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
})
