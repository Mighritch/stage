package com.example.backend.services;

import com.example.backend.entities.Personnel;
import com.example.backend.entities.PersonnelId;
import com.example.backend.repositories.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonnelService {

    @Autowired
    private PersonnelRepository personnelRepository;

    public List<Personnel> findAll() {
        return personnelRepository.findAll();
    }

    public Optional<Personnel> findById(PersonnelId id) {
        return personnelRepository.findById(id);
    }

    public Personnel save(Personnel personnel) {
        return personnelRepository.save(personnel);
    }

    public void deleteById(PersonnelId id) {
        personnelRepository.deleteById(id);
    }
}
