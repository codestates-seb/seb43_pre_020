package preproject.stackoverflow.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.member.dto.MemberDTO;
import preproject.stackoverflow.member.entity.Member;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDTOToMember(MemberDTO.Post post);
    Member memberPatchDtoToMember(MemberDTO.Patch patch);

    // TODO : response에 @Mapping 공부 및 피드백받기
    MemberDTO.Response memberToMemberResponseDTO(Member member);
}


