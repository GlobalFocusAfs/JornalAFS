package com.jornal.repository;

import com.jornal.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByNoticiaIdOrderByDataComentarioDesc(String noticiaId);
    List<Comment> findByNoticiaIdAndAprovadoOrderByDataComentarioDesc(String noticiaId, boolean aprovado);
}
