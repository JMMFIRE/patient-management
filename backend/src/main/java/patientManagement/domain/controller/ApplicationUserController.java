package patientManagement.domain.controller;

import org.springframework.web.bind.annotation.*;
import patientManagement.domain.model.dto.LoginDto;
import patientManagement.domain.model.entity.ApplicationUser;
import patientManagement.domain.repository.ApplicationUserRepository;

import java.util.List;
import java.util.Objects;


@RestController
@RequestMapping("/users")
public class ApplicationUserController {

    private final ApplicationUserRepository applicationUserRepository;

    public ApplicationUserController(ApplicationUserRepository applicationUserRepository) {
        this.applicationUserRepository = applicationUserRepository;
    }

    @GetMapping("")
    List<ApplicationUser> all() {return applicationUserRepository.findAll(); }

    @PostMapping("/login")
    ApplicationUser loginUser(@RequestBody LoginDto credentials) {
        ApplicationUser loggedInUser = null;
        ApplicationUser user = applicationUserRepository.findByEmail(credentials.getEmail());

        if(Objects.equals(user.getEmail(), credentials.getEmail()) && Objects.equals(user.getPassword(), credentials.getPassword()))
             loggedInUser = user;
        else
            throw new RuntimeException("Invalid credentials");

        return loggedInUser;
    }
}
