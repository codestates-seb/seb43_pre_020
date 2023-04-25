package preproject.stackoverflow.member.service;

import org.springframework.data.domain.Page;
import preproject.stackoverflow.member.entity.Member;

public interface MemberService {
    Member createMember(Member member);
    Member updateMember(Member member);
    Member findMember(Long memberId);
    Page<Member> findMembers(int page, int size);

    void deleteMember(Long memberId);
    Member findVerifiedMember(Long memberId);
}
