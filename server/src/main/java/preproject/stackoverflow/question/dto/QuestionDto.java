package preproject.stackoverflow.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.question.entity.Question;

import java.time.LocalDateTime;

public class QuestionDto {
    @Getter
//    @AllArgsConstructor
    public static class Post {
        private Long memberId;
        private String title;
        private String content;

    }


    @Getter
    @AllArgsConstructor
    public static class Patch {
        @Setter
        private Long questionId;
        private Long memberId;
        private String title;
        private String content;
//        private Question.Access access;
    }

    // Todo :
    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long questionId;
        private String title;
        private String content;
        private String usernames;
        private Integer likes;
        private Integer views;
        private String questionStatus;
        private String access;
        private Answer answer;
        private LocalDateTime createAt;
        private LocalDateTime updateAt;
    }
}
