package com.jornal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "comments")
public class Comment {
    @Id
    private String id;
    private String noticiaId;
    private String autor;
    private String conteudo;
    private LocalDateTime dataComentario;
    private boolean aprovado;

    public Comment() {}

    public Comment(String noticiaId, String autor, String conteudo) {
        this.noticiaId = noticiaId;
        this.autor = autor;
        this.conteudo = conteudo;
        this.dataComentario = LocalDateTime.now();
        this.aprovado = true; // Por padrão, comentários são aprovados
    }

    // Getters e Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNoticiaId() {
        return noticiaId;
    }

    public void setNoticiaId(String noticiaId) {
        this.noticiaId = noticiaId;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public LocalDateTime getDataComentario() {
        return dataComentario;
    }

    public void setDataComentario(LocalDateTime dataComentario) {
        this.dataComentario = dataComentario;
    }

    public boolean isAprovado() {
        return aprovado;
    }

    public void setAprovado(boolean aprovado) {
        this.aprovado = aprovado;
    }
}
