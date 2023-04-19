package preproject.stackoverflow.member.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.auth.utils.CustomAuthorityUtils;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.repository.MemberRepository;

import java.util.Optional;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());
        setPassword(member);
        member.setRoles(authorityUtils.getRoles());
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
    @Override
    public Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        optionalMember.ifPresent(member -> {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        });
    }

    private void setPassword(Member member) {
        String password = member.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        member.setPassword(encodedPassword);
    }
}
