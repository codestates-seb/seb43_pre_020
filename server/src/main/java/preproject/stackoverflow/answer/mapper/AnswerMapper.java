package preproject.stackoverflow.answer.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import preproject.stackoverflow.answer.dto.AnswerDTO;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.comment.mapper.QuestionCommentMapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = QuestionCommentMapper.class)
public interface AnswerMapper {
    @Mapping(source = "memberId", target = "member.memberId")
    @Mapping(source = "questionId", target = "question.questionId")
    Answer answerPostDtoToAnswer(AnswerDTO.Post post);
    Answer answerPatchDtoToAnswer(AnswerDTO.Patch patch);


    @Mapping(source = "createdAt", target = "date")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.displayName", target = "answerer")
    @Mapping(target = "comments", qualifiedByName = "commentsToCommentResponseDTOs")
    AnswerDTO.Response answerToAnswerResponseDTO(Answer answer);

    @Named("answersToAnswerResponseDTOs")
    List<AnswerDTO.Response> answersToAnswerResponseDTOs(List<Answer> answers);

}
