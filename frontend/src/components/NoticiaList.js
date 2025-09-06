import React from 'react';

const NoticiaList = ({ noticias, onSelectNoticia }) => {
  return (
    <div className="noticia-list">
      {noticias.map(noticia => (
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
            <button style={{marginLeft: '10px'}} onClick={async (e) => {
              e.stopPropagation();
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
              } catch (err) {
                alert(err.message);
              }
            }}>Curtir</button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default NoticiaList;
