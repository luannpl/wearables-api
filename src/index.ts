import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Wearables API!');
});

app.listen(3000, () => console.log('Server on http://localhost:3000'));
