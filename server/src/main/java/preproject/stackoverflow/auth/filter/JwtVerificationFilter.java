package preproject.stackoverflow.auth.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.OncePerRequestFilter;
import preproject.stackoverflow.auth.jwt.JwtTokenizer;
import preproject.stackoverflow.auth.utils.CustomAuthorityUtils;
import preproject.stackoverflow.exception.BusinessLogicException;
import preproject.stackoverflow.exception.ExceptionCode;
import preproject.stackoverflow.member.entity.Member;
import preproject.stackoverflow.member.repository.MemberRepository;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            if(request.getServletPath().equals("/auth/refresh")){
                verifyRefreshToken(request, response);
            } else {
                verifyAccessToken(request);
            }
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Access Token 검증 및 후속 작업
     * @param request
     */
    private void verifyAccessToken(HttpServletRequest request) {
        Map<String, Object> claims = verifyAccessJws(request);
        setAuthenticationToContext(claims);
        setActivityTime(Long.parseLong(claims.get("sub").toString()));
    }

    /**
     * Refresh Token 검증 및 후속 작업
     * @param request
     * @param response
     */
    private void verifyRefreshToken(HttpServletRequest request, HttpServletResponse response) {
        Long memberId = Long.parseLong(verifyRefreshJws(request));
        String accessToken = delegateAccessToken(memberId);
        response.setHeader("Authorization", "Bearer " + accessToken);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        String refresh = request.getHeader("Refresh");
        return (authorization == null || !authorization.startsWith("Bearer")) &&
                (!request.getServletPath().equals("/auth/refresh") || refresh == null);
    }

    /**
     * Access Token 검증
      * @param request
     * @return
     */
    private Map<String, Object> verifyAccessJws(HttpServletRequest request) {
        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(accessToken, base64EncodedSecretKey).getBody();
    }

    /**
     * 인증정보를 SecurityContextHolder에 저장
     * @param claims
     */
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String memberId = (String) claims.get("sub");
        List<String> roles = (List<String>) claims.get("roles");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, null, authorityUtils.getAuthorities(roles));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    /**
     * 마지막 활동시각을 기록
     * @param memberId
     */
    @Transactional
    private void setActivityTime(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findByMemberIdAndMemberStatus(memberId, Member.MemberStatus.MEMBER_ACTIVE);
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        member.setLastActivityTime(LocalDateTime.now());
        memberRepository.save(member);
    }

    /**
     * Refresh Token을 검증
     * @param request
     * @return
     */
    private String verifyRefreshJws(HttpServletRequest request) {
        String refreshToken = request.getHeader("Refresh");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return (String) jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey).getBody().get("sub");
    }

    /**
     * Refresh Token을 검증 후 Access Token을 생성
     * @param memberId
     * @return
     */
    private String delegateAccessToken(Long memberId) {
        Optional<Member> optionalMember = memberRepository.findByMemberIdAndMemberStatus(memberId, Member.MemberStatus.MEMBER_ACTIVE);
        Member member = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        setAuthenticationToContext(claims);

        String subject = member.getMemberId().toString();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }
}
