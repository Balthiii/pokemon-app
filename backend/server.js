import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users';
import cors from 'cors';

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Vous êtes connecté à la BDD'))
  .catch(err => console.error('Erreur de connexion ', err));

app.use(cors());
app.use(express.json());
app.use('/', userRoutes);


app.listen(3001, () => console.log('Le serveur est en cours d\'exécution sur le port 3001'));