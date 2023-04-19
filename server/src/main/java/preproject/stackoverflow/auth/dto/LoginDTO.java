package preproject.stackoverflow.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
public class LoginDTO {
    private String username;
    private String password;
    private boolean autoLogin;
}
