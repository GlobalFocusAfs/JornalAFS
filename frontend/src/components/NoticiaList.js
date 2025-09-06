import React from 'react';

const NoticiaList = ({ noticias }) => {
  return (
    <div className="noticia-list">
      {noticias.map(noticia => (
        <article key={noticia.id} className={`noticia-card ${noticia.destaque ? 'destaque' : ''}`}>
          {noticia.destaque && <div className="destaque-badge">DESTAQUE</div>}
          <div className="noticia-header">
            <h2>{noticia.titulo}</h2>
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
          </div>
        </article>
      ))}
    </div>
  );
};

export default NoticiaList;
