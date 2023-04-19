package preproject.stackoverflow.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class CommentDTO {
    @Getter
    public static class Post {
        @Positive
        private long memberId;
        @NotBlank
        private String body;
    }

    @Getter
    @Setter
    public static class QuestionPost extends Post {
        @Positive
        private long questionId;
    }

    @Getter
    @Setter
    public static class AnswerPost extends Post {
        @Positive
        private long answerId;
    }

    @Getter
    public static class Patch {
        private Long commentId;
        @NotBlank
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long commentId;
        private String body;
        private LocalDateTime creationDate;
    }
}
