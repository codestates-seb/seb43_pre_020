package preproject.stackoverflow.question.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.service.MemberService;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.entity.QuestionVote;
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
            throw new BusinessLogicException(ExceptionCode.QUESTION_CANNOT_UPDATE);
        }
    }

    @Override
    public Question findQuestion(Long questionId) {
        Question question = findVerifiedQuestion(questionId);
        question.setView(question.getView() + 1);
        return question;
    }

    @Override
    public Page<Question> findQuestions(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by("questionId").descending());
        return questionRepository.findAllByQuestionNotDeleted(pageRequest);
    }

    @Override
    public void deleteQuestion(Long questionId) {
        Question findQuestion = findVerifiedQuestion(questionId);
        // 질문 상태를 삭제로 반환
        findQuestion.setQuestionStatus(Question.QuestionStatus.QUESTION_DELETED);
        questionRepository.save(findQuestion);
//        questionRepository.delete(findQuestion);
    }

    @Override
    public void adoptAnswerInQuestion(Long questionId, Long answerId) {
        Question findQuestion = findVerifiedQuestion(questionId);
        if (findQuestion.getQuestionStatus() == Question.QuestionStatus.QUESTION_ANSWERED) {
            throw new BusinessLogicException(ExceptionCode.ANSWER_CANNOT_ADOPT);
        }
        Optional<Answer> optionalAnswer = findQuestion.getAnswers().stream()
                .filter(answer -> answer.getAnswerId() == answerId)
                .findAny();
        Answer answer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        answer.setAnswerStatus(Answer.AnswerStatus.ANSWER_ADOPTED);
        findQuestion.setQuestionStatus(Question.QuestionStatus.QUESTION_ANSWERED);
    }

    /**
     * questionId를 기반으로 질문을 찾습니다.
     * 질문에는 투표(좋아요, 싫어요) 내역이 들어 있습니다.
     * 투표 내역에 현재 투표 요청을 한 유저의 투표가 있을 경우 그 투표를 수정합니다.
     * 없을 경우 투표 내역을 추가합니다.
     * @param questionVote
     * @return
     */
    @Override
    public Question addVoteToQuestion(QuestionVote questionVote) {
        Question findQuestion = findVerifiedQuestion(questionVote.getQuestion().getQuestionId());
        Optional<QuestionVote> vote = findQuestion.getQuestionVotes().stream()
                .filter(findQuestionVote -> findQuestionVote.getMember().getMemberId() == questionVote.getMember().getMemberId())
                .findAny();
        if (vote.isPresent()) {
            QuestionVote findQuestionVote = vote.get();
            if (questionVote.getQuestionVoteStatus() == QuestionVote.QuestionVoteStatus.NONE) {
                findQuestion.getQuestionVotes().remove(findQuestionVote);
                findQuestionVote.setQuestion(null);
                findQuestionVote.setMember(null);
            } else {
                findQuestionVote.setQuestionVoteStatus(questionVote.getQuestionVoteStatus());
            }
        } else if (questionVote.getQuestionVoteStatus() != QuestionVote.QuestionVoteStatus.NONE){
            findQuestion.addQuestionVote(questionVote);
        }
        return findQuestion;
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
