package preproject.stackoverflow.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import preproject.stackoverflow.validator.NotSpace;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

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

    @Getter
    public static class Patch{
        // DiplayName, title, aboutMe 수정
        @Setter
        private Long memberId;
        @NotSpace
        private String displayName;
        private String title;
        private String aboutMe;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        // TODO : Response에 담을 변수 정확히 공부
        private long memberId;
        private String email;
        private String displayName;
        private String title;
        private String aboutMe;
        private String imageFileName;
        private LocalDateTime createdAt;
        private LocalDateTime lastLoginTime;
        private LocalDateTime lastActivityTime;
        // 비밀번호, 질문 작성수, 답변수, memberStatus 등등 고려
        // TODO : 수정 시간 추가
    }

}
