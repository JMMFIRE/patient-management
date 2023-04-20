package patientManagement.domain.model.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long recordNumber;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String sex;
    private String phoneNumber;
    private String diagnosis;
    private String status;
    private String notes;
    private Date lastAppointment;
    private Date nextAppointment;

    @Nonnull
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private ApplicationUser doctor;

    public ApplicationUser getDoctor() {
        return doctor;
    }

    public void setDoctor(ApplicationUser doctor) {
        this.doctor = doctor;
    }

    public Patient(String firstName, String lastName, Date dateOfBirth, String sex, String phoneNumber, String diagnosis, String status, String notes, Date lastAppointment, Date nextAppointment) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.sex = sex;
        this.phoneNumber = phoneNumber;
        this.diagnosis = diagnosis;
        this.status = status;
        this.notes = notes;
        this.lastAppointment = lastAppointment;
        this.nextAppointment = nextAppointment;
    }

    public Patient() {

    }

    public long getRecordNumber() {
        return recordNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public String getSex() {
        return sex;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public String getStatus() {
        return status;
    }

    public String getNotes() {
        return notes;
    }

    public Date getLastAppointment() {
        return lastAppointment;
    }

    public Date getNextAppointment() {
        return nextAppointment;
    }

}
