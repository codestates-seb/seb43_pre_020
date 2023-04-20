package preproject.stackoverflow.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;

import javax.persistence.*;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerId;

    @Column(name = "BODY", nullable = false)
    private String body;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    @OneToMany(mappedBy = "answer")
    private List<Comment> comments = new ArrayList<>();

    @Column(name = "CREATION_DATE", nullable = false)
    private LocalDateTime creationdate = LocalDateTime.now();


    @Enumerated(value = EnumType.STRING)
    @Column(name = "ANSWER_STATUS" , length = 20, nullable = false)
    private AnswerStatus answerStatus = AnswerStatus.ANSWER_REGISTRATION;
    public  enum AnswerStatus{
        ANSWER_REGISTRATION( "답변 등록"),
        ANSWER_CHOICE( "답변 채택");


        @Getter
        private String status;

        AnswerStatus(String status){
            this.status =status;
        }


    }
}

