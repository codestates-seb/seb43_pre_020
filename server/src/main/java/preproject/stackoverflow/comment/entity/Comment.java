package preproject.stackoverflow.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Comment {
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;
    @ManyToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;
}
