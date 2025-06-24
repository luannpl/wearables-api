import express from 'express';
import UserRoutes from "./modules/user/user.routes";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello, Wearables API!');
});

app.use('/users', UserRoutes);


app.listen(3000, () => console.log('Server on http://localhost:'+ PORT));
