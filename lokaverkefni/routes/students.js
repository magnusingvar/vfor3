const express = require('express');
const router = express.Router();

const students = ['Student 1', 'Student 2', 'Student 3', 'Student 4'];

router.get('/', (req, res) => {
  if(req.session.loggedIn) {
    res.render('students', { title: 'Students', students });

  } else {
    res.redirect('/');
  }
});

module.exports = router;