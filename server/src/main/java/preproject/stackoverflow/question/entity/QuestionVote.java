package preproject.stackoverflow.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.member.entity.Member;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuestionVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionVoteId;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private QuestionVoteStatus questionVoteStatus = QuestionVoteStatus.NONE;

    public enum QuestionVoteStatus {
        DOWNVOTE, NONE, UPVOTE
    }
}
