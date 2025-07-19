package com.example.backend.services;

import com.example.backend.entities.Personnel;
import com.example.backend.entities.PersonnelId;
import com.example.backend.repositories.PersonnelRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class PersonnelService {

    @Autowired
    private PersonnelRepository personnelRepository;

    @Value("${twilio.phone.number}")
    private String twilioPhoneNumber;

    private static final String ALPHA_NUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int MAT_PERS_LENGTH = 5;

    public List<Personnel> findAll() {
        return personnelRepository.findAll();
    }

    public Optional<Personnel> findById(PersonnelId id) {
        return personnelRepository.findById(id);
    }

    public Personnel save(Personnel personnel) {
        if (personnel.getId().getMatPers() == null || personnel.getId().getMatPers().isEmpty()) {
            String codSoc = personnel.getId().getCodSoc();
            String matPers = generateMatPers(codSoc);
            personnel.getId().setMatPers(matPers);
        }

        // Save the personnel to the database
        Personnel savedPersonnel = personnelRepository.save(personnel);

        // Send SMS with the matricule if phone number is provided
        if (savedPersonnel.getPhoneNumber() != null && !savedPersonnel.getPhoneNumber().isEmpty()) {
            try {
                String messageBody = "Bienvenue ! Votre matricule est : " + savedPersonnel.getId().getMatPers();
                Message message = Message.creator(
                                new PhoneNumber(savedPersonnel.getPhoneNumber()),
                                new PhoneNumber(twilioPhoneNumber),
                                messageBody)
                        .create();
            } catch (Exception e) {
                // Log the error but don't fail the save operation
                System.err.println("Failed to send SMS to " + savedPersonnel.getPhoneNumber() + ": " + e.getMessage());
            }
        }

        return savedPersonnel;
    }

    public void deleteById(PersonnelId id) {
        personnelRepository.deleteById(id);
    }

    private String generateMatPers(String codSoc) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(MAT_PERS_LENGTH);
        String matPers;

        do {
            sb.setLength(0);
            for (int i = 0; i < MAT_PERS_LENGTH; i++) {
                int index = random.nextInt(ALPHA_NUMERIC.length());
                sb.append(ALPHA_NUMERIC.charAt(index));
            }
            matPers = sb.toString();
        } while (personnelRepository.existsById(new PersonnelId(codSoc, matPers)));

        return matPers;
    }
}