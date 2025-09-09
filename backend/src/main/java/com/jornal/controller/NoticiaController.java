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

    @GetMapping("/{id}")
    public ResponseEntity<?> obterNoticiaPorId(@PathVariable String id) {
        Noticia noticia = noticiaService.buscarPorId(id);
        if (noticia == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(noticia);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> curtirNoticia(@PathVariable String id) {
        Noticia noticia = noticiaService.curtir(id);
        if (noticia == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(noticia);
    }

    @PostMapping
    public ResponseEntity<?> salvarNoticia(
            @RequestParam String titulo,
            @RequestParam String conteudo,
            @RequestParam String autor,
            @RequestParam(required = false) String categoria,
            @RequestParam(required = false) String tags,
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
            Noticia noticia = noticiaService.salvar(titulo.trim(), conteudo.trim(), autor.trim(), categoria, tags, imagem);
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

    @GetMapping("/categorias")
    public ResponseEntity<List<String>> getCategorias() {
        List<String> categorias = noticiaService.getCategorias();
        return ResponseEntity.ok(categorias);
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Noticia>> getNoticiasByCategoria(@PathVariable String categoria) {
        List<Noticia> noticias = noticiaService.buscarPorCategoria(categoria);
        return ResponseEntity.ok(noticias);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarNoticia(@PathVariable String id) {
        boolean deleted = noticiaService.deletar(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/healthz")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("OK");
    }
}

