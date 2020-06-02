const express = require('express');
const app = express();

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

//import route
const weatherRoute = require('./routes/weather');

// use view engine
app.set('view engine', 'ejs');

//middleware route
app.use('/', weatherRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server starting at port ${PORT}`));