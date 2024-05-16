import React, { useState } from 'react';
import styles from '../styles/form.module.css';
import { useRouter } from 'next/router';

function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifiez si les champs sont vides
    if (!username || !password) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    // Logique de soumission du formulaire

    // Redirigez vers la page pokemon seulement si la connexion a réussi
    router.push('/pokemon');
  };

  return (
    <div className={styles.App}>
      <h1 className={styles.title}>Page de connexion</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <label>
          Nom d'utilisateur :
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Mot de passe :
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default LoginForm;