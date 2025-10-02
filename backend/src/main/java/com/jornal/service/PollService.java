package com.jornal.service;

import com.jornal.model.Poll;
import com.jornal.repository.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    public List<Poll> listarTodas() {
        return pollRepository.findAll();
    }

    public Poll salvar(Poll poll) {
        return pollRepository.save(poll);
    }

    public Poll findById(String id) {
        return pollRepository.findById(id).orElse(null);
    }

    public void vote(String pollId, String option, String ip) {
        Poll poll = findById(pollId);
        if (poll != null && poll.getVotes().containsKey(option)) {
            if (poll.getVotedIPs().contains(ip)) {
                throw new IllegalArgumentException("Este IP já votou nesta enquete.");
            }
            poll.getVotes().put(option, poll.getVotes().get(option) + 1);
            poll.getVotedIPs().add(ip);
            salvar(poll);
        }
    }
}
