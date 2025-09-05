package com.jornal.controller;

import com.jornal.model.Noticia;
import com.jornal.service.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/noticias")
public class NoticiaController {

    @Autowired
    private NoticiaService noticiaService;

    @GetMapping
    public List<Noticia> listarNoticias() {
        return noticiaService.listarTodas();
    }

    @PostMapping
    public ResponseEntity<?> salvarNoticia(
            @RequestParam String titulo,
            @RequestParam String conteudo,
            @RequestParam String autor,
            @RequestParam(required = false) MultipartFile imagem) {
        try {
            // Validações básicas
            if (titulo == null || titulo.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Título é obrigatório");
            }
            if (conteudo == null || conteudo.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Conteúdo é obrigatório");
            }
            if (autor == null || autor.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Autor é obrigatório");
            }

            System.out.println("Recebendo notícia: " + titulo + " por " + autor);
            Noticia noticia = noticiaService.salvar(titulo.trim(), conteudo.trim(), autor.trim(), imagem);
            System.out.println("Notícia salva com ID: " + noticia.getId());
            return ResponseEntity.ok(noticia);
        } catch (IllegalArgumentException e) {
            System.err.println("Erro de validação: " + e.getMessage());
            return ResponseEntity.badRequest().body("Dados inválidos: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Erro ao salvar notícia: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro interno do servidor: " + e.getMessage());
        }
    }

    @GetMapping("/healthz")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("OK");
    }
}

