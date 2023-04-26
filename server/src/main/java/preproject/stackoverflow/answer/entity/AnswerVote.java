package preproject.stackoverflow.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.member.entity.Member;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AnswerVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long AnswerVoteId;
    @ManyToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AnswerVoteStatus answerVoteStatus = AnswerVoteStatus.NONE;

    public enum AnswerVoteStatus{
        DOWNVOTE, NONE, UPVOTE
    }
}
