package preproject.stackoverflow.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.audit.Auditable;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@Getter
@Setter
@Where(clause = "comment_status <> 'COMMENT_DELETED'")
public class Comment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    @Column(nullable = false, length = 2000)
    private String body;

    @Enumerated(EnumType.STRING)
    @Column(length = 30, nullable = false)
    private CommentStatus commentStatus = CommentStatus.COMMENT_REGISTRATION;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    @ManyToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    public enum CommentStatus {
        COMMENT_REGISTRATION("댓글 등록"), COMMENT_DELETED("댓글 삭제");
        @Getter
        private String status;

        CommentStatus(String status) {
            this.status = status;
        }
    }
}
