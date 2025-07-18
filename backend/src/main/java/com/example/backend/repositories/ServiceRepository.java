package com.example.backend.repositories;

import com.example.backend.entities.ServiceE;
import com.example.backend.entities.ServiceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceE, ServiceId> {
}
