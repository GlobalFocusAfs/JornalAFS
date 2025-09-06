package com.jornal.repository;

import com.jornal.model.Noticia;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticiaRepository extends MongoRepository<Noticia, String> {
    List<Noticia> findByCategoria(String categoria);
    List<String> findDistinctCategoria();
}

