const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//middlewre
app.use(bodyParser.urlencoded({ extended: false }));

//parse aplication
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json('Hola Mundo,probando nodemon');
});

app.post('/', (req, res) => {
  const body = req.body;
  res.json({
    body,
  });
});

app.listen(3000, () => {
  console.log('Listening on port http://localhost:3000');
});
