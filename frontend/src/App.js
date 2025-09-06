import React, { useState, useEffect } from 'react';
import NoticiaList from './components/NoticiaList';
import NoticiaForm from './components/NoticiaForm';
import Login from './components/Login';
import PollForm from './components/PollForm';
import PollList from './components/PollList';
import './App.css';

function App() {
  const [noticias, setNoticias] = useState([]);
  const [polls, setPolls] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const carregarNoticias = async () => {
    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      const response = await fetch(apiBase + '/api/noticias');
      const data = await response.json();
      setNoticias(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
      setNoticias([]);
    } finally {
      setCarregando(false);
    }
  };

  const carregarPolls = async () => {
    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      const response = await fetch(apiBase + '/api/polls');
      const data = await response.json();
      setPolls(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar enquetes:', error);
      setPolls([]);
    }
  };

  useEffect(() => {
    carregarNoticias();
    carregarPolls();
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <header>
        <h1>Jornal da EEEP Adolfo Ferreira de Sousa</h1>
        <p>Redenção - Ceará</p>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={() => setShowLogin(true)}>Login</button>
          )}
        </div>
      </header>
      <main>
        {!isLoggedIn && <Login onLogin={handleLogin} />}
        {isLoggedIn && (
          <>
            <NoticiaForm onNewNoticia={carregarNoticias} />
            <PollForm onNewPoll={carregarPolls} />
          </>
        )}
        {carregando ? (
          <p>Carregando notícias...</p>
        ) : (
          <NoticiaList noticias={noticias} />
        )}
        <PollList polls={polls} onVote={carregarPolls} />
      </main>
      <footer>
        <p>&copy; 2025 EEEP Adolfo Ferreira de Sousa - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;
