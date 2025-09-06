package com.jornal.service;

import com.jornal.model.Comment;
import com.jornal.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> findByNoticiaId(String noticiaId) {
        return commentRepository.findByNoticiaIdAndAprovadoOrderByDataComentarioDesc(noticiaId, true);
    }

    public Comment save(Comment comment) {
        return commentRepository.save(comment);
    }

    public void deleteById(String id) {
        commentRepository.deleteById(id);
    }

    public Comment findById(String id) {
        return commentRepository.findById(id).orElse(null);
    }
}
