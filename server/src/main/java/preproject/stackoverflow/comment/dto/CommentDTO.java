package preproject.stackoverflow.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

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
        private long questionId;
    }

    @Getter
    @Setter
    public static class AnswerPost extends Post {
        private long answerId;
    }

    @Getter
    public static class Patch {
        @Setter
        private Long commentId;
        @NotBlank
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long commentId;
        private String body;
        private long memberId;
        private String commenter;
        private LocalDateTime date;
    }
}
