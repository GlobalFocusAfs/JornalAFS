import React, { useState, useEffect } from 'react';

const NoticiaDetail = ({ noticiaId, onBack }) => {
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newCommentAutor, setNewCommentAutor] = useState('');
  const [newCommentConteudo, setNewCommentConteudo] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
        const response = await fetch(`${apiBase}/api/noticias/${noticiaId}`);
        if (!response.ok) {
          throw new Error('Notícia não encontrada');
        }
        const data = await response.json();
        setNoticia(data);
        setLikes(data.likes || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
        const response = await fetch(`${apiBase}/api/comments/noticia/${noticiaId}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar comentários');
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchNoticia();
    fetchComments();
  }, [noticiaId]);

  const getLikedNews = () => {
    const liked = localStorage.getItem('likedNews');
    return liked ? JSON.parse(liked) : [];
  };

  const setLikedNews = (liked) => {
    localStorage.setItem('likedNews', JSON.stringify(liked));
  };

  const handleCurtir = async () => {
    const likedNews = getLikedNews();
    if (likedNews.includes(noticiaId)) {
      alert('Você já curtiu esta notícia!');
      return;
    }
    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      const response = await fetch(`${apiBase}/api/noticias/${noticiaId}/like`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Erro ao curtir a notícia');
      }
      const data = await response.json();
      setLikes(data.likes || likes + 1);
      likedNews.push(noticiaId);
      setLikedNews(likedNews);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddComment = async () => {
    if (!newCommentAutor.trim() || !newCommentConteudo.trim()) {
      alert('Por favor, preencha seu nome e comentário.');
      return;
    }
    setSubmittingComment(true);
    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      const response = await fetch(`${apiBase}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noticiaId,
          autor: newCommentAutor.trim(),
          conteudo: newCommentConteudo.trim(),
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar comentário');
      }
      const savedComment = await response.json();
      setComments([savedComment, ...comments]);
      setNewCommentAutor('');
      setNewCommentConteudo('');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return <p>Carregando notícia...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!noticia) return <p>Notícia não encontrada.</p>;

  const likedNews = getLikedNews();
  const isLiked = likedNews.includes(noticiaId);

  return (
    <div className="noticia-detail">
      <button onClick={onBack}>Voltar</button>
      <h2>{noticia.titulo}</h2>
      {noticia.categoria && <span className="categoria">{noticia.categoria}</span>}
      {noticia.imagemUrl && <img src={noticia.imagemUrl} alt={noticia.titulo} />}
      <p>{noticia.conteudo}</p>
      {noticia.tags && noticia.tags.length > 0 && (
        <div className="tags">
          {noticia.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag.trim()}</span>
          ))}
        </div>
      )}
      <small>Por {noticia.autor} em {new Date(noticia.dataPublicacao).toLocaleDateString()}</small>
      <div className="noticia-stats">
        <span>👁️ {noticia.visualizacoes || 0}</span>
        <span>❤️ {likes}</span>
      </div>
      <button onClick={handleCurtir} disabled={isLiked}>
        {isLiked ? 'Curtido' : 'Curtir'}
      </button>

      <div className="comments-section">
        <h3>Comentários</h3>
        <div className="add-comment">
          <input
            type="text"
            placeholder="Seu nome"
            value={newCommentAutor}
            onChange={(e) => setNewCommentAutor(e.target.value)}
            disabled={submittingComment}
          />
          <textarea
            placeholder="Seu comentário"
            value={newCommentConteudo}
            onChange={(e) => setNewCommentConteudo(e.target.value)}
            disabled={submittingComment}
          />
          <button onClick={handleAddComment} disabled={submittingComment}>
            {submittingComment ? 'Enviando...' : 'Adicionar Comentário'}
          </button>
        </div>
        {comments.length === 0 ? (
          <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        ) : (
          <ul className="comments-list">
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.autor}</strong> em {new Date(comment.dataComentario).toLocaleString()}
                <p>{comment.conteudo}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NoticiaDetail;
