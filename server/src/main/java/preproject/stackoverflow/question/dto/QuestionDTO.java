package preproject.stackoverflow.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.domain.Page;
import preproject.stackoverflow.answer.dto.AnswerDTO;
import preproject.stackoverflow.comment.dto.CommentDTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.entity.QuestionVote;
import preproject.stackoverflow.validator.NotSpace;

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
        @NotSpace
        private String title;
        @NotSpace
        private String content;

    }

    @Getter
    public static class PostAnswered {
        @Positive
        private long answerId;
    }

    @Getter
    public static class VotePost {
        @Setter
        private long questionId;
        @Positive
        private long memberId;
        private QuestionVote.QuestionVoteStatus voteStatus;
    }


    @Getter
    @AllArgsConstructor
    public static class Response {
        private long questionId;
        private String title;
        private String content;
        private LocalDateTime date;
        private LocalDateTime updatedAt;
        private long memberId;
        private String questioner;
        private String imageFileName;
        private long view;
        private long votes;
        private Question.QuestionStatus questionStatus;
        private List<AnswerDTO.Response> answers;
        private List<CommentDTO.Response> comments;
    }


    @Getter
    public static class ResponseList {
        private List<SimpleResponse> data;
        private PageInfo pageInfo;

        public ResponseList(List<SimpleResponse> data, Page page) {
            this.data = data;
            this.pageInfo = new PageInfo(page.getNumber() + 1, page.getSize(),
                    (int) page.getTotalElements(), page.getTotalPages());
        }

        @Getter
        @AllArgsConstructor
        public static class SimpleResponse {
            private long questionId;
            private String title;
            private String content;
            private LocalDateTime date;
            private LocalDateTime updatedAt;
            private long memberId;
            private String questioner;
            private String imageFileName;
            private long answers;
            private long votes;
            private Question.QuestionStatus questionStatus;

        }

        @Getter
        @AllArgsConstructor
        public static class PageInfo {
            private int page;
            private int size;
            private int totalElements;
            private int totalPages;
        }
    }
}
