package preproject.stackoverflow.member.service;

import org.springframework.web.multipart.MultipartFile;
import preproject.stackoverflow.member.entity.Member;

public interface MemberService {
    Member createMember(Member member);
    Member updateMember(Member member, MultipartFile memberImage);
    Member findMember(Long memberId);
    void deleteMember(Long memberId);
    Member findVerifiedMember(Long memberId);
}
