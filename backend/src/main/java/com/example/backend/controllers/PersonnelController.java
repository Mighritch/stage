package com.example.backend.controllers;

import com.example.backend.entities.Personnel;
import com.example.backend.entities.PersonnelId;
import com.example.backend.services.PersonnelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/personnels")
@CrossOrigin(origins = "*")
public class PersonnelController {

    @Autowired
    private PersonnelService personnelService;

    @GetMapping
    public List<Personnel> getAll() {
        return personnelService.findAll();
    }

    @GetMapping("/{codSoc}/{matPers}")
    public ResponseEntity<Personnel> getById(@PathVariable String codSoc, @PathVariable String matPers) {
        PersonnelId id = new PersonnelId(codSoc, matPers);
        return personnelService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Personnel create(@RequestBody Personnel personnel) {
        return personnelService.save(personnel);
    }

    @PutMapping
    public Personnel update(@RequestBody Personnel personnel) {
        return personnelService.save(personnel);
    }

    @DeleteMapping("/{codSoc}/{matPers}")
    public ResponseEntity<Void> delete(@PathVariable String codSoc, @PathVariable String matPers) {
        PersonnelId id = new PersonnelId(codSoc, matPers);
        personnelService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportToPdf() throws DocumentException, IOException {
        List<Personnel> personnels = personnelService.findAll();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4.rotate());
        PdfWriter.getInstance(document, outputStream);

        document.open();

        // Titre
        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.DARK_GRAY);
        Paragraph title = new Paragraph("LISTE DU PERSONNEL", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        title.setSpacingAfter(20f);
        document.add(title);

        // Tableau
        PdfPTable table = new PdfPTable(5);
        table.setWidthPercentage(100);
        table.setWidths(new float[]{3, 3, 2, 2, 2});

        // En-têtes
        Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, BaseColor.WHITE);
        Stream.of("NOM", "PRÉNOM", "CIN", "MATRICULE", "SERVICE").forEach(header -> {
            PdfPCell cell = new PdfPCell();
            cell.setBackgroundColor(new BaseColor(33, 150, 243));
            cell.setPadding(8);
            cell.setPhrase(new Phrase(header, headerFont));
            table.addCell(cell);
        });

        // Données
        Font dataFont = FontFactory.getFont(FontFactory.HELVETICA, 10);
        for (Personnel p : personnels) {
            addCell(table, p.getNomPers(), dataFont);
            addCell(table, p.getPrenPers(), dataFont);
            addCell(table, p.getCin() != null ? p.getCin() : "-", dataFont);
            addCell(table, p.getId().getMatPers(), dataFont);
            addCell(table, p.getService() != null ? p.getService().getId().getCodServ() : "-", dataFont);
        }

        document.add(table);
        document.close();

        byte[] bytes = outputStream.toByteArray();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=liste_personnel.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(bytes);
    }

    private void addCell(PdfPTable table, String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setPadding(5);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.addCell(cell);
    }
}