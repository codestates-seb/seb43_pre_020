package preproject.stackoverflow.auth.handler;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import preproject.stackoverflow.auth.jwt.JwtTokenizer;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.repository.MemberRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class AuthenticationSuccessHandlerUtils {
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public AuthenticationSuccessHandlerUtils(JwtTokenizer jwtTokenizer, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberRepository = memberRepository;
    }

    @Transactional
    void setLoginTime(Member member) {
        Member findMember = memberRepository.findById(member.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        findMember.setLastLoginTime(LocalDateTime.now());
        memberRepository.save(findMember);
    }


    String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getMemberId().toString();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    String delegateRefreshToken(Member member) {
        String subject = member.getMemberId().toString();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }
}
