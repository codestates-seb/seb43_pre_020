package preproject.stackoverflow.question.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.question.dto.QuestionDto;
import preproject.stackoverflow.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    // Post 기능 매핑
    @Mapping(source = "memberId", target = "member.memberId")
    Question memberPostDTOToMember(QuestionDto.Post post);
}