const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

//gives access to variables in .env file
require('dotenv').config();

//creates the express application
const app = express();

//configures database and opens global connection
require('./config/db');

//loads models
require('./models/User');

//pass global passport object into configuration function
require('./config/passport')(passport);

//initialize passport object on every request
app.use(passport.initialize());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors
app.use(cors());

//basic route
app.get('/', (req, res) => res.send('Hello world!'));

//routes from ./routes/index.js
app.use(require('./routes'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
