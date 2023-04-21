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

import java.time.LocalDateTime;
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
        // 인증된 회원인지는 시큐리티를 통해서 인증
        Question findQuestion = findVerifiedQuestion(question.getQuestionId());
//        isUpdatable(findQuestion.getQuestionStatus()); // 질문 수정 가능 여부. 추후 수정 요망
        // 질문 수정시 업데이트 되는 내용 : 제목, 내용, 질문상태, 답변, 접근은 필요없음, 조회수?
        Optional.ofNullable(question.getTitle())
                .ifPresent(findQuestion::setTitle);
        Optional.ofNullable(question.getContent())
                .ifPresent(findQuestion::setContent);

        // TODO : 수정시간 추후 업데이트
//        findQuestion.setModifiedAt(LocalDateTime.now());

        // Todo : 질문 수정 시 상태값만 반환
        return questionRepository.save(findQuestion);
    }
    // Todo : 답변이 채택 된 상태에서 질문 수정이 가능한지 논의 필요
    private void isUpdatable(Question.QuestionStatus questionStatus) {
        if(!questionStatus.equals(Question.QuestionStatus.QUESTION_REGISTRATION)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE);
        }
    }

    @Override
    public Question findQuestion(Long questionId) {
        return null;
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
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        return optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    private void verifyQuestion(Question question) {
        Long memberId = question.getMember().getMemberId();
        memberService.findVerifiedMember(memberId);
    }
}
