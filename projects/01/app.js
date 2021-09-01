const express = require('express');

const app = express();

app.use((req, res) => {
    res.end('Test');
});

app.listen(3000);