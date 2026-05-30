package com.gauransh.jwtauth.config;

import com.gauransh.jwtauth.model.Role;
import com.gauransh.jwtauth.model.User;
import com.gauransh.jwtauth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Seed default ROLE_USER if not exists
        if (!userRepository.existsByUsername("user")) {
            User standardUser = new User(
                    "user",
                    "user@secureauth.io",
                    passwordEncoder.encode("password"),
                    Role.USER
            );
            userRepository.save(standardUser);
            System.out.println(">>> Seeded default user: user / password (ROLE_USER)");
        }

        // Seed default ROLE_ADMIN if not exists
        if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User(
                    "admin",
                    "admin@secureauth.io",
                    passwordEncoder.encode("password"),
                    Role.ADMIN
            );
            userRepository.save(adminUser);
            System.out.println(">>> Seeded default admin: admin / password (ROLE_ADMIN)");
        }
    }
}
