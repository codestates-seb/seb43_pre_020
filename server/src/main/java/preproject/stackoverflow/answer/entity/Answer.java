package preproject.stackoverflow.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.audit.Auditable;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;
    @Column(nullable = false, length = 2000)
    private String body;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    @OneToMany(mappedBy = "answer", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();
//    @Column(nullable = false)
//    private LocalDateTime createdAt = LocalDateTime.now();
    @Enumerated(value = EnumType.STRING)
    @Column(length = 30, nullable = false)
    private AnswerStatus answerStatus = AnswerStatus.ANSWER_REGISTRATION;
    public enum AnswerStatus{
        ANSWER_REGISTRATION("답변 등록"),
        ANSWER_ADOPTED("답변 채택");
        @Getter
        private String status;

        AnswerStatus(String status){
            this.status =status;
        }


    }
}


