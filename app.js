const express = require('express');
const path = require('path');

const app = express();

require('./config/db');

app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
