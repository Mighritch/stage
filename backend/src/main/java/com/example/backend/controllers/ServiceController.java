package com.example.backend.controllers;

import com.example.backend.entities.ServiceE;
import com.example.backend.entities.ServiceId;
import com.example.backend.services.ServiceEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*") // à adapter selon ton frontend
public class ServiceController {

    @Autowired
    private ServiceEService serviceService;

    @GetMapping
    public List<ServiceE> getAll() {
        return serviceService.findAll();
    }

    @GetMapping("/{codSoc}/{codServ}")
    public ResponseEntity<ServiceE> getById(@PathVariable String codSoc, @PathVariable String codServ) {
        ServiceId id = new ServiceId(codSoc, codServ);
        return serviceService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ServiceE create(@RequestBody ServiceE service) {
        return serviceService.save(service);
    }

    @PutMapping
    public ServiceE update(@RequestBody ServiceE service) {
        return serviceService.save(service);
    }

    @DeleteMapping("/{codSoc}/{codServ}")
    public ResponseEntity<Void> delete(@PathVariable String codSoc, @PathVariable String codServ) {
        ServiceId id = new ServiceId(codSoc, codServ);
        serviceService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
