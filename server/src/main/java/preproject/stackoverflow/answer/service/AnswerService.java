package preproject.stackoverflow.answer.service;

import preproject.stackoverflow.answer.entity.Answer;

public interface AnswerService {
    Answer createAnswer(Answer answer);

    Answer updateAnswer(Answer answer);

    void deleteAnswer(Long answerId);

    Answer findVerifiedAnswer(Long answerId);
}
