package preproject.stackoverflow.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.answer.entity.AnswerVote;
import preproject.stackoverflow.comment.dto.CommentDTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

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
    @Getter
    public static class Patch{
        @Setter
        private long answerId;
        @NotBlank
        private String body;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long answerId;
        private String body;
        private long memberId;
        private String answerer;
        private String imageFileName;
        private Answer.AnswerStatus answerStatus;
        private LocalDateTime date;
        private LocalDateTime updatedAt;
        private List<CommentDTO.Response> comments;
        private long votes;
    }
    @Getter
    public static  class VotePost{
        @Setter
        private long answerId;
        @Positive
        private long memberId;
        private AnswerVote.AnswerVoteStatus voteStatus;


    }
}
