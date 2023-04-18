package preproject.stackoverflow.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.stackoverflow.answer.entity.Answer;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
