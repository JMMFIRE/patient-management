package patientManagement.domain.model.entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long taskNumber;
    private String title;
    private String description;
    private boolean completed;
    private Date createdDate;
    private Date dueDate;
    @ElementCollection
    private List<String> tags;

    @Nonnull
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private ApplicationUser doctor;



    public Task(String title, String description, boolean completed, Date createdDate, List<String> tags) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdDate = createdDate;
        this.tags = tags;
    }

    public Task() {

    }

    public ApplicationUser getDoctor() {
        return doctor;
    }

    public long getTaskNumber() {
        return taskNumber;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public List<String> getTags() {
        return tags;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public void setDoctor(ApplicationUser doctor) {
        this.doctor = doctor;
    }
}
