package com.example.backend.controllers;

import com.example.backend.entities.Admin;
import com.example.backend.repositories.AdminRepository;
import com.example.backend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<Admin> signUp(@RequestBody Admin admin) {
        // Vérifie si l'admin existe déjà
        if (adminRepository.existsById(admin.getCin())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        // Crypte le mot de passe
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));

        Admin savedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(savedAdmin);
    }

    @PostMapping("/signin")
    public ResponseEntity<Admin> signIn(@RequestBody Admin credentials) {
        Admin admin = authService.signIn(credentials.getCin(), credentials.getPassword());
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}