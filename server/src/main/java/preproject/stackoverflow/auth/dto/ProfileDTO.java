package preproject.stackoverflow.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import preproject.stackoverflow.member.entity.Member;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ProfileDTO {
    private long memberId;
    private String email;
    private String displayName;
    private String title;
    private String aboutMe;
    private Member.OAuth2Status oAuth2Status;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginTime;
    private LocalDateTime lastActivityTime;
}
