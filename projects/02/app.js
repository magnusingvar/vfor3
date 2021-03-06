const express = require('express');
const path = require('path');
const colors = require('colors');
const frontRouter = require('./routes/pages');

const app = express();

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routers
app.use('/', frontRouter);

// setting up the server
app.listen(3000, () => {
  console.log(colors.green('Server is running on port 3000.....'));
});