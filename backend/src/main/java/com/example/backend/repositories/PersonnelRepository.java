package com.example.backend.repositories;

import com.example.backend.entities.Personnel;
import com.example.backend.entities.PersonnelId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, PersonnelId> {

}
