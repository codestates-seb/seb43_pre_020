package preproject.stackoverflow.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.stackoverflow.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
