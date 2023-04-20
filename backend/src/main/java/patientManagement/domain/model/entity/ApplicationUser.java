package patientManagement.domain.model.entity;


import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
public class ApplicationUser {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long userId;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String role;

    @OneToMany(mappedBy = "recordNumber")
    private Set<Patient> patients;

    @OneToMany(mappedBy = "taskNumber")
    private Set<Task> tasks;


    public ApplicationUser(String firstName, String lastName, String role, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public ApplicationUser() {

    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getRole() {
        return role;
    }

    public Long getUserId() {
        return userId;
    }
}
