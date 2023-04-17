package preproject.stackoverflow.question.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.member.entity.Member;

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
public class Question {
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();
    @OneToMany(mappedBy = "question")
    private List<Comment> comments = new ArrayList<>();
}
