package com.jornal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Document(collection = "polls")
public class Poll {
    @Id
    private String id;
    private String question;
    private List<String> options;
    private Map<String, Integer> votes; // option -> count
    private Set<String> votedIPs; // IPs que já votaram
    private LocalDateTime createdAt;

    public Poll() {}

    public Poll(String question, List<String> options) {
        this.question = question;
        this.options = options;
        this.votes = new java.util.HashMap<>();
        for (String option : options) {
            this.votes.put(option, 0);
        }
        this.votedIPs = new java.util.HashSet<>();
        this.createdAt = LocalDateTime.now();
    }

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public Map<String, Integer> getVotes() {
        return votes;
    }

    public void setVotes(Map<String, Integer> votes) {
        this.votes = votes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Set<String> getVotedIPs() {
        if (votedIPs == null) {
            votedIPs = new java.util.HashSet<>();
        }
        return votedIPs;
    }

    public void setVotedIPs(Set<String> votedIPs) {
        this.votedIPs = votedIPs;
    }
}
