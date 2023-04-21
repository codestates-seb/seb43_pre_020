package preproject.stackoverflow.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import preproject.stackoverflow.auth.mapper.AuthMapper;
import preproject.stackoverflow.auth.service.AuthService;
import preproject.stackoverflow.member.entity.Member;

@RestController
public class AuthController {
    private final AuthService authService;
    private final AuthMapper mapper;

    public AuthController(AuthService authService, AuthMapper mapper) {
        this.authService = authService;
        this.mapper = mapper;
    }

    @GetMapping("/auth/refresh")
    public ResponseEntity<?> getRefreshToken() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        String email = (String) authentication.getPrincipal();
        Member member = authService.findMemberByEmail(email);
        return new ResponseEntity<>(mapper.MemberToProfileDTO(member), HttpStatus.OK);
    }
}
