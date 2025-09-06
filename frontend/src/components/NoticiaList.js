import React from 'react';

const NoticiaList = ({ noticias, onSelectNoticia }) => {
  const getLikedNews = () => {
    const liked = localStorage.getItem('likedNews');
    return liked ? JSON.parse(liked) : [];
  };

  const setLikedNews = (liked) => {
    localStorage.setItem('likedNews', JSON.stringify(liked));
  };

  const handleCurtir = async (noticia, e) => {
    e.stopPropagation();
    const likedNews = getLikedNews();
    if (likedNews.includes(noticia.id)) {
      alert('Você já curtiu esta notícia!');
      return;
    }
    try {
      const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
      const response = await fetch(`${apiBase}/api/noticias/${noticia.id}/like`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Erro ao curtir a notícia');
      }
      const data = await response.json();
      noticia.likes = data.likes;
      likedNews.push(noticia.id);
      setLikedNews(likedNews);
      // Force re-render
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="noticia-list">
      {noticias.map(noticia => {
        const likedNews = getLikedNews();
        const isLiked = likedNews.includes(noticia.id);
        return (
          <article key={noticia.id} className={`noticia-card ${noticia.destaque ? 'destaque' : ''}`}>
            {noticia.destaque && <div className="destaque-badge">DESTAQUE</div>}
            <div className="noticia-header">
              <h2 style={{cursor: 'pointer', color: 'blue'}} onClick={() => onSelectNoticia(noticia.id)}>{noticia.titulo}</h2>
              {noticia.categoria && <span className="categoria">{noticia.categoria}</span>}
            </div>
            {noticia.imagemUrl && (
              <img src={noticia.imagemUrl} alt={noticia.titulo} />
            )}
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
              <span>❤️ {noticia.likes || 0}</span>
              <button onClick={(e) => handleCurtir(noticia, e)} disabled={isLiked}>
                {isLiked ? 'Curtido' : 'Curtir'}
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default NoticiaList;
