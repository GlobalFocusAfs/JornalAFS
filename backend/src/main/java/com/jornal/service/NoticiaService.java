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

    public Noticia salvar(String titulo, String conteudo, String autor, MultipartFile imagem) {
        Noticia noticia = new Noticia();
        noticia.setTitulo(titulo);
        noticia.setConteudo(conteudo);
        noticia.setAutor(autor);
        noticia.setDataPublicacao(LocalDateTime.now());

        if (imagem != null && !imagem.isEmpty()) {
            try {
                Map uploadResult = cloudinary.uploader().upload(imagem.getBytes(), ObjectUtils.emptyMap());
                noticia.setImagemUrl(uploadResult.get("url").toString());
            } catch (IOException e) {
                throw new RuntimeException("Falha ao fazer upload da imagem", e);
            }
        }

        return repository.save(noticia);
    }
}
