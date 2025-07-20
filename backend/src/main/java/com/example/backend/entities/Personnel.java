package com.example.backend.entities;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "PERSONNEL")
public class Personnel {
    @EmbeddedId
    private PersonnelId id;

    private String nomPers;
    private String prenPers;
    private String nomPersA;
    private String prenPersA;
    private String nomJf;
    private String nomJfA;
    private String cin;
    private String sexe;
    private String codSit;
    private String phoneNumber; // New field

    @Temporal(TemporalType.DATE)
    private Date datSit;

    private String chefFam;
    private Integer nbreEnf;
    private String chargEnf;
    private String chargAll;
    private String fctFam;

    @Temporal(TemporalType.DATE)
    private Date datEnt;

    @Temporal(TemporalType.DATE)
    private Date datTit;

    private String codFonct;
    private String codCateg;
    private String codCat;
    private String codGrad;
    private String codMotif;
    private String codNatp;
    private String codStat;

    @Temporal(TemporalType.DATE)
    private Date datServ;

    @Temporal(TemporalType.DATE)
    private Date datFonct;

    @Temporal(TemporalType.DATE)
    private Date datQualf;

    @Temporal(TemporalType.DATE)
    private Date datCateg;

    @Temporal(TemporalType.DATE)
    private Date datCat;

    @Temporal(TemporalType.DATE)
    private Date datGrad;

    @Temporal(TemporalType.DATE)
    private Date datEch;

    @Temporal(TemporalType.DATE)
    private Date datEmb;

    @Temporal(TemporalType.DATE)
    private Date datMotif;

    @Temporal(TemporalType.DATE)
    private Date datNais;

    private String etatAct;

    private String role;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(
                    name = "cod_soc",
                    referencedColumnName = "cod_soc",
                    insertable = false,
                    updatable = false
            ),
            @JoinColumn(
                    name = "cod_serv",
                    referencedColumnName = "cod_serv",
                    insertable = false,
                    updatable = false
            )
    })
    private ServiceE service;

    // Constructeurs
    public Personnel() {}

    // Getters et setters pour tous les attributs
    public PersonnelId getId() {
        return id;
    }

    public void setId(PersonnelId id) {
        this.id = id;
    }

    public String getNomPers() {
        return nomPers;
    }

    public void setNomPers(String nomPers) {
        this.nomPers = nomPers;
    }

    public String getPrenPers() {
        return prenPers;
    }

    public void setPrenPers(String prenPers) {
        this.prenPers = prenPers;
    }

    public String getNomPersA() {
        return nomPersA;
    }

    public void setNomPersA(String nomPersA) {
        this.nomPersA = nomPersA;
    }

    public String getPrenPersA() {
        return prenPersA;
    }

    public void setPrenPersA(String prenPersA) {
        this.prenPersA = prenPersA;
    }

    public String getNomJf() {
        return nomJf;
    }

    public void setNomJf(String nomJf) {
        this.nomJf = nomJf;
    }

    public String getNomJfA() {
        return nomJfA;
    }

    public void setNomJfA(String nomJfA) {
        this.nomJfA = nomJfA;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }


    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public String getCodSit() {
        return codSit;
    }

    public void setCodSit(String codSit) {
        this.codSit = codSit;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Date getDatSit() {
        return datSit;
    }

    public void setDatSit(Date datSit) {
        this.datSit = datSit;
    }

    public String getChefFam() {
        return chefFam;
    }

    public void setChefFam(String chefFam) {
        this.chefFam = chefFam;
    }

    public Integer getNbreEnf() {
        return nbreEnf;
    }

    public void setNbreEnf(Integer nbreEnf) {
        this.nbreEnf = nbreEnf;
    }

    public String getChargEnf() {
        return chargEnf;
    }

    public void setChargEnf(String chargEnf) {
        this.chargEnf = chargEnf;
    }

    public String getChargAll() {
        return chargAll;
    }

    public void setChargAll(String chargAll) {
        this.chargAll = chargAll;
    }

    public String getFctFam() {
        return fctFam;
    }

    public void setFctFam(String fctFam) {
        this.fctFam = fctFam;
    }

    public Date getDatEnt() {
        return datEnt;
    }

    public void setDatEnt(Date datEnt) {
        this.datEnt = datEnt;
    }

    public Date getDatTit() {
        return datTit;
    }

    public void setDatTit(Date datTit) {
        this.datTit = datTit;
    }

    public String getCodFonct() {
        return codFonct;
    }

    public void setCodFonct(String codFonct) {
        this.codFonct = codFonct;
    }

    public String getCodCateg() {
        return codCateg;
    }

    public void setCodCateg(String codCateg) {
        this.codCateg = codCateg;
    }

    public String getCodCat() {
        return codCat;
    }

    public void setCodCat(String codCat) {
        this.codCat = codCat;
    }

    public String getCodGrad() {
        return codGrad;
    }

    public void setCodGrad(String codGrad) {
        this.codGrad = codGrad;
    }

    public String getCodMotif() {
        return codMotif;
    }

    public void setCodMotif(String codMotif) {
        this.codMotif = codMotif;
    }

    public String getCodNatp() {
        return codNatp;
    }

    public void setCodNatp(String codNatp) {
        this.codNatp = codNatp;
    }

    public String getCodStat() {
        return codStat;
    }

    public void setCodStat(String codStat) {
        this.codStat = codStat;
    }

    public Date getDatServ() {
        return datServ;
    }

    public void setDatServ(Date datServ) {
        this.datServ = datServ;
    }

    public Date getDatFonct() {
        return datFonct;
    }

    public void setDatFonct(Date datFonct) {
        this.datFonct = datFonct;
    }

    public Date getDatQualf() {
        return datQualf;
    }

    public void setDatQualf(Date datQualf) {
        this.datQualf = datQualf;
    }

    public Date getDatCateg() {
        return datCateg;
    }

    public void setDatCateg(Date datCateg) {
        this.datCateg = datCateg;
    }

    public Date getDatCat() {
        return datCat;
    }

    public void setDatCat(Date datCat) {
        this.datCat = datCat;
    }

    public Date getDatGrad() {
        return datGrad;
    }

    public void setDatGrad(Date datGrad) {
        this.datGrad = datGrad;
    }

    public Date getDatEch() {
        return datEch;
    }

    public void setDatEch(Date datEch) {
        this.datEch = datEch;
    }

    public Date getDatEmb() {
        return datEmb;
    }

    public void setDatEmb(Date datEmb) {
        this.datEmb = datEmb;
    }

    public Date getDatMotif() {
        return datMotif;
    }

    public void setDatMotif(Date datMotif) {
        this.datMotif = datMotif;
    }

    public Date getDatNais() {
        return datNais;
    }

    public void setDatNais(Date datNais) {
        this.datNais = datNais;
    }

    public String getEtatAct() {
        return etatAct;
    }

    public void setEtatAct(String etatAct) {
        this.etatAct = etatAct;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public ServiceE getService() {
        return service;
    }

    public void setService(ServiceE service) {
        this.service = service;
    }
}