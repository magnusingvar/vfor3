const express = require('express');
const path = require('path');
const colors = require('colors');
const indexRouter = require('./routes/');
const buyRouter = require('./routes/buy')
const stockRouter = require('./routes/stock')

const app = express();

app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routers
app.use('/', indexRouter);
app.use('/buy', buyRouter);
app.use('/stock', stockRouter);

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