package preproject.stackoverflow.question.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.entity.Question;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("FROM Question q LEFT JOIN q.answers a ON a.answerStatus = 'ANSWER_DELETED' " +
            "LEFT JOIN a.comments ac ON ac.commentStatus = 'COMMENT_DELETED' " +
            "LEFT JOIN q.comments qc ON qc.commentStatus = 'COMMENT_DELETED' " +
            "WHERE q.questionId = :questionId")
    Optional<Question> findByIdNotDeleted(long questionId);

    @Query("FROM Question q WHERE q.questionStatus <> 'QUESTION_DELETED'")
    Page<Question> findAllByQuestionNotDeleted(Pageable pageable);

    Page<Question> findAllByQuestionStatus(Pageable pageable, Question.QuestionStatus questionStatus);
}
