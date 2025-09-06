package com.jornal.controller;

import com.jornal.model.Comment;
import com.jornal.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/noticia/{noticiaId}")
    public ResponseEntity<List<Comment>> getCommentsByNoticia(@PathVariable String noticiaId) {
        List<Comment> comments = commentService.findByNoticiaId(noticiaId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(@RequestBody Map<String, String> commentData) {
        String noticiaId = commentData.get("noticiaId");
        String autor = commentData.get("autor");
        String conteudo = commentData.get("conteudo");

        if (noticiaId == null || autor == null || conteudo == null) {
            return ResponseEntity.badRequest().build();
        }

        Comment comment = new Comment(noticiaId, autor, conteudo);
        Comment savedComment = commentService.save(comment);
        return ResponseEntity.ok(savedComment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {
        commentService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
