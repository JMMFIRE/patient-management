package patientManagement.domain.controller.exceptions;

public class PatientExistsException extends RuntimeException {
    public PatientExistsException(String firstName, String lastName) {
        super("Patient '" + firstName + " " + lastName + "' already exists");
    }
}
