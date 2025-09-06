import React from 'react';

const NoticiaList = ({ noticias, onSelectNoticia, isLoggedIn, onDelete }) => {
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
            {noticia.imagemUrl && (
              <img src={noticia.imagemUrl} alt={noticia.titulo} />
            )}
            <div className="noticia-content">
              <h2 onClick={() => onSelectNoticia(noticia.id)}>{noticia.titulo}</h2>
              {noticia.categoria && <span className="categoria">{noticia.categoria}</span>}
              <p>{noticia.conteudo.length > 150 ? noticia.conteudo.substring(0, 150) + '...' : noticia.conteudo}</p>
              <small>Por {noticia.autor} em {new Date(noticia.dataPublicacao).toLocaleDateString()}</small>
              {noticia.tags && noticia.tags.length > 0 && (
                <div className="tags">
                  {noticia.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag.trim()}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="noticia-stats">
              <div className="stats-info">
                <span><i className="fas fa-eye"></i> {noticia.visualizacoes || 0}</span>
                <span><i className="fas fa-heart"></i> {noticia.likes || 0}</span>
              </div>
              <div className="action-buttons">
                <button
                  className={`curtir-btn ${isLiked ? 'liked' : ''}`}
                  onClick={(e) => handleCurtir(noticia, e)}
                  disabled={isLiked}
                >
                  <i className={`fas fa-heart ${isLiked ? 'solid' : ''}`}></i>
                  {isLiked ? 'Curtido' : 'Curtir'}
                </button>
                <button className="ler-mais-btn" onClick={() => onSelectNoticia(noticia.id)}>
                  Ler mais
                </button>
                {isLoggedIn && (
                  <button className="excluir-btn" onClick={async (e) => {
                    e.stopPropagation();
                    if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
                      try {
                        const apiBase = process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL !== 'undefined' ? process.env.REACT_APP_API_URL : 'https://jornalafs.onrender.com';
                        const response = await fetch(`${apiBase}/api/noticias/${noticia.id}`, {
                          method: 'DELETE',
                          headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                          }
                        });
                        if (!response.ok) {
                          throw new Error('Erro ao excluir a notícia');
                        }
                        alert('Notícia excluída com sucesso!');
                        onDelete();
                      } catch (error) {
                        alert('Erro ao excluir a notícia: ' + error.message);
                      }
                    }
                  }}>
                    Excluir
                  </button>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default NoticiaList;
