import React, { useState } from 'react';
import axios from 'axios';

const NoticiaForm = ({ onNewNoticia }) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [imagem, setImagem] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    formData.append('autor', autor);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    const token = localStorage.getItem('token');
    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      console.log('Enviando notícia para:', apiBase + '/api/noticias');
      const response = await axios.post(
        apiBase + '/api/noticias',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        alert('Notícia publicada com sucesso!');
        setTitulo('');
        setConteudo('');
        setAutor('');
        setImagem(null);
        document.getElementById('imagem-input').value = '';
        onNewNoticia();
      }
    } catch (error) {
      console.error('Erro ao publicar notícia:', error);
      if (error.response) {
        console.error('Resposta do servidor:', error.response.data);
        alert('Erro ao publicar notícia: ' + (error.response.data.message || 'Erro desconhecido'));
      } else {
        alert('Erro ao publicar notícia. Verifique sua conexão com a internet.');
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="noticia-form">
      <h2>Publicar Nova Notícia</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <textarea
        placeholder="Conteúdo da notícia"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        required
        rows="5"
      />
      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        required
      />
      <input
        id="imagem-input"
        type="file"
        accept="image/*"
        onChange={(e) => setImagem(e.target.files[0])}
      />
      <button type="submit" disabled={enviando}>
        {enviando ? 'Publicando...' : 'Publicar Notícia'}
      </button>
    </form>
  );
};

export default NoticiaForm;
