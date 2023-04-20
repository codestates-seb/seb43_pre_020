package preproject.stackoverflow.question.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.member.service.MemberService;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.repository.QuestionRepository;

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
        return null;
    }

    @Override
    public Page<Question> findQuestions(int page, int size) {
        return null;
    }

    @Override
    public void deleteQuestion(Long questionId) {

    }

    private void verifyQuestion(Question question) {
        Long memberId = question.getMember().getMemberId();
        memberService.findVerifiedMember(memberId);
    }
}
