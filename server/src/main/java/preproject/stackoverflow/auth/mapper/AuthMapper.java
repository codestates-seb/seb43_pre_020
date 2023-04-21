package preproject.stackoverflow.auth.mapper;

import org.mapstruct.Mapper;
import preproject.stackoverflow.auth.dto.ProfileDTO;
import preproject.stackoverflow.member.entity.Member;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    ProfileDTO MemberToProfileDTO(Member member);
}
