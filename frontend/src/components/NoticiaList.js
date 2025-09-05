import React from 'react';

const NoticiaList = ({ noticias }) => {
  return (
    <div className="noticia-list">
      {noticias.map(noticia => (
        <article key={noticia.id} className="noticia-card">
          <h2>{noticia.titulo}</h2>
          {noticia.imagemUrl && (
            <img src={noticia.imagemUrl} alt={noticia.titulo} />
          )}
          <p>{noticia.conteudo}</p>
          <small>Por {noticia.autor} em {new Date(noticia.dataPublicacao).toLocaleDateString()}</small>
        </article>
      ))}
    </div>
  );
};

export default NoticiaList;
