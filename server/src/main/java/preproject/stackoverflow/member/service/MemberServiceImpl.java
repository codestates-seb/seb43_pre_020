package preproject.stackoverflow.member.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
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
    private final StorageService storageService;

    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, StorageService storageService) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.storageService = storageService;
    }

    @Override
    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());
        setPassword(member);
        member.setRoles(authorityUtils.getRoles());
        return memberRepository.save(member);
    }

    @Override
    public Member updateMember(Member member, MultipartFile memberImage) {
        Member findMember = findVerifiedMember(member.getMemberId());


        // DiplayName, title, aboutMe 수정
        Optional.ofNullable(member.getDisplayName())
                .ifPresent(findMember::setDisplayName);
        Optional.ofNullable(member.getTitle())
                .ifPresent(findMember::setTitle);
        Optional.ofNullable(member.getAboutMe())
                .ifPresent(findMember::setAboutMe);
        Optional.ofNullable(memberImage)
                .ifPresent(file -> {
                    String contentType = file.getContentType();
                    if(contentType != null && contentType.startsWith("image")){
                        findMember.setImageFileName(storageService.store(file, findMember.getImageFileName()));
                    }
                });
        // 비밀번호 수정 논의

        return memberRepository.save(findMember);
    }

    @Override
    public Member findMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    @Override
    public void deleteMember(Long memberId) {
        // 회원 상태값 -> 탈퇴로 반환
        Member findMember = findVerifiedMember(memberId);
        findMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);
        memberRepository.save(findMember);
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
