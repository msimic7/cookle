const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT);
