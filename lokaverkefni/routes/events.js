const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
		const userValue = 'Log out';
    res.render('events', { title: 'Events', userValue });
	} else {
    const userValue = 'Log in';
    res.render('events', { title: 'Events', userValue });
  }
});

module.exports = router;