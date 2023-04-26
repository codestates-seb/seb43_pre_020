package preproject.stackoverflow.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import preproject.stackoverflow.answer.entity.AnswerVote;
import preproject.stackoverflow.auth.mapper.AuthMapper;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.QuestionVote;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class ProfileDTO {
    private long memberId;
    private String email;
    private String displayName;
    private String title;
    private String aboutMe;
    private List<QuestionVote> questionVotes;
    private Member.OAuth2Status oAuth2Status;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginTime;
    private LocalDateTime lastActivityTime;
    private  List<AnswerVote> answerVotes;
    @Getter
    @AllArgsConstructor
    public static class QuestionVote {
        private long questionId;
        private preproject.stackoverflow.question.entity.QuestionVote.QuestionVoteStatus voteStatus;
    }
    @Getter
    @AllArgsConstructor
    public  static  class  AnswerVote{
        private long answerId;
        private preproject.stackoverflow.answer.entity.AnswerVote.AnswerVoteStatus VoteStatus;

    }


}
