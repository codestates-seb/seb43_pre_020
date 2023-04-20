package preproject.stackoverflow.member.service;

import preproject.stackoverflow.member.entity.Member;

public interface MemberService {
    Member createMember(Member member);
    Member updateMember(Member member);
    Member findMember(Long memberId);
    void deleteMember(Long memberId);
    Member findVerifiedMember(Long memberId);
}
