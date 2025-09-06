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

    public void vote(String pollId, String option) {
        Poll poll = findById(pollId);
        if (poll != null && poll.getVotes().containsKey(option)) {
            poll.getVotes().put(option, poll.getVotes().get(option) + 1);
            salvar(poll);
        }
    }
}
