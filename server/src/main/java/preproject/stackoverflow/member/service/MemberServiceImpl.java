package preproject.stackoverflow.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.repository.MemberRepository;

import java.util.Optional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());
        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member) {
        return null;
    }

    @Override
    public Member findMember(Long memberId) {
        return null;
    }

    @Override
    public void deleteMember(Long memberId) {

    }

    private void verifyExistEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        optionalMember.ifPresent(member -> {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        });
    }
}
