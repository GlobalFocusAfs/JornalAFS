import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logando, setLogando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLogando(true);

    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      const response = await axios.post(apiBase + '/api/auth/login', { username, password });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        onLogin();
        alert('Login realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      if (error.response) {
        alert('Erro: ' + error.response.data);
      } else {
        alert('Erro ao fazer login. Verifique sua conexão.');
      }
    } finally {
      setLogando(false);
    }
  };

  return (
    <div className="login-modal">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={logando}>
          {logando ? 'Logando...' : 'Entrar'}
        </button>
      </form>
      {onLogin && (
        <div className="admin-actions">
          <h3>Ações de Administrador</h3>
          <button onClick={() => window.location.reload()}>Excluir Publicações</button>
        </div>
      )}
    </div>
  );
};

export default Login;
