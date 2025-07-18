package com.example.backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ADMINS")
public class Admin {
    @Id
    private String cin;

    private String nom;
    private String prenom;
    private String password; // Stocké crypté en pratique

    // Constructeurs
    public Admin() {}

    public Admin(String cin, String nom, String prenom, String password) {
        this.cin = cin;
        this.nom = nom;
        this.prenom = prenom;
        this.password = password;
    }

    // Getters et Setters
    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}