package preproject.stackoverflow.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Answer {
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    @OneToMany(mappedBy = "answer")
    private List<Comment> comments = new ArrayList<>();
}
