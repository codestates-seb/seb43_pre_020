package preproject.stackoverflow.answer.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class AnswerDTO {
    @Getter
    public static class Post {
        @Positive
        private long memberId;
        @Setter
        private long questionId;
        @NotBlank
        private String body;

    }
}
