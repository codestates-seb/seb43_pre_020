package preproject.stackoverflow.auth.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import preproject.stackoverflow.auth.dto.ProfileDTO;
import preproject.stackoverflow.member.entity.Member;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    @Mapping(source = "OAuth2Status", target = "oAuth2Status")
    ProfileDTO MemberToProfileDTO(Member member);
}
