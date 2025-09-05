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
@CrossOrigin(origins = "*")
public class NoticiaController {

    @Autowired
    private NoticiaService noticiaService;

    @GetMapping
    public List<Noticia> listarNoticias() {
        return noticiaService.listarTodas();
    }

    @PostMapping
    public Noticia salvarNoticia(
            @RequestParam String titulo,
            @RequestParam String conteudo,
            @RequestParam String autor,
            @RequestParam MultipartFile imagem) {
        return noticiaService.salvar(titulo, conteudo, autor, imagem);
    }
}

