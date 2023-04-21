package preproject.stackoverflow.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ProfileDTO {
    private long memberId;
    private String email;
    private String displayName;
    private String title;
    private String aboutMe;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginTime;
    private LocalDateTime lastActivityTime;
}
