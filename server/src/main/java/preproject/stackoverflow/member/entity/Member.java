package preproject.stackoverflow.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.entity.QuestionVote;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Column(length = 100)
    private String password;
    @Column(length = 100)
    private String email;
    @Column(length = 100)
    private String displayName;
    @Column(length = 100)
    private String title;
    @Column(length = 2000)
    private String aboutMe;
    private String imageFileName;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OAuth2Status oAuth2Status = OAuth2Status.NONE;
    private Long githubId;
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(nullable = false)
    private LocalDateTime lastLoginTime = LocalDateTime.now();
    @Column(nullable = false)
    private LocalDateTime lastActivityTime = LocalDateTime.now();
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<Question> questions = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<Answer> answers = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    private List<QuestionVote> questionVotes = new ArrayList<>();

    public void addQuestion(Question question) {
        questions.add(question);
    }

    public void addAnswer(Answer answer) {
        answers.add(answer);
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("탈퇴 상태");
        @Getter
        private String status;
        MemberStatus(String status) {
            this.status = status;
        }
    }

    public enum OAuth2Status {
        NONE, GOOGLE, GITHUB
    }
}
