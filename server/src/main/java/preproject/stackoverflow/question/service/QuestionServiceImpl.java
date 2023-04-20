package preproject.stackoverflow.question.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.service.MemberService;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.repository.QuestionRepository;

import java.util.Optional;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService{
    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionServiceImpl(QuestionRepository questionRepository, MemberService memberService) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }

    @Override
    public Question createQuestion(Question question) {
        verifyQuestion(question);
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return null;
    }

    @Override
    public Question findQuestion(Long questionId) {
        return findVerifiedQuestion(questionId);
    }

    @Override
    public Page<Question> findQuestions(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by("questionId").descending());
        return questionRepository.findAllByQuestionNotDeleted(pageRequest);
    }

    @Override
    public void deleteQuestion(Long questionId) {

    }
    @Override
    public Question findVerifiedQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findByIdNotDeleted(questionId);
        return optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    private void verifyQuestion(Question question) {
        Long memberId = question.getMember().getMemberId();
        memberService.findVerifiedMember(memberId);
    }
}
