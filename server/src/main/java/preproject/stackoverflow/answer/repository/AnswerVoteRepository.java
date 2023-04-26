package preproject.stackoverflow.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.stackoverflow.answer.entity.AnswerVote;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Long> {
}
