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
    formData.append('imagem', imagem);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/noticias', 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
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
      alert('Erro ao publicar notícia. Verifique o console para mais detalhes.');
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
