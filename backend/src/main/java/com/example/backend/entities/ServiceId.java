package com.example.backend.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;

@Embeddable
public class ServiceId implements Serializable {
    @Column(name = "cod_soc")
    private String codSoc;

    @Column(name = "cod_serv")
    private String codServ;

    public ServiceId() {}

    public ServiceId(String codSoc, String codServ) {
        this.codSoc = codSoc;
        this.codServ = codServ;
    }

    public String getCodSoc() {
        return codSoc;
    }

    public void setCodSoc(String codSoc) {
        this.codSoc = codSoc;
    }

    public String getCodServ() {
        return codServ;
    }

    public void setCodServ(String codServ) {
        this.codServ = codServ;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ServiceId)) return false;
        ServiceId that = (ServiceId) o;
        return Objects.equals(codSoc, that.codSoc) &&
                Objects.equals(codServ, that.codServ);
    }

    @Override
    public int hashCode() {
        return Objects.hash(codSoc, codServ);
    }
}