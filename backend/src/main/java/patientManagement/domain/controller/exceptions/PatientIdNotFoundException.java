package patientManagement.domain.controller.exceptions;

public class PatientIdNotFoundException extends RuntimeException {

    public PatientIdNotFoundException(Long id) {
        super("Could not find patient number " + id);
    }
}
