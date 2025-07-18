package com.example.backend.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;

@Embeddable
public class PersonnelId implements Serializable {
    @Column(name = "cod_soc")
    private String codSoc;

    @Column(name = "mat_pers")
    private String matPers;


    public PersonnelId() {}

    public PersonnelId(String codSoc, String matPers) {
        this.codSoc = codSoc;
        this.matPers = matPers;
    }

    public String getCodSoc() {
        return codSoc;
    }

    public void setCodSoc(String codSoc) {
        this.codSoc = codSoc;
    }

    public String getMatPers() {
        return matPers;
    }

    public void setMatPers(String matPers) {
        this.matPers = matPers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PersonnelId)) return false;
        PersonnelId that = (PersonnelId) o;
        return Objects.equals(codSoc, that.codSoc) &&
                Objects.equals(matPers, that.matPers);
    }

    @Override
    public int hashCode() {
        return Objects.hash(codSoc, matPers);
    }
}