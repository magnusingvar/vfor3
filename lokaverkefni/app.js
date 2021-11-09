const express = require('express');
const path = require('path');
const session = require('express-session');
const colors = require('colors');
const frontPage = require('./routes/');
const loginPage = require('./routes/login');
const eventsPage = require('./routes/events');
const contactPage = require('./routes/contact');
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
app.use('/events', eventsPage);
app.use('/contact', contactPage);
app.use('/register', registerPage); 

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