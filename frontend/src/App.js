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
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  const carregarNoticias = async (categoria = null) => {
    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 200000); // 10 seconds timeout
      let url = apiBase + '/api/noticias';
      if (categoria) {
        url = apiBase + '/api/noticias/categoria/' + encodeURIComponent(categoria);
      }
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      const data = await response.json();
      setNoticias(Array.isArray(data) ? data : []);
      // Extract unique categories from noticias and setCategorias only when loading all news
      if (!categoria && Array.isArray(data)) {
        const uniqueCategories = [...new Set(data.map(noticia => noticia.categoria).filter(Boolean))];
        setCategorias(uniqueCategories);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
      } else {
        console.error('Erro ao carregar notícias:', error);
      }
      setNoticias([]);
      if (!categoria) {
        setCategorias([]);
      }
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

  useEffect(() => {
    if (categoriaSelecionada !== '') {
      carregarNoticias(categoriaSelecionada);
    } else {
      carregarNoticias();
    }
  }, [categoriaSelecionada]);

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
              <li><a href="#inicio" className="nav-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Início</a></li>
              <li><a href="#noticias" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('noticias-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Notícias</a></li>
              <li><a href="#enquetes" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('enquetes-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Enquetes</a></li>
              <li><a href="#arquivo" className="nav-link" onClick={(e) => { e.preventDefault(); document.getElementById('arquivo-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Arquivo</a></li>
              <li><a href="https://wa.me/+558594151359" className="nav-link" onClick={(e) => { e.preventDefault(); window.open('https://wa.me/+558594151359', '_blank'); }}>Contato</a></li>
            </ul>
          </nav>
          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="Digite sua pesquisa..." />
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
          <div className="loading-container">
            <div className="loading-text">(máximo de 3 minutos)</div>
            <img src="/Espera_ái.png" alt="Carregando notícias...(3 minutos no máximo)" className="loading-gif" />
          </div>
        ) : (
          <div id="noticias-section">
            <div className="noticias-header">
              <h2>Notícias</h2>
              <div className="categoria-filter">
                <label htmlFor="categoria-select">Filtrar por categoria:</label>
                <select
                  id="categoria-select"
                  value={categoriaSelecionada}
                  onChange={(e) => setCategoriaSelecionada(e.target.value)}
                >
                  <option value="">Todas as categorias</option>
                  {categorias.map(categoria => (
                    <option key={categoria} value={categoria}>{categoria}</option>
                  ))}
                </select>
              </div>
            </div>
            <NoticiaList
              noticias={noticias}
              onSelectNoticia={setSelectedNoticiaId}
              isLoggedIn={isLoggedIn}
              onDelete={() => carregarNoticias(categoriaSelecionada || null)}
            />
          </div>
        )}
        <div id="enquetes-section">
          <PollList polls={polls} onVote={carregarPolls} />
        </div>
        <div id="arquivo-section" className="arquivo-section">
          <h2>Arquivo de Imagens das Publicações</h2>
          <div className="arquivo-gallery">
            {noticias.filter(noticia => noticia.imagemUrl).length > 0 ? (
              noticias
                .filter(noticia => noticia.imagemUrl)
                .map(noticia => (
                  <div key={noticia.id} className="arquivo-item">
                    <img src={noticia.imagemUrl} alt={noticia.titulo} />
                    <div className="arquivo-item-info">
                      <h3>{noticia.titulo}</h3>
                      <p>{noticia.categoria || 'Notícia'}</p>
                      <small>Publicado em {new Date(noticia.dataPublicacao).toLocaleDateString()}</small>
                    </div>
                  </div>
                ))
            ) : (
              <div className="no-images">
                <i className="fas fa-images" style={{ fontSize: '4rem', color: 'var(--text-light)', marginBottom: '1rem' }}></i>
                <h3>Nenhuma imagem encontrada</h3>
                <p>As imagens das publicações aparecerão aqui quando forem adicionadas.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contato</h3>
            <p>📧 contato@eeepafs.edu.br</p>
            <p>📞 (88)9415-1359</p>
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
