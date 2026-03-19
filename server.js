const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.use(express.static('public'));

app.post('api/meal', (req, res) => {
    // get the meal text from req.body.meal
    // pass the meal text to Anthropic API
    // get the response and pass it back to the browser
});

app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
})