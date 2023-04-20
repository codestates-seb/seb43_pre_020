package preproject.stackoverflow.answer.service;

import org.springframework.stereotype.Service;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.answer.repository.AnswerRepository;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;

import java.util.Optional;
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;

    public  AnswerService(AnswerRepository answerRepository){
        this.answerRepository = answerRepository;
    }
    public Answer createAnswer(Answer answer){
        //verifyExistAnswer(answer.getMember());

        return answerRepository.save(answer);
    }

   /* private void verifyExistAnswer(Member member){
        Optional<Member> answer = answerRepository.findByMember(member);
        if(answer.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
    } */
}
