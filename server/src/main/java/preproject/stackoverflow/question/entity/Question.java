package preproject.stackoverflow.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.audit.Auditable;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.member.entity.Member;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Where(clause = "question_status <> 'QUESTION_DELETED'")
public class Question extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    @Column(nullable = false, length = 100)
    private String title;
    @Column(nullable = false, length = 2000)
    private String content;
//    @Column(nullable = false)
//    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private Long view = 0L;
    @Column(nullable = false)
    private Long votes = 0L;

    // 질문 상태 : 등록, 답변 완료, 삭제
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private QuestionStatus questionStatus = QuestionStatus.QUESTION_REGISTRATION;
    // 외래키 매핑 = 멤버 1 : 질문 다
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();
    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();
    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<QuestionVote> questionVotes = new ArrayList<>();

    public void addQuestionVote(QuestionVote questionVote) {
        questionVotes.add(questionVote);
    }

    public void setVotes() {
        long upVotes = questionVotes.stream()
                .filter(questionVote -> questionVote.getQuestionVoteStatus() == QuestionVote.QuestionVoteStatus.UPVOTE)
                .count();
        long downVotes = questionVotes.stream()
                .filter(questionVote -> questionVote.getQuestionVoteStatus() == QuestionVote.QuestionVoteStatus.DOWNVOTE)
                .count();
        votes = upVotes - downVotes;
    }

    public enum QuestionStatus {
        QUESTION_REGISTRATION("질문 등록"),
        QUESTION_ANSWERED("답변 완료"),
        QUESTION_DELETED("질문 삭제");
        @Getter
        private final String status;

        QuestionStatus(String status) {
            this.status = status;
        }
    }
}
