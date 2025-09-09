package com.jornal.repository;

import com.jornal.model.Noticia;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoticiaRepository extends MongoRepository<Noticia, String> {
    List<Noticia> findByCategoria(String categoria);

    @Query(value = "{ 'categoria': { $ne: null, $ne: '' } }", fields = "{'categoria': 1}")
    List<Noticia> findAllCategorias();

    default List<String> findDistinctCategoria() {
        return findAllCategorias().stream()
                .map(Noticia::getCategoria)
                .filter(categoria -> categoria != null && !categoria.trim().isEmpty())
                .distinct()
                .toList();
    }
}

