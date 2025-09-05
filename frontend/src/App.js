import React, { useState, useEffect } from 'react';
import NoticiaList from './components/NoticiaList';
import NoticiaForm from './components/NoticiaForm';
import './App.css';

function App() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarNoticias = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/noticias');
      const data = await response.json();
      setNoticias(data);
    } catch (error) {
      console.error('Erro ao carregar notícias:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarNoticias();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Jornal da EEEP Adolfo Ferreira de Sousa</h1>
        <p>Redenção - Ceará</p>
      </header>
      <main>
        <NoticiaForm onNewNoticia={carregarNoticias} />
        {carregando ? (
          <p>Carregando notícias...</p>
        ) : (
          <NoticiaList noticias={noticias} />
        )}
      </main>
      <footer>
        <p>&copy; 2023 EEEP Adolfo Ferreira de Sousa - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default App;
