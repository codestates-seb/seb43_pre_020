package preproject.stackoverflow.answer.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static com.fasterxml.jackson.databind.type.LogicalType.DateTime;

/*@Entity
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
} */

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
    @JoinColumn(name = "BODY")
    private String body;
    private   DateTime createdDate;

    public Answer(Member member, Question question, String body) {
        this.member = member;
        this.question = question;
        this.text = text;
        this.createdDate = DateTime.now();
    }

    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setAnswer(this);
    }

    public void removeComment(Comment comment) {
        comments.remove(comment);
        comment.setAnswer(null);
    }

    // CRUD functions

    public static Answer createAnswer(Member member, Question question, String body) {
        Answer answer = new Answer(member, question, body);
        EntityManager entityManager = JPAUtil.getEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            entityManager.persist(answer);
            transaction.commit();
        } catch (Exception ex) {
            if (transaction != null && transaction.isActive()) {
                transaction.rollback();
            }
            ex.printStackTrace();
        } finally {
            entityManager.close();
        }
        return answer;
    }



    public static void updateAnswer(Answer answer) {
        EntityManager entityManager = JPAUtil.getEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            entityManager.merge(answer);
            transaction.commit();
        } catch (Exception ex) {
            if (transaction != null && transaction.isActive()) {
                transaction.rollback();
            }
            ex.printStackTrace();
        } finally {
            entityManager.close();
        }
    }

    public static void deleteAnswer(Answer answer) {
        EntityManager entityManager = JPAUtil.getEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();
        try {
            transaction.begin();
            entityManager.remove(answer);
            transaction.commit();
        } catch (Exception ex) {
            if (transaction != null && transaction.isActive()) {
                transaction.rollback();
            }
            ex.printStackTrace();
        } finally {
            entityManager.close();
        }
    }
}
//  Member, Question 및 Comment 엔터티를 이미 만들고 데이터베이스 연결을 관리하기 위해
//  JPAUtil 클래스를 설정했다고 가정합니다.
