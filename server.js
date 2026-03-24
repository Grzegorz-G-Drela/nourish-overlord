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

app.post('/api/meal', async (req, res) => {
    console.log('hit');
    const meal = req.body.mealDescription;
    const macros = await getMealMacros(meal);
    res.json(macros);
});

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT);
})
