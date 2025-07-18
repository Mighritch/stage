package com.example.backend.services;

import com.example.backend.entities.ServiceE;
import com.example.backend.entities.ServiceId;
import com.example.backend.repositories.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceEService {

    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceEService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<ServiceE> findAll() {
        return serviceRepository.findAll();
    }

    public Optional<ServiceE> findById(ServiceId id) {
        return serviceRepository.findById(id);
    }

    public ServiceE save(ServiceE service) {  // Corrigé le type de retour
        return serviceRepository.save(service);
    }

    public void deleteById(ServiceId id) {
        serviceRepository.deleteById(id);
    }
}