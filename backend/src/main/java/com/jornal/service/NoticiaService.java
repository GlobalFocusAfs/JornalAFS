package com.jornal.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.jornal.model.Noticia;
import com.jornal.repository.NoticiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class NoticiaService {

    @Autowired
    private NoticiaRepository repository;

    @Autowired
    private Cloudinary cloudinary;

    public List<Noticia> listarTodas() {
        return repository.findAll();
    }

    public Noticia buscarPorId(String id) {
        return repository.findById(id).orElse(null);
    }

    public Noticia curtir(String id) {
        Noticia noticia = repository.findById(id).orElse(null);
        if (noticia != null) {
            noticia.setLikes(noticia.getLikes() + 1);
            return repository.save(noticia);
        }
        return null;
    }

    public Noticia salvar(String titulo, String conteudo, String autor, MultipartFile imagem) {
        Noticia noticia = new Noticia();
        noticia.setTitulo(titulo);
        noticia.setConteudo(conteudo);
        noticia.setAutor(autor);
        noticia.setDataPublicacao(LocalDateTime.now());

        if (imagem != null && !imagem.isEmpty()) {
            try {
                // Validar tamanho da imagem (máximo 5MB)
                if (imagem.getSize() > 5 * 1024 * 1024) {
                    throw new IllegalArgumentException("Imagem muito grande. Máximo permitido: 5MB");
                }

                // Validar tipo da imagem
                String contentType = imagem.getContentType();
                if (contentType == null || !contentType.startsWith("image/")) {
                    throw new IllegalArgumentException("Arquivo deve ser uma imagem válida");
                }

                Map uploadResult = cloudinary.uploader().upload(imagem.getBytes(), ObjectUtils.emptyMap());
                noticia.setImagemUrl(uploadResult.get("url").toString());
                System.out.println("Imagem enviada com sucesso para Cloudinary: " + noticia.getImagemUrl());
            } catch (IOException e) {
                System.err.println("Erro de I/O ao fazer upload da imagem: " + e.getMessage());
                throw new RuntimeException("Erro ao processar a imagem: " + e.getMessage());
            } catch (Exception e) {
                System.err.println("Erro ao fazer upload da imagem: " + e.getMessage());
                throw new RuntimeException("Erro ao fazer upload da imagem: " + e.getMessage());
            }
        }

        try {
            return repository.save(noticia);
        } catch (Exception e) {
            System.err.println("Erro ao salvar notícia no banco de dados: " + e.getMessage());
            throw new RuntimeException("Erro ao salvar notícia no banco de dados: " + e.getMessage());
        }
    }

    public List<String> getCategorias() {
        return repository.findDistinctCategoria();
    }

    public List<Noticia> buscarPorCategoria(String categoria) {
        return repository.findByCategoria(categoria);
    }

    public boolean deletar(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}

