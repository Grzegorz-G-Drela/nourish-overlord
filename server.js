const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
})