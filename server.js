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
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: 'You are a nutrition API. You return only raw JSON. Never return markdown, recipes, or explanations. Only JSON.',
            messages: [
                { role: 'user', content: `Return ONLY raw JSON, no markdown, no explanation, no backticks. Fields: calories, fat, carbohydrates, protein. If unknown use null. Meal: ${userInput}` }
            ],
        })
    });
    const data = await response.json();
    const parsed = JSON.parse(data.content[0].text);
    return parsed;
}

app.post('/api/meal', async (req, res) => {
    console.log('hit');
    const meal = req.body.mealDescription;
    const macros = await getMealMacros(meal);
    res.json(macros);
});

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
})
