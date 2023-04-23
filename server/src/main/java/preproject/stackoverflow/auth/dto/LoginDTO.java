package preproject.stackoverflow.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
public class LoginDTO {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    private boolean autoLogin;
}
