const express = require('express');
const path = require('path');
const session = require('express-session');
const colors = require('colors');
const frontPage = require('./routes/');

const createEvent = require('./routes/create/createEvent');

const updateEvent = require('./routes/update/updateEvent');

const deleteEvent = require('./routes/delete/deleteEvent');

const readEvent = require('./routes/read/event');
const readEvents = require('./routes/read/events');

const loginPage = require('./routes/login');
const registerPage = require('./routes/register');

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
app.use('/events', readEvents);
app.use('/event', readEvent)
// app.use('/contact', contactPage);
app.use('/register', registerPage); 
app.use('/createEvent', createEvent);
app.use('/updateEvent', updateEvent);

// errors : page not found
app.use((req, res) => {
  res.status(404);
  res.render('error', { title: 'Error', status: 404, msg: 'Page not found!' });
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