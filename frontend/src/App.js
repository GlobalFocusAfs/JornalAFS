import React, { useState, useEffect } from 'react';
import NoticiaList from './components/NoticiaList';
import NoticiaForm from './components/NoticiaForm';
import NoticiaDetail from './components/NoticiaDetail';
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
  const [selectedNoticiaId, setSelectedNoticiaId] = useState(null);

  const carregarNoticias = async () => {
    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 200000); // 10 seconds timeout
      const response = await fetch(apiBase + '/api/noticias', { signal: controller.signal });
      clearTimeout(timeoutId);
      const data = await response.json();
      setNoticias(Array.isArray(data) ? data : []);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
      } else {
        console.error('Erro ao carregar notícias:', error);
      }
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
      <header className="sticky-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <div className="header-text">
              <h1>Jornal da EEEP Adolfo Ferreira de Sousa</h1>
              <p>Redenção - Ceará</p>
            </div>
          </div>
          <nav className="main-navigation">
            <ul>
              <li><a href="#inicio" className="nav-link">Início</a></li>
              <li><a href="#noticias" className="nav-link">Notícias</a></li>
              <li><a href="#enquetes" className="nav-link">Enquetes</a></li>
              <li><a href="#arquivo" className="nav-link">Arquivo</a></li>
              <li><a href="#contato" className="nav-link">Contato</a></li>
            </ul>
          </nav>
          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="Buscar notícias..." />
              <button type="submit"><i className="fas fa-search"></i></button>
            </div>
            <div className="auth-buttons">
              {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <button onClick={() => setShowLogin(!showLogin)}>Login</button>
              )}
            </div>
          </div>
        </div>
      </header>
      <main>
        {!isLoggedIn && showLogin && <Login onLogin={handleLogin} />}
        {isLoggedIn && (
          <>
            <NoticiaForm onNewNoticia={carregarNoticias} />
            <PollForm onNewPoll={carregarPolls} />
          </>
        )}
        {selectedNoticiaId ? (
          <NoticiaDetail noticiaId={selectedNoticiaId} onBack={() => setSelectedNoticiaId(null)} />
        ) : carregando ? (
          <p>Carregando notícias...</p>
        ) : (
          <NoticiaList noticias={noticias} onSelectNoticia={setSelectedNoticiaId} />
        )}
        <PollList polls={polls} onVote={carregarPolls} />
      </main>
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contato</h3>
            <p>📧 contato@eeepafs.edu.br</p>
            <p>📞 (88) 9999-9999</p>
            <p>📍 Redenção - Ceará</p>
          </div>
          <div className="footer-section">
            <h3>Links Úteis</h3>
            <p><a href="#">Sobre o Jornal</a></p>
            <p><a href="#">Equipe</a></p>
            <p><a href="#">Arquivo</a></p>
          </div>
          <div className="footer-section">
            <h3>Navegação</h3>
            <p><a href="#">Início</a></p>
            <p><a href="#">Notícias</a></p>
            <p><a href="#">Contato</a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 EEEP Adolfo Ferreira de Sousa - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
