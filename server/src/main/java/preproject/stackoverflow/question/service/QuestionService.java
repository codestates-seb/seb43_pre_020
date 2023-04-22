package preproject.stackoverflow.question.service;

import org.springframework.data.domain.Page;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.entity.QuestionVote;

public interface QuestionService {
    Question createQuestion(Question question);

    Question updateQuestion(Question question);

    Question findQuestion(Long questionId);

    Page<Question> findQuestions(int page, int size);

    void deleteQuestion(Long questionId);

    Question addVoteToQuestion(QuestionVote questionVote);

    Question findVerifiedQuestion(Long questionId);
}
