const express = require('express');

const router = express.Router();

// náum í index síðuna og birtum hana
router.get('/', (req, res) => {
  const text = 'Þetta er Síða 1';
  const sida2 = 'Fara á síðu 2';
  res.render('index', { title: 'Upphafssíða', text, sida2});
});

router.get('/horse', (req, res) => {
  const sida1 = 'Fara til baka';
  const titleText = 'Hestur';
  const text = 'Þetta er hestur, vá';
  const text2 = `Hestur er tegund stórra spendýra af ættbálki hófdýra og eitt af sjö eftirlifandi tegundum af Equus-ættkvíslinni.
  Hestar hafa skipt miklu máli í mótun samgangna og vinnutækja í heiminum. Talið er að hestur nútímans hafi verið fyrst notaður 
  til að auðvelda manninum vinnu sína um 2000 f. Kr. Í dag er hesturinn meira notaður sem húsdýr og tómstundagaman en í þriðja heiminum er hann enn mikið notaður við ýmis störf, sérstaklega í landbúnaði.`
  res.render('page2', { title: 'Hestur', sida1, titleText, text, text2});
});

module.exports = router;