const express = require('express');
const path = require('path');
const session = require('express-session');
const colors = require('colors');
const frontPage = require('./routes/');
const loginPage = require('./routes/login');
const studentsPage = require('./routes/students');
const subjectsPage = require('./routes/subjects');
const eventsPage = require('./routes/events');
const contactPage = require('./routes/contact');

const app = express();

app.use(session({
  secret: '98290idkjl987687989auyghdjuiok9876098765&%R$&',
  resave: true,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routers
app.use('/', frontPage);
app.use('/login', loginPage);
app.use('/students', studentsPage);
app.use('/subjects', subjectsPage);
app.use('/events', eventsPage);
app.use('/contact', contactPage);

// errors : page not found
app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
  });

  // handling errors
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send(err.message);
  });

// setting up the server
app.listen(3000, () => {
  console.log(colors.green('Server is running on port 3000.....'));
});