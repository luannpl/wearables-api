import express from 'express';
import UserRoutes from "./modules/user/user.routes";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Wearables API!');
});

app.use('/users', UserRoutes);


app.listen(3000, () => console.log('Server on http://localhost:3000'));
