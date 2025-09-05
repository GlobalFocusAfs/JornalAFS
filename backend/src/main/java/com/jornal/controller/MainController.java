package com.jornal.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/")
    public ResponseEntity<String> home() {
        return ResponseEntity.ok("Jornal da EEEP Adolfo Ferreira de Sousa API");
    }
}
