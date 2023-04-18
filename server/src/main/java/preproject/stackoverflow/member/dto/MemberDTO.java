package preproject.stackoverflow.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDTO {
    @Getter
    public static class Post {
        @NotBlank(message = "회원 이름은 공백이 아니어야 합니다.")
        private String displayName;
        @Email
        @NotBlank
        private String email;
        @NotBlank(message = "비밀 번호는 공백이 아니어야 합니다.")
        private String password;
    }
}
