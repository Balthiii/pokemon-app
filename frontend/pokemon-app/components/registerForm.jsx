import React, { useState } from 'react';
import styles from '../styles/form.module.css';
import { useRouter } from 'next/router';

function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
    alert('Veuillez remplir tous les champs du formulaire.');
    return;
  }
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          password,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur d\'inscription');
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error(error);
    }
    router.push('/login');
  };

  return (
    <div className={styles.App}>
        <h1 className={styles.title}>Page d'inscription</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <label>
          Nom Prénom : <br />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Nom d'utilisateur : <br />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email : <br />    
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Mot de passe : <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default RegisterForm;