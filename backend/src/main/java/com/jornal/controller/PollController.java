package com.jornal.controller;

import com.jornal.model.Poll;
import com.jornal.service.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    @Autowired
    private PollService pollService;

    @GetMapping
    public List<Poll> listarPolls() {
        return pollService.listarTodas();
    }

    @PostMapping
    public ResponseEntity<?> salvarPoll(@RequestBody Map<String, Object> pollMap) {
        try {
            String question = (String) pollMap.get("question");
            List<String> options = (List<String>) pollMap.get("options");

            if (question == null || question.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Pergunta é obrigatória");
            }
            if (options == null || options.size() < 2) {
                return ResponseEntity.badRequest().body("Pelo menos 2 opções são necessárias");
            }

            Poll poll = new Poll(question.trim(), options);
            Poll savedPoll = pollService.salvar(poll);
            return ResponseEntity.ok(savedPoll);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro ao salvar enquete: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/vote")
    public ResponseEntity<?> vote(@PathVariable String id, @RequestBody Map<String, String> voteMap) {
        String option = voteMap.get("option");
        if (option == null || option.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Opção é obrigatória");
        }

        pollService.vote(id, option.trim());
        return ResponseEntity.ok("Voto registrado");
    }
}
