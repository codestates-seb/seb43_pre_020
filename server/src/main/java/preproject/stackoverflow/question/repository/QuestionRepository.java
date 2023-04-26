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
    Page<Question> findAllByQuestionStatus(Pageable pageable, Question.QuestionStatus questionStatus);
}
