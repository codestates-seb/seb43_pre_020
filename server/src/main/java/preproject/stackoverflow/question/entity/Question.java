package preproject.stackoverflow.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.entity.BaseEntity;
import preproject.stackoverflow.member.entity.Member;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Question{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    @Column(nullable = false, length = 100)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime createTime = LocalDateTime.now();

    @Column(nullable = false)
    private Integer view = 0;

    // 질문 상태 : 등록, 답변 완료, 삭제
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private QuestionStatus questionStatus = QuestionStatus.QUESTION_REGISTRATION;

    // 접근 권한
    @Enumerated(EnumType.STRING)
    private Access access = Access.PUBLIC;

//    @OneToOne(cascade = CascadeType.PERSIST)
//    @JoinColumn(name = "ANSWER_ID")
//    private Answer answer;
    // 질문 1 : 답변 다
    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Answer> answer;

    // 외래키 매핑 = 멤버 1 : 질문 다
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void addMember(Member member) {
        if(this.member != member) {
            this.member = member;
        }
    }
    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
    private List<Answer> answers = new ArrayList<>();
    @OneToMany(mappedBy = "question")
    private List<Comment> comments = new ArrayList<>();

    public enum QuestionStatus {
        QUESTION_REGISTRATION("질문 등록"),
        QUESTION_ANSWERED("답변 완료"),
        QUESTION_DELETE("질문 삭제");
        @Getter
        private final String status;

        QuestionStatus(String status) {
            this.status = status;
        }
    }

    public enum Access {
        PUBLIC("공개"),
        SECRET("비공개");
        @Getter
        private final String status;

        Access(String status) {
            this.status = status;
        }

    }
}
