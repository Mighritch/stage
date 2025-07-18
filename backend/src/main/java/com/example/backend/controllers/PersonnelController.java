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
@CrossOrigin(origins = "*") // à adapter selon ton frontend
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
        Document document = new Document();
        PdfWriter.getInstance(document, outputStream);

        document.open();

        // Titre
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, BaseColor.BLACK);
        Paragraph title = new Paragraph("Liste du Personnel", font);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        // Tableau
        PdfPTable table = new PdfPTable(4);
        table.setWidthPercentage(100);

        // En-têtes
        Stream.of("ID", "Nom", "Prénom", "Service").forEach(header -> {
            PdfPCell cell = new PdfPCell();
            cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
            cell.setPadding(5);
            cell.setPhrase(new Phrase(header));
            table.addCell(cell);
        });

        // Données
        for (Personnel p : personnels) {
            table.addCell(p.getId().getCodSoc() + "/" + p.getId().getMatPers());
            table.addCell(p.getNomPers());
            table.addCell(p.getPrenPers());
            table.addCell(p.getService() != null ? p.getService().getLibServ() : "");
        }

        document.add(table);
        document.close();

        byte[] bytes = outputStream.toByteArray();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=personnel_list.pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(bytes);
    }
}