package com.jornal.service;

import com.jornal.model.User;
import com.jornal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    // For simplicity, hardcoded admin user
    public void createAdminIfNotExists() {
        if (findByUsername("admin") == null) {
            User admin = new User("admin", "admin123");
            save(admin);
        }
    }
}
