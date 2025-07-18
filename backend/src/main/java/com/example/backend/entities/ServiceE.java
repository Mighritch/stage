package com.example.backend.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "services") // Évite le conflit avec le mot-clé SQL "service"
public class ServiceE {
    @EmbeddedId
    private ServiceId id;

    private String libServ;
    private String abrServ; // Corrigé de "abrasion" à "abrServ"
    private String typeServ;
    private String libServA;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Personnel> personnels;

    public ServiceE() {}

    public ServiceId getId() {
        return id;
    }

    public void setId(ServiceId id) {
        this.id = id;
    }

    public String getLibServ() {
        return libServ;
    }

    public void setLibServ(String libServ) {
        this.libServ = libServ;
    }

    public String getAbrServ() {
        return abrServ;
    }

    public void setAbrServ(String abrServ) {
        this.abrServ = abrServ;
    }

    public String getTypeServ() {
        return typeServ;
    }

    public void setTypeServ(String typeServ) {
        this.typeServ = typeServ;
    }

    public String getLibServA() {
        return libServA;
    }

    public void setLibServA(String libServA) {
        this.libServA = libServA;
    }

    public List<Personnel> getPersonnels() {
        return personnels;
    }

    public void setPersonnels(List<Personnel> personnels) {
        this.personnels = personnels;
    }
}