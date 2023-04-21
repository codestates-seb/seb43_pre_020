package preproject.stackoverflow.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.answer.dto.AnswerDTO;
import preproject.stackoverflow.answer.entity.Answer;
import preproject.stackoverflow.answer.mapper.AnswerMapper;
import preproject.stackoverflow.comment.mapper.QuestionCommentMapper;
import preproject.stackoverflow.question.dto.QuestionDTO;
import preproject.stackoverflow.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring", uses = {AnswerMapper.class, QuestionCommentMapper.class})
public interface QuestionMapper {
    // Post 기능 매핑
    @Mapping(source = "memberId", target = "member.memberId")
    Question questionPostDTOToQuestion(QuestionDTO.Post post);
    Question questionPatchDtoToQuestion(QuestionDTO.Patch patch);

    @Mapping(source = "question.member.memberId", target = "memberId")
    @Mapping(source = "question.member.displayName", target = "questioner")
    @Mapping(source = "createdAt", target = "date")
    @Mapping(target = "answers", qualifiedByName = "answersToAnswerResponseDTOs")
    @Mapping(target = "comments", qualifiedByName = "commentsToCommentResponseDTOs")
    QuestionDTO.Response questionToQuestionResponseDTO(Question question);

    @Mapping(source = "createdAt", target = "date")
    @Mapping(source = "question.member.memberId", target = "memberId")
    @Mapping(source = "question.member.displayName", target = "questioner")
    @Mapping(target = "answers", expression = "java(question.getAnswers().size())")
    QuestionDTO.ResponseList.SimpleResponse questionToSimpleResponse(Question question);

    List<QuestionDTO.ResponseList.SimpleResponse> questionsToSimpleResponses(List<Question> questions);



}
