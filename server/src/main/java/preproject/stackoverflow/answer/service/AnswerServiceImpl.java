package preproject.stackoverflow.answer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.answer.repository.AnswerRepository;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.service.MemberService;
import preproject.stackoverflow.question.service.QuestionService;

import java.util.Optional;

@Service
@Transactional
public class AnswerServiceImpl implements AnswerService{
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final QuestionService questionService;

    public AnswerServiceImpl(AnswerRepository answerRepository, MemberService memberService, QuestionService questionService){
        this.answerRepository = answerRepository;
        this.memberService = memberService;
        this.questionService = questionService;
    }
    public Answer createAnswer(Answer answer){
        verifyAnswer(answer);
        return answerRepository.save(answer);
    }

    @Override
    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getBody())
                .ifPresent(body-> findAnswer.setBody(body));

        return answerRepository.save(findAnswer);
    }

    @Override
    public void deleteAnswer(Answer answer) {

    }
    public Answer findVerifiedAnswer(long answerId){
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }

    private void verifyAnswer(Answer answer) {
        Long memberId = answer.getMember().getMemberId();
        memberService.findVerifiedMember(memberId);
        Long questionId = answer.getQuestion().getQuestionId();
        questionService.findVerifiedQuestion(questionId);
    }
}
