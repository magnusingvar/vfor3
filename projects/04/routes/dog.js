const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  const homePage = "Go back to homepage"
  const text = `The dog or domestic dog (Canis familiaris) is a domesticated descendant of the wolf, 
  characterized by an upturning tail. The dog derived from an ancient, extinct wolf and the modern 
  grey wolf is the dog's nearest living relative. The dog was the first species to be domesticated,
  by hunter–gatherers over 15,000 years ago, before the development of agriculture. Their long 
  association with humans has led dogs to be uniquely adapted to human behavior leading to a large
  number of domestic individuals and the ability to thrive on a starch-rich diet that would be 
  inadequate for other canids.`
  res.render('dog', { title: 'Dog', homePage, text });
});

module.exports = router;