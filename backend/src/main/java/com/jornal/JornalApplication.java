package com.jornal;

import com.jornal.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class JornalApplication {
    public static void main(String[] args) {
        SpringApplication.run(JornalApplication.class, args);
    }

    @Bean
    public CommandLineRunner createAdmin(UserService userService) {
        return args -> {
            userService.createAdminIfNotExists();
        };
    }
}

