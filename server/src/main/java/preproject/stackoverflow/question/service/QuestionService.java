package preproject.stackoverflow.question.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.service.MemberService;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.repository.QuestionRepository;

import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionService(QuestionRepository questionRepository,
                           MemberService memberService) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }

    // 질문 생성
    public Question createQuestion(Question question) {
        // Todo : 회원이 존재하는지 검증
        // 질문 검증을 할 필요가 없다
//        verifyQuestion(question);
        return questionRepository.save(question);
    }

    // Todo : updateQuestion(질문 수정 및 업데이트)

    // Todo : isUpdatable

    // Todo : deleteQuestion

    // Todo : findQuestion (단일 질문 탐색)

    // Todo : verifyActiveMember

    // Todo : findQuestions(질문 리스트 탐색)

    // Todo : verifyQuestion(질문 검증이 필요한지 필요성 공부)
//    public void verifyQuestion(Question question) {
//        Member member = memberService.findMember(question.getMember().getMemberId());
//        isDeleted(question.getQuestionStatus());
//        isAnswered(question.getQuestionStatus());
//        member.addQuestion(question);
//        question.addMember(member);
//    }

//    private static void isDeleted(Question.QuestionStatus questionStatus) {
//        if(questionStatus.equals(Question.QuestionStatus.QUESTION_DELETE)){
//            throw new BusinessLogicException(ExceptionCode.DELETED_QUESTION);
//        }
//    }
//
//    private static void isAnswered(Question.QuestionStatus questionStatus) {
//        if(questionStatus.equals(Question.QuestionStatus.QUESTION_ANSWERED)){
//            throw new BusinessLogicException(ExceptionCode.ANSWERD_QUESTION);
//        }
//    }

    // Todo : 질문 유무 탐색
//    private Question findVerifyQuestion(long questionId) {
//        Optional<Question> question = questionRepository.findById(questionId);
//        return question.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUNDE));
//    }
}
