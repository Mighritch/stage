package com.example.backend.services;

import com.example.backend.entities.Admin;
import com.example.backend.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Admin signUp(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }

    public Admin signIn(String cin, String password) {
        Admin admin = adminRepository.findByCin(cin);
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        }
        return null;
    }
}