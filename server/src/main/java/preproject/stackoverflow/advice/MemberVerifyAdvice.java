package preproject.stackoverflow.advice;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import preproject.stackoverflow.answer.dto.AnswerDTO;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.answer.repository.AnswerRepository;
import preproject.stackoverflow.comment.dto.CommentDTO;
import preproject.stackoverflow.comment.entity.Comment;
import preproject.stackoverflow.comment.repository.CommentRepository;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.repository.MemberRepository;
import preproject.stackoverflow.question.dto.QuestionDTO;
import preproject.stackoverflow.question.entity.Question;
import preproject.stackoverflow.question.repository.QuestionRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Optional;

@Component
@Aspect
@Slf4j
public class MemberVerifyAdvice {
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final CommentRepository commentRepository;

    public MemberVerifyAdvice(MemberRepository memberRepository, QuestionRepository questionRepository, AnswerRepository answerRepository, CommentRepository commentRepository) {
        this.memberRepository = memberRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.commentRepository = commentRepository;
    }

    /**
     * 회원 수정, 회원 삭제 주체 검증
     * @param joinPoint
     */
    @Before("execution(* patchMember(..)) || execution(* deleteMember(..))")
    public void verifyMember(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        long authenticatedMemberId = Long.parseLong(request.getUserPrincipal().getName());
        long memberId = extractIdFromUri(request, "/members/");

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        optionalMember.ifPresentOrElse(member -> {
            if (member.getMemberId() != authenticatedMemberId) throw new AccessDeniedException(HttpStatus.FORBIDDEN.toString());
        }, () -> {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        });
    }

    /**
     * 질문 수정, 질문 삭제 주체 검증
     * @param joinPoint
     */
    @Before("execution(* patchQuestion(..)) || execution(* deleteQuestion(..)) || execution(* postAnsweredQuestion(..))")
    public void verifyMemberInQuestion(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        long authenticatedMemberId = Long.parseLong(request.getUserPrincipal().getName());
        long questionId = extractIdFromUri(request, "/questions/");

        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        optionalQuestion.ifPresentOrElse(question -> {
            if (question.getMember() != null) {
                if (question.getMember().getMemberId() != authenticatedMemberId) throw new AccessDeniedException(HttpStatus.FORBIDDEN.toString());
            }
        }, () -> {
            throw new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND);
        });
    }

    /**
     * 답변 수정, 답변 삭제 주체 검증
     * @param joinPoint
     */
    @Before("execution(* patchAnswer(..)) || execution(* deleteAnswer(..))")
    public void verifyMemberInAnswer(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        long authenticatedMemberId = Long.parseLong(request.getUserPrincipal().getName());
        long answerId = extractIdFromUri(request, "/answers/");

        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        optionalAnswer.ifPresentOrElse(answer -> {
            if(answer.getMember() != null){
                if(answer.getMember().getMemberId() != authenticatedMemberId) throw new AccessDeniedException(HttpStatus.FORBIDDEN.toString());
            }
        }, () -> {
            throw new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND);
        });
    }

    /**
     * 댓글 수정, 댓글 삭제 주체 검증
     * @param joinPoint
     */
    @Before("execution(* patchComment(..)) || execution(* deleteComment(..))")
    public void verifyMemberInComment(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        long authenticatedMemberId = Long.parseLong(request.getUserPrincipal().getName());
        long commentId = extractIdFromUri(request, "/comments/");

        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        optionalComment.ifPresentOrElse(comment -> {
            if(comment.getMember() != null){
                if(comment.getMember().getMemberId() != authenticatedMemberId) throw new AccessDeniedException(HttpStatus.FORBIDDEN.toString());
            }
        }, () -> {
            throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND);
        });
    }

    /**
     * 질문 등록, 답변 등록, 댓글 등록, 질문 추천, 답변 추천 주체 검증
     * @param joinPoint
     */
    @Before("execution(* postQuestion(..)) || execution(* postAnswer(..)) || execution(* postComment(..)) || execution(* *Votes(..))")
    public void verifyMemberInRegistration(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        long authenticatedMemberId = Long.parseLong(request.getUserPrincipal().getName());
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();

        Class parameterType = null;
        Object arg = null;
        for (int i = 0; i < joinPoint.getArgs().length; i++) {
            parameterType = signature.getParameterTypes()[i];
            if (parameterType.toString().contains("DTO")) {
                arg = joinPoint.getArgs()[i];
                break;
            }
        }
        BeanWrapper beanWrapper = new BeanWrapperImpl(parameterType.cast(arg));
        long memberId = Long.parseLong(beanWrapper.getPropertyValue("memberId").toString());
        if(memberId != authenticatedMemberId) throw new AccessDeniedException(HttpStatus.FORBIDDEN.toString());

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

    }

    /**
     * URI에서 id값을 추출하는 메서드
     * @param request
     * @param prefix 추출할 id를 지정하기 위한 prefix
     * @return id
     */
    private long extractIdFromUri(HttpServletRequest request, String prefix) {
        String servletPath = request.getServletPath();

        if (servletPath.contains(prefix)) {
            String substring = servletPath.substring(servletPath.indexOf(prefix) + prefix.length());
            if(substring.contains("/")) return Long.parseLong(substring.substring(0, substring.indexOf("/")));
            else return Long.parseLong(substring);
        } else {
            throw new RuntimeException("Cannot extract id");
        }
    }
}
