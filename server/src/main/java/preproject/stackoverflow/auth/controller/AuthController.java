package preproject.stackoverflow.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @GetMapping("/refresh")
    public ResponseEntity<?> getRefreshToken() {
        return ResponseEntity.ok().build();
    }
}
