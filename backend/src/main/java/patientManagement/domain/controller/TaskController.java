package patientManagement.domain.controller;

import org.springframework.web.bind.annotation.*;
import patientManagement.domain.controller.exceptions.TaskNotFoundException;
import patientManagement.domain.model.entity.Task;
import patientManagement.domain.repository.TaskRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("")
    List<Task> all() { return taskRepository.findAll(); }

    @GetMapping("/doctor/{doctorId}")
    List<Task> getTasksByDoctor(@PathVariable("doctorId") Long doctorId) {
        return taskRepository.findByDoctorUserId(doctorId);
    }

    @PostMapping("/task")
    Task saveTask(@RequestBody Task newTask) {
        return taskRepository.save(newTask);
    }

    @DeleteMapping("/{id}")
    void deletePatient(@PathVariable Long id) {
        taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
        taskRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    Task putTask(@RequestBody Task newTask, @PathVariable Long id) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(newTask.getTitle());
                    task.setDescription(newTask.getDescription());
                    task.setCompleted(newTask.isCompleted());
                    task.setDueDate(newTask.getDueDate());
                    task.setCreatedDate(newTask.getCreatedDate());
                    task.setTags(newTask.getTags());
                    return taskRepository.save(task);
                })
                .orElseGet(() -> taskRepository.save(newTask));
    }

    @PatchMapping("/{id}")
    Task updateTaskComplete(@RequestBody Task revisedTask, @PathVariable Long id) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setCompleted(revisedTask.isCompleted());
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

}
