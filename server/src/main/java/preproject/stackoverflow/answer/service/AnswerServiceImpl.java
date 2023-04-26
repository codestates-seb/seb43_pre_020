package preproject.stackoverflow.answer.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.answer.entity.AnswerVote;
import preproject.stackoverflow.answer.repository.AnswerRepository;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.service.MemberService;
import preproject.stackoverflow.question.service.QuestionService;

import java.util.Optional;

@Service
@Transactional
public class AnswerServiceImpl implements AnswerService {
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final QuestionService questionService;

    public AnswerServiceImpl(AnswerRepository answerRepository, MemberService memberService, QuestionService questionService) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
        this.questionService = questionService;
    }

    public Answer createAnswer(Answer answer){
        Member member = verifyAnswer(answer);
        answer.setMember(member);
        return answerRepository.save(answer);
    }

    @Override
    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());

        Optional.ofNullable(answer.getBody())
                .ifPresent(body -> findAnswer.setBody(body));

        return answerRepository.save(findAnswer);
    }

    @Override
    public void deleteAnswer(Long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);
        answerRepository.delete(findAnswer);
    }

    @Override
    public Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        return optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }

    private Member verifyAnswer(Answer answer) {
        Long questionId = answer.getQuestion().getQuestionId();
        questionService.findVerifiedQuestion(questionId);
        Long memberId = answer.getMember().getMemberId();
        return memberService.findVerifiedMember(memberId);
    }

    @Override
    public Answer addVoteToAnswer(AnswerVote answerVote) {
        Answer findAnswer = findVerifiedAnswer(answerVote.getAnswer().getAnswerId());
        Optional<AnswerVote> vote = findAnswer.getAnswerVotes().stream()
                .filter(findAnswerVote -> findAnswerVote.getMember().getMemberId() == answerVote.getMember().getMemberId())
                .findAny();
        if (vote.isPresent()) {
            AnswerVote findAnswerVote = vote.get();
            if (answerVote.getAnswerVoteStatus() == AnswerVote.AnswerVoteStatus.NONE) {
                findAnswer.getAnswerVotes().remove(findAnswerVote);
                findAnswerVote.setAnswer(null);
                findAnswerVote.setMember(null);
            } else {
                findAnswerVote.setAnswerVoteStatus(answerVote.getAnswerVoteStatus());
            }
        }
            else if (answerVote.getAnswerVoteStatus() != AnswerVote.AnswerVoteStatus.NONE) {
                findAnswer.addAnswerVote(answerVote);
            }
            return findAnswer;

        }
    }

