package preproject.stackoverflow.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.question.dto.QuestionDTO;
import preproject.stackoverflow.question.entity.Question;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    // Post 기능 매핑
    @Mapping(source = "memberId", target = "member.memberId")
    Question memberPostDTOToMember(QuestionDTO.Post post);
}
