package preproject.stackoverflow.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.dto.QuestionDTO;
import preproject.stackoverflow.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    // Post 기능 매핑
    @Mapping(source = "memberId", target = "member.memberId")
    Question questionPostDTOToQuestion(QuestionDTO.Post post);
    Question questionPatchDtoToQuestion(QuestionDTO.Patch patch);

    @Mapping(source = "createdAt", target = "date")
    @Mapping(source = "question.member.memberId", target = "memberId")
    @Mapping(source = "question.member.displayName", target = "questioner")
    @Mapping(target = "answers", expression = "java(question.getAnswers().size())")
    QuestionDTO.ResponseList.SimpleResponse questionToSimpleResponse(Question question);

    List<QuestionDTO.ResponseList.SimpleResponse> questionsToSimpleResponses(List<Question> questions);
}
