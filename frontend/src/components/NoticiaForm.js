import React, { useState } from 'react';
import axios from 'axios';

const NoticiaForm = ({ onNewNoticia }) => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tags, setTags] = useState('');
  const [destaque, setDestaque] = useState(false);
  const [imagem, setImagem] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const categorias = [
    'Educação',
    'Eventos',
    'Premiações',
    'Esportes',
    'Cultura',
    'Opinião'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('conteudo', conteudo);
    formData.append('autor', autor);
    formData.append('categoria', categoria);
    formData.append('tags', tags);
    formData.append('destaque', destaque.toString());
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
        setCategoria('');
        setTags('');
        setDestaque(false);
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
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        required
      >
        <option value="">Selecione uma categoria</option>
        {categorias.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Tags (separadas por vírgula)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={destaque}
          onChange={(e) => setDestaque(e.target.checked)}
        />
        Marcar como notícia em destaque
      </label>
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
