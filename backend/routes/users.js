import express from 'express';
import User from '../models/user';
import verifyToken  from '../controllers/authController';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).send("Aucun utilisateur trouvé avec cet ID");
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("Erreur du serveur");
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send("Aucun utilisateur trouvé avec cet ID");
    }

    res.status(200).send("Utilisateur supprimé avec succès");
  } catch (err) {
    res.status(500).send("Erreur du serveur");
  }
});

router.post('/register', async (req, res) => {
  // Hacher le mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Créer un nouvel utilisateur
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');

  
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Nom d\'utilisateur ou mot de passe incorrect');

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});


router.get('/protected', verifyToken, (req, res) => {
  res.send('Vous avez accédé à une route protégée');
});


export default router;