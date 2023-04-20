package preproject.stackoverflow.question.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;

public class QuestionDTO {
    @Getter
    public static class Post {
        @Positive
        private long memberId;
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }
    @Getter
    public static class Patch {
        @Setter
        private Long questionId;
        @Pattern(regexp = "\\S+")
        private String title;
        @Pattern(regexp = "\\S+")
        private String content;

    }
}
