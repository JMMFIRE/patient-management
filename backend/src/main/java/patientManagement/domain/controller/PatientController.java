package patientManagement.domain.controller;

import org.springframework.web.bind.annotation.*;
import patientManagement.domain.controller.exceptions.PatientExistsException;
import patientManagement.domain.controller.exceptions.PatientIdNotFoundException;
import patientManagement.domain.model.entity.Patient;
import patientManagement.domain.repository.PatientRepository;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @GetMapping("")
    List<Patient> all() {return patientRepository.findAll(); }

    @GetMapping("/doctor/{doctorId}")
    List<Patient> getPatientsByDoctor(@PathVariable("doctorId") Long doctorId) {
        return patientRepository.findByDoctorUserId(doctorId);
    }

    @PostMapping("/patient")
    Patient savePatient(@RequestBody Patient newPatient) {
        return patientRepository.save(newPatient);
    }

    @DeleteMapping("/{id}")
    void deletePatient(@PathVariable Long id) {
        patientRepository.findById(id)
                .orElseThrow(() -> new PatientIdNotFoundException(id));
        patientRepository.deleteById(id);
    }
}
