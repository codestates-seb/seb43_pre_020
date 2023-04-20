package preproject.stackoverflow.answer.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.answer.dto.AnswerPostDto;
import preproject.stackoverflow.answer.entity.Answer;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "questionId", target = "question.questionId")
    Answer answerPostDtoToAnswer(AnswerPostDto post);

}
