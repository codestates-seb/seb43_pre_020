package preproject.stackoverflow.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import preproject.stackoverflow.question.entity.QuestionVote;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
}
